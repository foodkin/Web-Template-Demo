'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black';
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-black">
            <Link href="/">Logo</Link>
          </div>
          <div className="flex gap-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${isActive('/')}`}
            >
              Home
            </Link>
            <Link
              href="/templates"
              className={`font-medium transition-colors ${isActive('/templates')}`}
            >
              Template
            </Link>
            <Link
              href="/profile"
              className={`font-medium transition-colors ${isActive('/profile')}`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
