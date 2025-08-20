"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Close the menu on route change
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Prevent background scroll when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur border-b border-[var(--border)]">
      <div className="container-max px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 focus-ring">
          <Image
            src="/logos/logo-white-text.png"
            alt="Homestead CS Club"
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
              className="text-[var(--foreground)]/80 hover:text-[var(--foreground)]"
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
            className="focus-ring inline-flex items-center rounded-md bg-[var(--brand)] text-black px-3 py-2 text-sm font-medium hover:bg-[var(--brand-hover)]"
          >
            Join Email List
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] px-3 py-2 text-sm font-medium hover:border-[var(--brand)]"
          >
            Discord
          </a>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden lg:inline-flex items-center rounded-md border border-[var(--brand)] text-[var(--foreground)] px-3 py-2 text-sm font-medium hover:bg-[var(--brand)] hover:text-black"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile hamburger button */}
        <div className="md:hidden">
          <button
            type="button"
            className="focus-ring inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] p-2"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
            {!isOpen ? (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              // Close icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          exit={prefersReduced ? {} : { opacity: 0 }}
          className="fixed inset-0 z-[60] bg-[var(--background)] md:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="focus-ring absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)]"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <motion.div
            initial={prefersReduced ? false : { y: -16, opacity: 0 }}
            animate={prefersReduced ? {} : { y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="container-max px-4 pt-20 pb-8 bg-[var(--background)]"
          >
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-4 py-3 text-base bg-[var(--surface)]/60 border border-[var(--border)] hover:bg-[var(--surface)] focus-ring"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={EMAIL_LIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center rounded-md bg-[var(--brand)] text-black px-4 py-3 text-sm font-medium hover:bg-[var(--brand-hover)]"
                onClick={() => setIsOpen(false)}
              >
                Join Email List
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] px-4 py-3 text-sm font-medium hover:border-[var(--brand)]"
                onClick={() => setIsOpen(false)}
              >
                Discord
              </a>
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center rounded-md border border-[var(--brand)] text-[var(--foreground)] px-4 py-3 text-sm font-medium hover:bg-[var(--brand)] hover:text-black sm:col-span-2"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}
