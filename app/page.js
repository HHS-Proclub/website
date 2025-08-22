"use client";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { problems } from "@/data/problems";
import { EMAIL_LIST_URL, DISCORD_URL, SIGNUP_URL } from "@/lib/links";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

export default function Home() {
  const [latestNews, setLatestNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const q = query(
          collection(db, "news"),
          orderBy("date", "desc"),
          limit(3)
        );
        const snap = await getDocs(q);
        const docs = snap.docs.map((d) => {
          const data = d.data();
          const rawDate = data?.date;
          let formattedDate = "";
          if (rawDate && typeof rawDate.toDate === "function") {
            formattedDate = rawDate.toDate().toLocaleDateString();
          } else if (
            rawDate &&
            typeof rawDate === "object" &&
            "seconds" in rawDate
          ) {
            formattedDate = new Date(
              rawDate.seconds * 1000
            ).toLocaleDateString();
          } else if (typeof rawDate === "string") {
            formattedDate = rawDate;
          } else if (typeof rawDate === "number") {
            formattedDate = new Date(rawDate).toLocaleDateString();
          }
          return { id: d.id, ...data, date: formattedDate };
        });
        if (isMounted) setLatestNews(docs);
      } catch (err) {
        if (isMounted) setNewsError("Failed to load news.");
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        if (isMounted) setIsLoadingNews(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="container-max px-4 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              Homestead CS Club
            </h1>
            <p className="mt-4 text-[var(--foreground)]/80 max-w-prose">
              A community of problem-solvers building projects, learning CS, and
              competing together.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={EMAIL_LIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-[var(--brand)] text-black px-4 py-2 text-sm font-medium hover:bg-[var(--brand-hover)]"
              >
                Join Email List
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-[var(--brand)] text-[var(--foreground)] px-4 py-2 text-sm font-medium hover:bg-[var(--brand)] hover:text-black"
              >
                Join Discord
              </a>
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] px-4 py-2 text-sm font-medium hover:border-[var(--brand)]"
              >
                Sign Up
              </a>
            </div>
          </div>
          <div className="justify-self-center">
            <Image
              src="/logos/logo-green.png"
              alt="Club logo"
              width={260}
              height={260}
              priority
            />
          </div>
        </div>
      </section>

      <div className="container-max px-4">
        {/* About teaser */}
        <Section title="About the Club">
          <p className="text-[var(--foreground)]/80 max-w-prose">
            Officers host workshops that align with Intro to Java and APCS, run
            annual committee projects, and post weekly challenge problems.
            Whether you’re learning or leading, there’s a place for you.
          </p>
          <div className="mt-4">
            <Link href="/about" className="text-[var(--brand)] hover:underline">
              Learn more →
            </Link>
          </div>
        </Section>
        {/* News teaser */}
        <Section title="Latest News">
          {isLoadingNews && (
            <div className="mb-4 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
              Loading news...
            </div>
          )}
          {newsError && (
            <div className="mb-4 rounded-md border border-red-500 bg-red-500/10 p-4 text-sm text-red-600">
              {newsError}
            </div>
          )}
          {!isLoadingNews && !newsError && latestNews.length === 0 && (
            <div className="mb-4 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
              No news yet. Check back soon.
            </div>
          )}
          <div className="grid md:grid-cols-3 gap-4">
            {latestNews.map((n) => (
              <Card key={n.id} className="p-5">
                <h3 className="text-lg font-semibold mb-1">{n.title}</h3>
                <p className="text-xs opacity-60 mb-3">{n.date}</p>
                <p className="text-sm opacity-90">{n.text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/news" className="text-[var(--brand)] hover:underline">
              See all news →
            </Link>
          </div>
        </Section>

        {/* Challenges teaser */}
        <Section title="Challenge Problems">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {problems.slice(0, 6).map((p) => (
              <Card key={p.id} className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{p.title}</p>
                  <span className="text-xs opacity-70">#{p.id}</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/challenges"
              className="text-[var(--brand)] hover:underline"
            >
              Browse problems →
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
}
