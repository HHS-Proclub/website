const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";

export async function runCode({ source_code, language_id, stdin }) {
  const res = await fetch(
    `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code,
        language_id,
        stdin,
      }),
    }
  );

  const { token } = await res.json();

  if (!token) throw new Error("No token returned");

  let result;

  while (true) {
    const r = await fetch(
      `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    result = await r.json();

    if (result.status?.id > 2) break;

    await new Promise((r) => setTimeout(r, 500));
  }

  return result;
}