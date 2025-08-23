"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Link from "next/link";
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function SignupClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) router.replace("/");
    });
    return () => unsub();
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      const userRef = doc(db, "users", cred.user.uid);
      await setDoc(userRef, {
        name,
        email: email.toLowerCase(),
        isAdmin: false,
        createdAt: serverTimestamp(),
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-7 md:p-8 w-full max-w-xl">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Name</label>
          <input
            type="text"
            className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            minLength={6}
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
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
        <p className="text-sm opacity-80">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--brand)] hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </Card>
  );
}
