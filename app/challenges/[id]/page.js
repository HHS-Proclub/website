import { problems } from "@/data/problems";
import Section from "@/components/Section";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return problems.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const problem = problems.find((p) => String(p.id) === params.id);
  return {
    title: problem
      ? `${problem.title} | Homestead Programming Club`
      : "Problem | Homestead Programming Club",
  };
}

export default function ProblemDetailPage({ params }) {
  const problem = problems.find((p) => String(p.id) === params.id);
  if (!problem) {
    return (
      <div className="container-max px-4 py-12">
        <p>Problem not found.</p>
      </div>
    );
  }

  return (
    <div className="container-max px-4">
      <Section title={problem.title}>
        <div className="mb-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
          <span className="font-medium text-[var(--foreground)]">
            Under development:
          </span>{" "}
          Online judging is being built. You can preview the problem statement
          and sample cases below.
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="font-semibold mb-2">Problem Statement</h3>
              <p className="opacity-90 whitespace-pre-wrap">
                {problem.statement}
              </p>
              <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Input</p>
                  <p className="opacity-80">{problem.inputSpec}</p>
                </div>
                <div>
                  <p className="font-medium">Output</p>
                  <p className="opacity-80">{problem.outputSpec}</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="font-semibold mb-2">Samples</h3>
              <div className="grid gap-3">
                {problem.samples.map((s, idx) => (
                  <div key={idx} className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded border border-[var(--border)] bg-black/30 p-3">
                      <p className="font-medium mb-1">Input</p>
                      <pre className="whitespace-pre-wrap">{s.input}</pre>
                    </div>
                    <div className="rounded border border-[var(--border)] bg-black/30 p-3">
                      <p className="font-medium mb-1">Output</p>
                      <pre className="whitespace-pre-wrap">{s.output}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="font-semibold mb-2">Submit a Solution</h3>
              <form
                action={`/api/submit/${problem.id}`}
                method="POST"
                encType="multipart/form-data"
                className="space-y-3"
              >
                <div>
                  <label className="block text-sm mb-1">Language</label>
                  <select
                    name="language"
                    className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] p-2"
                    defaultValue="java"
                  >
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript (Node)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Source file</label>
                  <input
                    type="file"
                    name="source"
                    accept=".java,.cpp,.py,.js,.txt"
                    required
                    className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="focus-ring inline-flex items-center rounded-md bg-[var(--brand)] text-black px-3 py-2 text-sm font-medium hover:bg-[var(--brand-hover)]"
                  disabled
                  title="Judging not enabled yet"
                >
                  Submit (disabled)
                </button>
              </form>
              <p className="text-xs opacity-70 mt-2">
                Judging and account save coming soon.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
