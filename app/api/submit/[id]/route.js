import { NextResponse } from "next/server";
import { problems } from "@/data/problems";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  const problem = problems.find((p) => String(p.id) === params.id);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const language = (formData.get("language") || "").toString();
  const file = formData.get("source");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  // Placeholder response while judge integration is being built
  return NextResponse.json(
    {
      status: "queued",
      language,
      filename: file?.name || "source",
      message:
        "Judging backend is not enabled in this preview. We will run your code against hidden tests, record runtime/memory, and save to account once configured.",
    },
    { status: 202 }
  );
}
