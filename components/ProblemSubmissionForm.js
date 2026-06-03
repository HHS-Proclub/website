"use client";

import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProblemSubmissionForm({ problemId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <p>Checking sign-in...</p>;
  if (!user) return <p>Please sign in to submit a solution.</p>;

  return (
    <form
      action={`/api/submit/${problemId}`}
      method="POST"
      encType="multipart/form-data"
      className="space-y-3"
    >
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
        className="focus-ring inline-flex items-center rounded-md bg-[var(--brand)] text-black px-3 py-2 text-sm font-medium hover:bg-[var(--brand-hover)]"
      >
        Submit
      </button>
    </form>
  );
}