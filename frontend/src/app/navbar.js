'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// roles: ระบุ role ที่เห็นเมนูนี้ (ไม่ระบุ = ทุกคน), guest = ยังไม่ล็อกอิน/บุคคลภายนอก
const MENUS = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/broadcast', label: 'ประชาสัมพันธ์' }, // UC_08
  { href: '/contact', label: 'ติดต่อเจ้าหน้าที่' }, // UC_07
  { href: '/search', label: 'ค้นหาของหาย', roles: ['user', 'officer', 'admin'] }, // UC_06
  { href: '/lost-items/new', label: 'ลงทะเบียนของหาย', roles: ['officer', 'admin'] }, // UC_04
  { href: '/lost-items', label: 'จัดการของหาย', roles: ['officer', 'admin'] }, // UC_05
  { href: '/returns', label: 'ยืนยันการส่งมอบ', roles: ['officer', 'admin'] }, // UC_09
  { href: '/admin/users', label: 'จัดการผู้ใช้/Role', roles: ['admin'] }, // UC_03 (Admin)
];

// user = { name, role: 'user' | 'officer' | 'admin' } หรือ null เมื่อยังไม่ล็อกอิน
export default function Navbar({ user = null }) {
  const pathname = usePathname();
  const role = user?.role ?? 'guest';
  const items = MENUS.filter((m) => !m.roles || m.roles.includes(role));

  const linkClass = (href) =>
    `px-3 py-2 rounded-md text-sm ${pathname === href ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
    }`;

  return (
    <header className="w-full bg-[#002B49] text-white shadow-xl sticky top-0 z-50 border-b border-white/10">
      {/* Navbar สไตล์รามคำแหง เต็มความกว้างหน้าจอ */}
      <div className="w-full px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo & Brand Header */}
        <div className="flex items-center gap-3 shrink-0 select-none group cursor-pointer">
          <Link href="/" className="mr-3 font-bold flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#002B49] to-[#004b7a] border border-[#FDB813]/40 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0">
              <svg className="w-6 h-6 text-[#FDB813]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
                <circle cx="16" cy="16" r="3" className="fill-[#002B49] stroke-[#FDB813] stroke-2" />
                <path d="m18.5 18.5 2.5 2.5" className="stroke-[#FDB813] stroke-2" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FDB813]"></span>
              </span>
            </div>

            {/* ข้อความชื่อระบบ */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">RU Lost &amp; Found</span>
                <span className="text-[10px] bg-[#FDB813] text-[#002B49] font-extrabold px-2 py-0.5 rounded-full">COS4101</span>
              </div>
              <p className="text-xs text-slate-300">ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์</p>
            </div>
          </Link>

          {items.map((m) => (
            <Link key={m.href} href={m.href} className={linkClass(m.href)}>
              {m.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {user ? (
            <>
              <Link href="/account" className={linkClass('/account')}>
                จัดการบัญชี ({user.name})
              </Link>
              <Link href="/logout" className={linkClass('/logout')}>
                ออกจากระบบ
              </Link>
            </>
          ) : (
            <>
              <Link href="/register" className={linkClass('/register')}>
                ลงทะเบียน
              </Link>
              <Link href="/login" className={linkClass('/login')}>
                เข้าสู่ระบบ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
