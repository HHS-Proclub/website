export const problems = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Challenge Problem ${i + 1}`,
  slug: `${i + 1}`,
  statement: `Solve sample problem ${i + 1}. Given an integer n, output n*2.`,
  inputSpec: "Single integer n",
  outputSpec: "n*2",
  samples: [
    { input: "2\n", output: "4\n" },
    { input: "7\n", output: "14\n" },
  ],
  tests: [
    { input: "1\n", output: "2\n" },
    { input: "10\n", output: "20\n" },
    { input: "123\n", output: "246\n" },
  ],
}));
