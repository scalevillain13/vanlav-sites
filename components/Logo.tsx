import Image from 'next/image';

export default function Logo() {
  return (
    <>
      <Image src="/brand/mark.png" alt="" width={51} height={26} className="logo-img" priority sizes="51px" quality={90} />
      <span className="logo-text">ВАН<span>ЛАВ</span></span>
    </>
  );
}
