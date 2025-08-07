export default function LeaderboardTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--surface)] text-left">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Points</th>
            <th className="px-4 py-3">Total Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="odd:bg-black/10">
              <td className="px-4 py-3">{r.rank}</td>
              <td className="px-4 py-3">{r.name}</td>
              <td className="px-4 py-3">{r.points}</td>
              <td className="px-4 py-3">{r.totalTimeMs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
