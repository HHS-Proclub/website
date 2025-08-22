import Section from "@/components/Section";
import NewsClient from "./NewsClient";

export const metadata = {
  title: "News | Homestead CS Club",
};

export default function NewsPage() {
  return (
    <div className="container-max px-4">
      <Section title="News">
        <NewsClient />
      </Section>
    </div>
  );
}
