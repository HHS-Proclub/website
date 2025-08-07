import Section from "@/components/Section";
import LeaderboardTable from "@/components/LeaderboardTable";
import { leaderboard } from "@/data/leaderboard";

export const metadata = {
  title: "Leaderboard | Homestead Programming Club",
};

export default function LeaderboardPage() {
  return (
    <div className="container-max px-4">
      <Section title="Leaderboard">
        <LeaderboardTable rows={leaderboard} />
      </Section>
    </div>
  );
}
