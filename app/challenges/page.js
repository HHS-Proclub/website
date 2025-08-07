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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {problems.map((p) => (
            <ProblemCard key={p.id} {...p} />
          ))}
        </div>
      </Section>
    </div>
  );
}
