import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { gradePythonSubmission } from "@/judge/worker"; 
import { problems } from "@/data/problems";

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


export async function POST(request, { params }) {
  const problem = problems.find((p) => String(p.id) === params.id);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const language = (formData.get("language") || "").toString();
  const file = formData.get("source");
  const userId =
    getUserId(request) || formData.get("user_id")?.toString() || null;

  if (!userId) {
    return NextResponse.json(
      { error: "Missing user_id. Authenticate or provide user_id." },
      { status: 401 }
    );
  }

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await ensureDir(submissionsDir);

  const filename = `${params.id}-${Date.now()}-${file.name}`;
  const filePath = path.join(submissionsDir, filename);
  await fs.writeFile(filePath, buffer);

  const submissions = await readJson(submissionsDb, []);
  const submission = {
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    user_id: userId,
    problem_id: problem.id,
    language,
    filename,
    file_path: filePath,
    created_at: new Date().toISOString(),
    status: "queued",
  };
  if (language === "python") {
    const judgeResult = await gradePythonSubmission({
      sourcePath: filePath,
      tests: problem.tests || [],
    });
    submission.status = judgeResult.passed ? "passed" : "failed";
    submission.result = judgeResult;
  } else {
    submission.result = { message: "Language grading is not implemented yet." };
  }
  submissions.push(submission);
  await writeJson(submissionsDb, submissions);

  return NextResponse.json({ status: submission.status, submission }, { status: 202 });
}
