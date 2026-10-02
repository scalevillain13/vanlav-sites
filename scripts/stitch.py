"""Склейка скриншотов живого сайта в одну ленту 1280px без повторов.

Скриншоты часто снимают «внахлёст»: низ одного экрана повторяется вверху следующего.
Скрипт срезает повторяющуюся шапку сайта со 2-го кадра и дальше, находит перекрытие
с предыдущим кадром по текстурным полосам и склеивает без дублей и разрывов.

  python3 scripts/stitch.py <id> <высота_шапки_px> <кадр1.png> <кадр2.png> ...
Результат: public/sites/<id>/full.jpg, full.webp, cover.jpg, cover.webp; печатает высоты.
После — npm run slices.
"""
import sys, os
import numpy as np
from PIL import Image

W = 1280

def load(path, crop_top):
    im = Image.open(path).convert('RGB')
    if crop_top: im = im.crop((0, crop_top, im.width, im.height))
    return im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)

def gray(im):
    return np.asarray(im.convert('L'), dtype=np.float32)

def profile(g):
    """Профиль строк: средняя яркость и плотность вертикальных границ. Не зависит от
    горизонтального сдвига вёрстки, если скриншоты сняты в окнах чуть разной ширины."""
    edge = np.abs(np.diff(g, axis=1)).mean(axis=1)
    return np.stack([g.mean(axis=1), edge * 4], axis=1)

def ncc(a, b):
    a = a - a.mean(0); b = b - b.mean(0)
    den = np.sqrt((a * a).sum() * (b * b).sum())
    return float((a * b).sum() / den) if den > 1e-6 else 0.0

def profile(g):
    edge = np.abs(np.diff(g, axis=1)).mean(axis=1)
    return np.stack([g.mean(axis=1), edge * 4], axis=1)

def ncc(a, b):
    a = a - a.mean(0); b = b - b.mean(0)
    den = np.sqrt((a * a).sum() * (b * b).sum())
    return float((a * b).sum() / den) if den > 1e-6 else 0.0

def overlap_profile(prev_g, cur_g):
    """Запасной способ: по профилю строк (яркость и плотность границ), устойчив к сдвигу вёрстки."""
    P, C = profile(prev_g), profile(cur_g)
    H = len(P); best = (0.0, 0)
    for start in range(max(0, H - 1100), H - 40):
        L = min(H - start, len(C) - 1, 600)
        sc = C[:L]
        if sc[:, 1].std() < 1.5 or sc[:, 0].std() < 6: continue
        r = ncc(P[start:start + L], sc)
        if r > best[0] + 1e-4: best = (r, H - start)
    return best[1] if best[0] >= 0.985 else 0

def overlap(prev_g, cur_g):
    return overlap_band(prev_g, cur_g) or overlap_profile(prev_g, cur_g)

def overlap_band(prev_g, cur_g):
    """Сколько первых строк cur уже есть в конце prev (0 — перекрытия нет).
    Берём «текстурные» полосы сверху нового кадра (текст, линии), ищем их в конце предыдущего
    с поправкой на горизонтальный сдвиг (окна чуть разной ширины) и проверяем всю зону перекрытия."""
    from numpy.lib.stride_tricks import sliding_window_view as swv
    A = prev_g[:, ::4]; B = cur_g[:, ::4]
    H = A.shape[0]; BAND = 14; M = 6
    lo = max(0, H - 900)
    win = swv(A[lo:, M:-M], (BAND, A.shape[1] - 2 * M))[:, 0]  # (n, BAND, w)
    edge = np.abs(np.diff(B, axis=1)).mean(axis=1)
    cands = [y for y in range(0, min(360, B.shape[0] - BAND), 3) if edge[y:y + BAND].mean() > 2.2]
    if len(cands) > 14: cands = cands[::max(1, len(cands) // 14)][:14]
    best = None
    for b0 in cands:
        for dx in range(-3, 4):
            band = np.roll(B[b0:b0 + BAND], dx, axis=1)[:, M:-M]
            diffs = np.abs(win - band).mean(axis=(1, 2))
            i = int(diffs.argmin())
            if best is None or diffs[i] < best[0]: best = (float(diffs[i]), lo + i - b0, dx)
    if best is None: return 0
    d, start, dx = best
    if d > 3.2 or start < 0: return 0
    k = H - start
    if k >= B.shape[0] - 4: return 0
    whole = np.abs(A[start:H, M:-M] - np.roll(B[:k], dx, axis=1)[:, M:-M]).mean()
    return k if whole < 7 else 0

def quiet_rows(g):
    """Строки «пустого» фона: почти без границ и перепадов яркости."""
    edge = np.abs(np.diff(g, axis=1)).mean(axis=1)
    return (edge < 0.8) & (g.std(axis=1) < 6)

def quiet_cut(g, from_bottom, reach=260, run=6):
    """Ближайшая к краю полоса пустого фона (чтобы не резать блоки пополам). Возвращает индекс строки."""
    q = quiet_rows(g); n = len(q)
    rng = range(n - 1, max(run, n - reach), -1) if from_bottom else range(0, min(n - run, reach))
    for y in rng:
        seg = q[y - run:y] if from_bottom else q[y:y + run]
        if seg.all(): return y - run // 2 if from_bottom else y + run // 2
    return n if from_bottom else 0

def main():
    sid, head = sys.argv[1], int(sys.argv[2]); files = sys.argv[3:]
    out = None
    seams = []
    for i, f in enumerate(files):
        im = load(f, 0 if i == 0 else head)
        if out is None: out = im; cover = im; continue
        k = overlap(gray(out), gray(im))
        print(f'{os.path.basename(f)}: перекрытие {k}px')
        if k: im = im.crop((0, k, W, im.height))
        else:
            # перекрытия нет — режем по пустому фону, а не посреди блока
            cut = quiet_cut(gray(out), True)
            if cut < out.height: out = out.crop((0, 0, W, cut))
            top = quiet_cut(gray(im), False)
            if top: im = im.crop((0, top, W, im.height))
        seams.append(out.height)
        if im.height <= 4: continue
        nxt = Image.new('RGB', (W, out.height + im.height)); nxt.paste(out, (0, 0)); nxt.paste(im, (0, out.height)); out = nxt
    d = os.path.join(os.path.dirname(__file__), '..', 'public', 'sites', sid)
    os.makedirs(d, exist_ok=True)
    out.save(os.path.join(d, 'full.jpg'), quality=82, optimize=True)
    out.save(os.path.join(d, 'full.webp'), quality=80, method=6)
    cover.save(os.path.join(d, 'cover.jpg'), quality=85, optimize=True)
    cover.save(os.path.join(d, 'cover.webp'), quality=82, method=6)
    print('imageH', out.height, 'coverH', cover.height)
    print('seams', seams)

main()
