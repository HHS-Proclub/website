export const problems = [
  {
    id: 1,
    title: "Challenge Problem 1",
    slug: "1",
    statement: "Solve sample problem 1. Given an integer n, output n*2.",
    inputSpec: "Single integer n",
    outputSpec: "n*2",
    samples: [ { input: "2\n", output: "4\n" }, { input: "7\n", output: "14\n" } ],
    tests: [ { input: "1\n", output: "2\n" }, { input: "10\n", output: "20\n" }, { input: "123\n", output: "246\n" } ],
  },
  {
    id: 2,
    title: "Reverse a String",
    slug: "reverse-string",
    statement: "Given a string s, return its reversed form.",
    inputSpec: "A single string s",
    outputSpec: "The reversed string",
    samples: [ { input: "hello\n", output: "olleh\n" } ],
    tests: [ { input: "abc\n", output: "cba\n" } ],
  },
];