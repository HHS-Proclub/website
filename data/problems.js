export const problems = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Challenge Problem ${i + 1}`,
  slug: `${i + 1}`,
  statement: `Solve sample problem ${i + 1}. Given an integer n, output n*2.`,
  inputSpec: "Single integer n",
  outputSpec: "n*2",
  samples: [
    { input: "2", output: "4" },
    { input: "7", output: "14" },
  ],
  tests: [
    { input: "1", output: "2" },
    { input: "10", output: "20" },
    { input: "123", output: "246" },
  ],
}));
