import fs from "fs";
import { execFileSync } from "child_process";
import path from "path";

export function gradePythonSubmission({ sourcePath, tests }) {
  const dir = path.join(
    "/tmp",
    `submission-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  fs.mkdirSync(dir, { recursive: true });

  const target = path.join(dir, "main.py");
  fs.copyFileSync(sourcePath, target);

  const results = [];

  for (const test of tests) {
    fs.writeFileSync(path.join(dir, "input.txt"), test.input);

    try {
      const output = execFileSync(
        "python3",
        [target],
        {
            input: test.input,
            timeout: 2000,
            encoding: "utf8",
        }
    );

      const actual = (output || "").trim();
      const expected = test.output.trim();
      const pass = actual === expected;

      results.push({ input: test.input, expected, actual, pass });

      if (!pass) break;
    } catch (err) {
      const stdout = typeof err.stdout === "string" ? err.stdout.trim() : "";
      const stderr = typeof err.stderr === "string" ? err.stderr.trim() : "";
      const errorType =
        err.signal === "SIGTERM" ? "TIME_LIMIT_EXCEEDED" : "RUNTIME_ERROR";

      console.error("gradePythonSubmission error:", {
        message: err.message,
        code: err.status || err.code,
        stdout,
        stderr,
      });

      results.push({
        input: test.input,
        expected: test.output.trim(),
        actual: stdout || null,
        stderr,
        pass: false,
        error: errorType,
        errorMessage: err.message,
      });
      break;
    }
  }

  return {
    passed: results.every((r) => r.pass),
    results,
    status: results.every((r) => r.pass) ? "passed" : "failed",
  };
}