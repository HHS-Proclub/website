"use client";

import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProblemSubmissionForm({ problemId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [failedTests, setFailedTests] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setStatus("");
    setFailedTests([]);

    const formData = new FormData(event.currentTarget);
    formData.set("user_id", user.uid);

    const res = await fetch(`/api/submit/${problemId}`, {
      method: "POST",
      body: formData,
    });

    const body = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setStatus(body.error || "Submission failed");
      return;
    }

    const submission = body.submission ?? body;
    if (submission?.status === "accepted") {
      setStatus("Passed ✓");
    } else if (submission?.status === "wrong_answer") {
      setStatus("Failed");
      // Extract failed test case
      const result = submission?.result;
      if (result?.results) {
        const failed = result.results.find((r) => !r.pass);
        if (failed) {
          setFailedTests([failed]);
        }
      }
    } else {
      setStatus(submission?.status || "Queued");
    }
  };

  if (loading) return <p>Checking sign-in...</p>;
  if (!user) return <p>Please sign in to submit a solution.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="hidden" name="user_id" value={user.uid} />

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
        disabled={submitting}
        className="focus-ring inline-flex items-center rounded-md bg-[var(--brand)] text-black px-3 py-2 text-sm font-medium hover:bg-[var(--brand-hover)]"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>

      {status && (
        <p
          className={`text-sm mt-2 ${
            status.includes("Passed")
              ? "text-green-500"
              : status.includes("Failed")
              ? "text-red-500"
              : ""
          }`}
        >
          {status}
        </p>
      )}
      {failedTests.length > 0 && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded text-sm">
          <p className="text-red-600 font-semibold mb-2">Failed Test Case:</p>
          {failedTests.map((test, idx) => (
            <div key={idx} className="space-y-1 text-red-600 text-xs">
              <p>
                <strong>Input:</strong> <code>{test.input}</code>
              </p>
              <p>
                <strong>Expected:</strong> <code>{test.expected}</code>
              </p>
              <p>
                <strong>Got:</strong> <code>{test.actual || test.error}</code>
              </p>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}