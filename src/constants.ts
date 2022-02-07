export const Tests = [
  { id: 1, name: "first test" },
  { id: 2, name: "second test" },
  { id: 3, name: "third test" },
];

export const Suites = [
  {
    id: 1,
    name: "first suite",
    tests: [
      { id: 1, name: "first test" },
      { id: 2, name: "second test" },
      { id: 3, name: "third test" },
    ]
  },
  {
    id: 2,
    name: "second suite",
    tests: [
      { id: 1, name: "only test" }
    ]
  }
];