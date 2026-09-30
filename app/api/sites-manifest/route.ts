import { NextResponse } from 'next/server';
import { SITES } from '@/lib/data';

// Служебный список шаблонов для scripts/render-previews.mjs
export const dynamic = 'force-static';
export function GET() {
  return NextResponse.json(SITES.map((s) => ({ id: s.id, image: s.image })));
}
