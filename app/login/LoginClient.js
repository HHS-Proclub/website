"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Link from "next/link";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError(err?.message || "Failed to log in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-7 md:p-8 w-full max-w-xl">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="rounded-md border border-red-500 bg-red-500/10 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center rounded-md bg-[var(--brand)] text-black px-5 py-3 text-base font-medium hover:bg-[var(--brand-hover)] disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
        <p className="text-sm opacity-80">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[var(--brand)] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </Card>
  );
}
