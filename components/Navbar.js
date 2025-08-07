"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EMAIL_LIST_URL, DISCORD_URL, SIGNUP_URL } from "@/lib/links";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/challenges", label: "Challenge Problems" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export default function Navbar() {
  const prefersReduced = useReducedMotion();
  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur border-b border-[var(--border)]">
      <div className="container-max px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 focus-ring">
          <Image
            src="/logos/logo-white-text.png"
            alt="Homestead Programming Club"
            width={180}
            height={36}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          <a
            href={EMAIL_LIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center rounded-md bg-[var(--brand)] text-black px-3 py-2 text-sm font-medium hover:bg-[var(--brand-hover)] transition-colors"
          >
            Join Email List
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] px-3 py-2 text-sm font-medium hover:border-[var(--brand)] transition-colors"
          >
            Discord
          </a>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden lg:inline-flex items-center rounded-md border border-[var(--brand)] text-[var(--foreground)] px-3 py-2 text-sm font-medium hover:bg-[var(--brand)] hover:text-black transition-colors"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile menu simple teaser (no drawer) */}
        <div className="md:hidden">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: -6 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[var(--foreground)]/80 hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
