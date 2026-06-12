import { NextResponse } from "next/server";
import { problems } from "@/data/problems";
import { runCode } from "@/lib/judge0";


import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------------- FIREBASE INIT ---------------- */

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ?.replace(/\\n/g, "\n")
    .replace(/\r/g, "")
    .trim(),
};

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApps()[0];

const db = getFirestore(app);

/* ---------------- MAIN HANDLER ---------------- */

export async function POST(req, { params }) {
  const formData = await req.formData();

  const file = formData.get("source");
  const language = formData.get("language");
  const userId = formData.get("user_id");

  const problem = problems.find((p) => String(p.id) === params.id);

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const code = await file.text();

  const language_id = {
    python: 71,
    cpp: 54,
    java: 62,
    javascript: 63,
  }[language];

  const results = [];

  /* ---------------- RUN TESTS ---------------- */

  for (const test of problem.tests) {
    const res = await runCode({
      source_code: code,
      language_id,
      stdin: test.input,
    });

    const output = (res.stdout || "").trim();
    const expected = test.output.trim();

    const pass = output === expected;

    results.push({
      input: test.input,
      expected,
      actual: output,
      pass,
    });

    if (!pass) break;
  }

  const passed = results.every((r) => r.pass);

  /* ---------------- AWARD POINTS ---------------- */

  if (passed && userId) {
    console.log("KEY EXISTS:", !!process.env.FIREBASE_PRIVATE_KEY);
    console.log("KEY START:", process.env.FIREBASE_PRIVATE_KEY?.slice(0, 30));
    console.log("HAS NEWLINES STRING:", process.env.FIREBASE_PRIVATE_KEY?.includes("\n"));
    try {
      const solveId = `${userId}_${problem.id}`;

      const solveRef = db.collection("userSolvedProblems").doc(solveId);
      const solveSnap = await solveRef.get();

      if (!solveSnap.exists) {
        // mark solved
        await solveRef.set({
          uid: userId,
          problemId: problem.id,
          pointsAwarded: problem.points || 0,
          createdAt: new Date(),
        });

        const userRef = db.collection("users").doc(userId);
        const userSnap = await userRef.get();

        const currentPoints =
          userSnap.exists ? userSnap.data().points || 0 : 0;

        await userRef.set(
          {
            points: currentPoints + (problem.points || 0),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.error("[Firestore] Failed to award points:", err);
    }
  }

  /* ---------------- RESPONSE ---------------- */

  return NextResponse.json({
    status: passed ? "accepted" : "wrong_answer",
    results,
  });
}