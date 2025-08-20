import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { newsItems } from "@/data/news";

export const metadata = {
  title: "News | Homestead CS Club",
};

export default function NewsPage() {
  return (
    <div className="container-max px-4">
      <Section title="News">
        <div className="mb-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
          <span className="font-medium text-[var(--foreground)]">
            Under development:
          </span>{" "}
          The news section is under development.
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {newsItems.map((n, idx) => (
            <NewsCard key={idx} {...n} />
          ))}
        </div>
      </Section>
    </div>
  );
}
