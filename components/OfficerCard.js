import Image from "next/image";
import Card from "@/components/Card";

export default function OfficerCard({ name, role, imageSrc }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[var(--border)]">
          <Image
            src={imageSrc}
            alt={`${name} headshot`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm opacity-70">{role}</p>
        </div>
      </div>
    </Card>
  );
}
