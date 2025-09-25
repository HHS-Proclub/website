import Card from "@/components/Card";
import Link from "next/link";

export default function NewsCard({ title, date, text, codeLink, slidesLink }) {
  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-xs opacity-60 mb-3">{date}</p>
      <p className="text-sm leading-relaxed opacity-90">{text}</p>
      {(codeLink || slidesLink) && (
        <div className="mt-3 flex flex-wrap gap-4">
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand)] hover:underline text-sm"
            >
              Code link
            </a>
          )}
          {slidesLink && (
            <a
              href={slidesLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand)] hover:underline text-sm"
            >
              Slides link
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
