import Link from "next/link";
import Card from "@/components/Card";

export default function ProblemCard({ id, title }) {
  return (
    <Link href={`/challenges/${id}`} className="block">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
          <span className="text-xs opacity-70">#{id}</span>
        </div>
      </Card>
    </Link>
  );
}
