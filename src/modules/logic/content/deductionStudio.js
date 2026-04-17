export const DEDUCTION_STUDIO_CONTENT = [
  {
    type: "contradiction-hunt",
    scenario: "Analyze these two statements.\nStatement A: All men are mortal.\nStatement B: Socrates is a man, but he will not die.",
    audioText: "Analyze these two statements. Statement A: All men are mortal. Statement B: Socrates is a man, but he will not die.",
    options: [
      { text: "Both can be true", feedback: "If everyone must die, can Socrates escape it?", isCorrect: false },
      { text: "They conflict (Contradiction)", feedback: "Correct. If all men are mortal, and Socrates is a man, he must be mortal.", isCorrect: true },
      { text: "One is too vague", feedback: "The statements are actually very precise.", isCorrect: false }
    ],
    explainBack: {
      question: "Which premise makes Statement B impossible?",
      options: [
        { text: "Socrates is a man.", isCorrect: false },
        { text: "All men are mortal.", isCorrect: true }
      ]
    }
  },
  {
    type: "missing-piece",
    scenario: "Premise 1: If it rains, the ground gets wet.\nConclusion: Therefore, it rained.",
    audioText: "Premise 1: If it rains, the ground gets wet. Conclusion: Therefore, it rained.",
    question: "What is wrong with this deduction?",
    options: [
      { text: "Nothing is wrong. It is valid.", feedback: "Wait. Are there other ways the ground could get wet?", isCorrect: false },
      { text: "The conclusion affirms the consequent.", feedback: "Correct! The ground being wet does not necessarily mean it rained. A sprinkler could have been on.", isCorrect: true }
    ]
  },
  {
    type: "build-chain",
    scenario: "Construct a valid categorical syllogism (Barbara form).",
    audioText: "Let's build a valid syllogism.",
    parts: [
      { id: "p1", text: "All humans are mortal." }, // Major premise
      { id: "p2", text: "Greek people are humans." }, // Minor premise
      { id: "p3", text: "Therefore, all Greek people are mortal." } // Conclusion
    ],
    correctOrder: ["p1", "p2", "p3"]
  }
];
