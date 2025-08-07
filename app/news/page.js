import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { newsItems } from "@/data/news";

export const metadata = {
  title: "News | Homestead Programming Club",
};

export default function NewsPage() {
  return (
    <div className="container-max px-4">
      <Section title="News">
        <div className="grid md:grid-cols-2 gap-4">
          {newsItems.map((n, idx) => (
            <NewsCard key={idx} {...n} />
          ))}
        </div>
      </Section>
    </div>
  );
}
