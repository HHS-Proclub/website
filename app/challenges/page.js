import Section from "@/components/Section";
import ProblemCard from "@/components/ProblemCard";
import { problems } from "@/data/problems";

export const metadata = {
  title: "Challenge Problems | Homestead Programming Club",
};

export default function ChallengesPage() {
  return (
    <div className="container-max px-4">
      <Section title="Challenge Problems">
        <div className="mb-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
          <span className="font-medium text-[var(--foreground)]">
            Under development:
          </span>{" "}
          Challenge problems functionality are under development.
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {problems.map((p) => (
            <ProblemCard key={p.id} {...p} />
          ))}
        </div>
      </Section>
    </div>
  );
}
