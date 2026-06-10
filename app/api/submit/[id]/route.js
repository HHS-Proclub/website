//import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
//import { gradePythonSubmission } from "@/judge/worker"; 
import { problems } from "@/data/problems";
import { runCode } from "@/lib/judge0";
//import { problems } from "@/data/problems";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const submissionsDir = path.join(process.cwd(), "submissions");
const submissionsDb = path.join(process.cwd(), "submissions.json");

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function readJson(file, fallback = []) {
  try {
    const text = await fs.readFile(file, "utf8");
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

function getUserId(request) {
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie.match(/user_id=([^;]+)/);
  return match?.[1] ?? null;
}


export async function POST(req, { params }) {
  const formData = await req.formData();

  const file = formData.get("source");
  const language = formData.get("language");

  const problem = problems.find(p => String(p.id) === params.id);

  const code = await file.text();

  const language_id = {
    python: 71,
    cpp: 54,
    java: 62,
    javascript: 63,
  }[language];

  const results = [];

  for (const test of problem.tests) {
    const res = await runCode({
      source_code: code,
      language_id,
      stdin: test.input,
    });

    const output = (res.stdout || "").trim();
    const expected = test.output.trim();
    const error = res.stderr ? (res.stderr || "").trim() : null;

    results.push({
      input: test.input,
      expected,
      actual: output,
      error,
      pass: output === expected,
    });

    if (output !== expected) break;
  }

  const passed = results.every(r => r.pass);

  return Response.json({
    status: passed ? "accepted" : "wrong_answer",
    results,
  });
}
