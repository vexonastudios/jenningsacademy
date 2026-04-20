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
  },
  {
    type: "contradiction-hunt",
    scenario: "Analyze these statements.\nStatement 1: My car is entirely painted glowing neon green.\nStatement 2: My car is entirely painted pitch black.",
    audioText: "Analyze these statements. Statement 1: My car is entirely painted glowing neon green. Statement 2: My car is entirely painted pitch black.",
    options: [
      { text: "They conflict (Contradiction)", feedback: "Correct! The word 'entirely' makes it impossible for both statements to be true at the same time and in the same way.", isCorrect: true },
      { text: "Both can be true", feedback: "Can a single object be 100% green and 100% black at the same time?", isCorrect: false },
      { text: "One is too vague", feedback: "Both make very specific claims.", isCorrect: false }
    ]
  },
  {
    type: "missing-piece",
    scenario: "Premise: If I study hard, I will pass the test.\nConclusion: I passed the test, so I must have studied hard.",
    audioText: "Premise: If I study hard, I will pass the test. Conclusion: I passed the test, so I must have studied hard.",
    question: "This is a formal fallacy known as Affirming the Consequent. What is the logical flaw?",
    options: [
      { text: "Passing the test doesn't prove you studied; you could have just guessed or known the material already.", feedback: "Perfect! If A leads to B, having B does not automatically prove A happened.", isCorrect: true },
      { text: "You should not need to study for a test.", feedback: "This is a statement of opinion, not a logical deduction.", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Construct a valid Disjunctive Syllogism.",
    audioText: "A Disjunctive Syllogism uses 'Either/Or'. Let's build one.",
    parts: [
      { id: "p1", text: "Either the battery is dead, or the bulb is broken." }, 
      { id: "p2", text: "The battery is not dead." }, 
      { id: "p3", text: "Therefore, the bulb is broken." } 
    ],
    correctOrder: ["p1", "p2", "p3"]
  },
  {
    type: "contradiction-hunt",
    scenario: "A famous singer says on TV: 'I refuse to ever speak in English to anyone, anywhere!'",
    audioText: "A famous singer says on TV: 'I refuse to ever speak in English to anyone, anywhere!'",
    options: [
      { text: "It is a self-defeating contradiction.", feedback: "Correct! The singer is speaking in English to state that they refuse to speak in English.", isCorrect: true },
      { text: "It is a valid preference.", feedback: "Look closely at the language she is using to make the claim.", isCorrect: false },
      { text: "It is a Modus Ponens argument.", feedback: "Modus Ponens applies to 'If-Then' statements, not simple claims.", isCorrect: false }
    ],
    explainBack: {
      question: "Why does the singer's statement defeat itself?",
      options: [
        { text: "Because she violated her own rule in the same breath.", isCorrect: true },
        { text: "Because she should learn other languages first.", isCorrect: false }
      ]
    }
  },
  {
    type: "missing-piece",
    scenario: "Argument: 'That car is moving incredibly fast. Therefore, it must be breaking the speed limit.'",
    audioText: "Argument: 'That car is moving incredibly fast. Therefore, it must be breaking the speed limit.'",
    question: "Identify the hidden enthymeme (unstated assumption) connecting the premise to the conclusion.",
    options: [
      { text: "Assume: Driving 'fast' means exceeding the legal limit in this specific zone.", feedback: "Correct. The argument assumes 'fast' automatically means 'illegal', ignoring what the actual limit is.", isCorrect: true },
      { text: "Assume: Cars always have working speedometers.", feedback: "The speedometer isn't the logical connection here.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Premise 1: If an animal is a dog, it has four legs.\nPremise 2: My cat has four legs.\nConclusion: Therefore, my cat is a dog.",
    audioText: "Premise 1: If an animal is a dog, it has four legs. Premise 2: My cat has four legs. Conclusion: Therefore, my cat is a dog.",
    options: [
      { text: "Affirming the Consequent", feedback: "Correct! The fact that both share a trait (four legs) does not make them the same thing. This is classic broken logic.", isCorrect: true },
      { text: "Valid Deduction", feedback: "Think about the conclusion: can a cat be a dog?", isCorrect: false },
      { text: "Slippery Slope", feedback: "Does this argument predict a future disaster? No.", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Construct a Hypothetical Syllogism (a chain reaction of logic).",
    audioText: "A Hypothetical Syllogism chains 'If-Then' statements together.",
    parts: [
      { id: "p1", text: "If I wake up late, I will miss the bus." }, 
      { id: "p2", text: "If I miss the bus, I will be late for work." }, 
      { id: "p3", text: "Therefore, if I wake up late, I will be late for work." } 
    ],
    correctOrder: ["p1", "p2", "p3"]
  },
  {
    type: "contradiction-hunt",
    scenario: "A man argues online: 'You should never, ever tell anyone what they should or shouldn't do!'",
    audioText: "A man argues online: 'You should never, ever tell anyone what they should or shouldn't do!'",
    options: [
      { text: "It is a self-defeating contradiction.", feedback: "Spot on! By saying 'you should never...', he is actively telling someone what they shouldn't do.", isCorrect: true },
      { text: "It is an unstated assumption.", feedback: "He stated his rule very clearly, the problem is the rule contradicts itself.", isCorrect: false },
      { text: "It is an Ad Hominem attack.", feedback: "He isn't attacking a specific person's character.", isCorrect: false }
    ]
  },
  {
    type: "missing-piece",
    scenario: "Argument: 'That movie is rated R. Therefore, children should not watch it.'",
    audioText: "Argument: 'That movie is rated R. Therefore, children should not watch it.'",
    question: "Identify the hidden enthymeme making this argument work.",
    options: [
      { text: "Assume: Children should not watch movies that have an R rating.", feedback: "Correct! The argument requires this widely accepted moral premise to reach the conclusion.", isCorrect: true },
      { text: "Assume: R-rated movies are very expensive.", feedback: "The rating describes content, not cost.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Premise 1: All birds lay eggs.\nPremise 2: A platypus lays eggs.\nConclusion: Therefore, a platypus is a bird.",
    audioText: "Premise 1: All birds lay eggs. Premise 2: A platypus lays eggs. Conclusion: Therefore, a platypus is a bird.",
    options: [
      { text: "Affirming the Consequent", feedback: "Correct! Laying eggs is a necessary condition for birds, but it is not EXCLUSIVE to birds.", isCorrect: true },
      { text: "Hidden false premise", feedback: "Both premises are actually factually true. The logic connecting them is the flaw.", isCorrect: false },
      { text: "Valid Deduction", feedback: "Wait, is a platypus really a bird?", isCorrect: false }
    ],
    explainBack: {
      question: "Why does this syllogism fail?",
      options: [
        { text: "Because other non-birds can also lay eggs.", isCorrect: true },
        { text: "Because the platypus doesn't exist.", isCorrect: false }
      ]
    }
  },
  {
    type: "build-chain",
    scenario: "Construct the Teleological (Design) Argument.",
    audioText: "Let's construct the classic Teleological argument for God.",
    parts: [
      { id: "p1", text: "Every design requires a designer." }, 
      { id: "p2", text: "The universe exhibits complex, fine-tuned design." }, 
      { id: "p3", text: "Therefore, the universe has a designer." } 
    ],
    correctOrder: ["p1", "p2", "p3"]
  },
  {
    type: "contradiction-hunt",
    scenario: "Analyze these statements.\nStatement A: I am an only child.\nStatement B: My sister is going to the store.",
    audioText: "Analyze these statements. Statement A: I am an only child. Statement B: My sister is going to the store.",
    options: [
      { text: "They conflict (Contradiction)", feedback: "Correct! You cannot have a sister if you are an only child.", isCorrect: true },
      { text: "Both can be true", feedback: "Think about the definition of an 'only child'.", isCorrect: false },
      { text: "One is an enthymeme", feedback: "These are direct statements of fact, not logical deductions.", isCorrect: false }
    ]
  },
  {
    type: "missing-piece",
    scenario: "Premise 1: If it snows heavily, school will be canceled.\nPremise 2: School was canceled.\nConclusion: It must have snowed heavily.",
    audioText: "Premise 1: If it snows heavily, school will be canceled. Premise 2: School was canceled. Conclusion: It must have snowed heavily.",
    question: "What is wrong with this deduction?",
    options: [
      { text: "School can be canceled for many other reasons like power outages or holidays.", feedback: "Spot on! The conclusion incorrectly affirms the consequent.", isCorrect: true },
      { text: "Nothing is wrong; it is perfectly logical.", feedback: "Think of other reasons the event could happen.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "A politician claims: 'I am a firm believer in free speech! Everyone should have the right to say whatever they want, unless I personally disagree with it.'",
    audioText: "A politician claims: 'I am a firm believer in free speech! Everyone should have the right to say whatever they want, unless I personally disagree with it.'",
    options: [
      { text: "Self-defeating Contradiction", feedback: "Correct! True free speech cannot exist if it is limited by a single person's opinions.", isCorrect: true },
      { text: "Valid Deduction", feedback: "Do the two halves of the sentence agree with each other?", isCorrect: false },
      { text: "Straw Man", feedback: "He is stating his own view, not twisting someone else's.", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Construct the Kalam Cosmological Argument.",
    audioText: "The Kalam argument is a famous logical deduction. Construct it.",
    parts: [
      { id: "p1", text: "Whatever begins to exist has a cause." }, 
      { id: "p2", text: "The universe began to exist." }, 
      { id: "p3", text: "Therefore, the universe has a cause." } 
    ],
    correctOrder: ["p1", "p2", "p3"]
  }
];
