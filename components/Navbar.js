'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/ai', label: 'AI Mode' },
  { href: '/settings', label: 'Settings' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/5 border-b border-white/10 shadow-[0_1px_20px_rgba(255,255,255,0.03)]">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition">
          MindMap<span className="text-blue-400"> Flow</span>
        </Link>
        <div className="flex space-x-8 text-sm font-medium">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative pb-1 transition ${
                  isActive
                    ? 'text-blue-400 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:bg-blue-400'
                    : 'text-white/80 hover:text-blue-300'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
