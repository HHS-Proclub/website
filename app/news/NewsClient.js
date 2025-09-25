"use client";

import { useEffect, useState } from "react";
import NewsCard from "@/components/NewsCard";
import { db } from "@/config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function NewsClient() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const q = query(collection(db, "news"), orderBy("date", "desc"));
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
        if (isMounted) setItems(docs);
      } catch (err) {
        if (isMounted) setError("Failed to load news.");
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="mb-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
        Loading news...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 rounded-md border border-red-500 bg-red-500/10 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mb-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
        No news yet. Check back soon.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((n) => (
        <NewsCard
          key={n.id}
          title={n.title}
          date={n.date}
          text={n.text}
          codeLink={n.codeLink}
          slidesLink={n.slidesLink}
        />
      ))}
    </div>
  );
}
