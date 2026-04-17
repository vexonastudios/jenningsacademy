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
    type: "contradiction-hunt",
    scenario: "A college professor declares: 'There is no such thing as absolute truth!'",
    audioText: "A college professor declares: 'There is no such thing as absolute truth!'",
    options: [
      { text: "It is a valid logical claim.", feedback: "Wait. Does the statement itself claim to be absolutely true?", isCorrect: false },
      { text: "It is a self-defeating contradiction.", feedback: "Exactly! By claiming 'there is no absolute truth,' the professor is making an absolute statement, which contradicts his own claim.", isCorrect: true },
      { text: "It asserts an enthymeme.", feedback: "An enthymeme is a syllogism with a missing premise. This is a direct contradiction.", isCorrect: false }
    ]
  },
  {
    type: "missing-piece",
    scenario: "Argument: 'God is perfectly good and loving. Therefore, God would never allow me to experience tragedy or sadness.'",
    audioText: "Argument: 'God is perfectly good and loving. Therefore, God would never allow me to experience tragedy or sadness.'",
    question: "This argument contains a hidden, unstated assumption (an enthymeme). What is the missing piece?",
    options: [
      { text: "Assumption: A perfectly loving being never allows people to face difficult trials.", feedback: "Spot on. The argument assumes that love equals total comfort, which ignores that trials can build perseverance and character.", isCorrect: true },
      { text: "Assumption: We don't always know what is purely good.", feedback: "While true, this isn't the specific assumption connecting the premise to the conclusion.", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Construct the valid categorical syllogism known as the Moral Argument.",
    audioText: "Let's construct the classic Moral Argument for the existence of God. Arrange these statements logically.",
    parts: [
      { id: "p2", text: "Objective moral values and duties do exist in reality." }, 
      { id: "p1", text: "If God does not exist, objective moral values and duties do not exist." }, 
      { id: "p3", text: "Therefore, God exists." } 
    ],
    correctOrder: ["p1", "p2", "p3"]
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
    type: "spot-flaw",
    scenario: "A critic argues: 'The Bible was written by human authors over thousands of years. Therefore, it must be filled with errors and contradictions.'",
    audioText: "A critic argues: 'The Bible was written by human authors over thousands of years. Therefore, it must be filled with errors and contradictions.'",
    options: [
      { text: "Valid Deduction", feedback: "Does the conclusion logically HAVE to follow the premise?", isCorrect: false },
      { text: "Hidden false premise", feedback: "Correct. The argument assumes 'Everything written by humans contains errors', completely ignoring the premise of divine inspiration.", isCorrect: true },
      { text: "Slippery Slope", feedback: "He isn't predicting a chain reaction of future events.", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Construct a valid categorical syllogism (Modus Ponens form).",
    audioText: "Let's build another valid syllogism using Modus Ponens.",
    parts: [
      { id: "p1", text: "If someone can forgive sins, they must be God." }, 
      { id: "p2", text: "Jesus Christ forgave sins." }, 
      { id: "p3", text: "Therefore, Jesus Christ is God." } 
    ],
    correctOrder: ["p1", "p2", "p3"]
  }
];
