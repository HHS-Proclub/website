import { problems } from "@/data/problems";
import Section from "@/components/Section";
import ProblemSubmissionForm from "@/components/ProblemSubmissionForm";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return problems.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const problem = problems.find((p) => String(p.id) === params.id);
  return {
    title: problem
      ? `${problem.title} | Homestead CS Club`
      : "Problem | Homestead CS Club",
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
              <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
  <h3 className="font-semibold mb-2">Submit a Solution</h3>
  <ProblemSubmissionForm problemId={problem.id} />
  <p className="text-xs opacity-70 mt-2">
    Judging and account save coming soon.
  </p>
</div>
          </div>
          </div>
        </div>
      </Section>
    </div>
    
  );
}
