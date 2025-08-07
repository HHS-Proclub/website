import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-12">
      <div className="container-max px-4 py-8 text-sm text-[var(--foreground)]/70">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p>
            Questions? Email{" "}
            <a
              href="mailto:homesteadprogramming@gmail.com"
              className="text-[var(--brand)] hover:underline"
            >
              homesteadprogramming@gmail.com
            </a>
          </p>
          <nav className="flex items-center gap-4">
            <Link href="/about" className="hover:text-[var(--foreground)]">
              About
            </Link>
            <Link href="/news" className="hover:text-[var(--foreground)]">
              News
            </Link>
            <Link href="/challenges" className="hover:text-[var(--foreground)]">
              Challenge Problems
            </Link>
            <Link
              href="/leaderboard"
              className="hover:text-[var(--foreground)]"
            >
              Leaderboard
            </Link>
          </nav>
        </div>
        <p className="mt-4 opacity-60">
          © {new Date().getFullYear()} Homestead Programming Club
        </p>
      </div>
    </footer>
  );
}
