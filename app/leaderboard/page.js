import Section from "@/components/Section";
import LeaderboardTable from "@/components/LeaderboardTable";
import { leaderboard } from "@/data/leaderboard";

export const metadata = {
  title: "Leaderboard | Homestead CS Club",
};

export default function LeaderboardPage() {
  return (
    <div className="container-max px-4">
      <Section title="Leaderboard">
        <div className="mb-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
          <span className="font-medium text-[var(--foreground)]">
            Under development:
          </span>{" "}
          The leaderboard functionality is under development.
        </div>
        <LeaderboardTable rows={leaderboard} />
      </Section>
    </div>
  );
}
