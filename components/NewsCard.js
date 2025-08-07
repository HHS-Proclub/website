import Card from "@/components/Card";

export default function NewsCard({ title, date, text }) {
  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-xs opacity-60 mb-3">{date}</p>
      <p className="text-sm leading-relaxed opacity-90">{text}</p>
    </Card>
  );
}
