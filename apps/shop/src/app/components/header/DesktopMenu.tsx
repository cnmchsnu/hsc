'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

interface NavLink {
  name: string;
  href: string;
}

interface DesktopMenuProps {
  navLinks: NavLink[];
}

export function DesktopMenu({navLinks}: DesktopMenuProps) {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex gap-gutter items-center ml-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href.split("?")[0]!));
              return (
                <Suspense key={link.name} fallback={<span className="text-label-md font-label-md transition-all duration-200 text-on-surface-variant">
                    {link.name}
                  </span>}>
                  <Link
                    href={link.href}
                    className={`text-label-md font-label-md transition-all duration-200 hover:text-primary hover:scale-105 ${
                      isActive
                        ? "text-primary font-bold border-b-2 border-primary pb-1"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {link.name}
                  </Link>
                </Suspense>
              );
            })}
          </nav>
    )

    
}