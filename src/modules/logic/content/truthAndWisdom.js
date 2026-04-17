export const TRUTH_AND_WISDOM_CONTENT = [
  {
    type: "spot-flaw",
    scenario: "Tommy sees heavy rain falling outside his window. He says: 'It must be raining all over the whole world right now.'",
    audioText: "Tommy sees heavy rain falling outside his window. He says: 'It must be raining all over the whole world right now.'",
    options: [
      { text: "Good reasoning", feedback: "Think about it. Just because it's raining at Tommy's house, does that mean it's raining everywhere else?", isCorrect: false },
      { text: "Weak reasoning", feedback: "Exactly. Tommy assumes what is true for a small area is true everywhere.", isCorrect: true },
      { text: "Not enough information", feedback: "We know Tommy sees rain outside. He makes a big claim based on that.", isCorrect: false }
    ],
    explainBack: {
      question: "Why was Tommy's reasoning weak?",
      options: [
        { text: "He can't see the whole world from his window.", isCorrect: true },
        { text: "He should have checked the news first.", isCorrect: false }
      ]
    }
  },
  {
    type: "missing-piece",
    scenario: "A builder says: 'I have the strongest wood, the best bricks, and the finest tools. Therefore, my house will never fall down.'",
    audioText: "Jesus teaches that a wise man builds his house on the rock. A builder says: 'I have the strongest wood, the best bricks, and the finest tools. Therefore, my house will never fall down.'",
    question: "What is missing from the builder's reasoning?",
    options: [
      { text: "He forgot to mention what the foundation is built on.", feedback: "Good! Even the best bricks will fall if the house is built on sand.", isCorrect: true },
      { text: "He needs more workers to build it faster.", feedback: "Building faster wouldn't make the house stronger.", isCorrect: false }
    ]
  },
  {
    type: "fair-unfair",
    scenario: "Mia says: 'I don't think we should play tag today because the grass is too muddy.' Her friend Leo responds: 'Mia hates playing with us and just wants to ruin recess!'",
    audioText: "The Bible tells us to be fair and kind with our words. Mia says: 'I don't think we should play tag today because the grass is too muddy.' Her friend Leo responds: 'Mia hates playing with us and just wants to ruin recess!'",
    options: [
      { text: "Careful response", feedback: "Leo is jumping to a mean conclusion, instead of listening to Mia's actual reason.", isCorrect: false },
      { text: "Emotional and distorted response", feedback: "That's right. Mia only talked about the mud, but Leo exaggerated her words into an insult.", isCorrect: true }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Sam's brother runs into the room crying, holding a broken toy. Sam immediately yells, 'You broke my toy on purpose to be mean!'",
    audioText: "Proverbs chapter 18 says it is foolish to answer before listening. Sam's brother runs into the room crying, holding a broken toy. Sam immediately yells, 'You broke my toy on purpose to be mean!'",
    options: [
      { text: "He jumped to a conclusion without gathering the facts.", feedback: "Exactly. The brother might have tripped, or the toy might have already been broken.", isCorrect: true },
      { text: "He used circular reasoning.", feedback: "Circular reasoning is repeating the same point. Sam is just making a rash judgment.", isCorrect: false },
      { text: "Good reasoning", feedback: "Is it wise to accuse someone before asking what happened?", isCorrect: false }
    ],
    explainBack: {
      question: "What should Sam have done first to be a wise thinker?",
      options: [
        { text: "He should have taken the toy away immediately.", isCorrect: false },
        { text: "He should have asked his brother what happened.", isCorrect: true }
      ]
    }
  },
  {
    type: "missing-piece",
    scenario: "Sarah says: 'My dog is hungry. He needs to eat.'",
    audioText: "Sarah says: 'My dog is hungry. He needs to eat.'",
    question: "Is Sarah's thought complete to feed her dog?",
    options: [
      { text: "Yes, it is complete.", feedback: "Good! She stated a fact and the correct solution.", isCorrect: true },
      { text: "No, information is missing.", feedback: "She knows her dog is hungry. What else does she need?", isCorrect: false }
    ]
  },
  {
    type: "contradiction-hunt",
    scenario: "Analyze these two statements.\nStatement 1: God promised in the Bible that He will never leave us.\nStatement 2: When we make mistakes, God abandons us.",
    audioText: "Analyze these two statements. Statement 1: God promised in the Bible that He will never leave us. Statement 2: When we make mistakes, God abandons us.",
    options: [
      { text: "Both can be true", feedback: "If God never leaves us, can He also abandon us?", isCorrect: false },
      { text: "They conflict (Contradiction)", feedback: "Correct! If God promised to never leave us, then Statement 2 cannot possibly be true.", isCorrect: true },
      { text: "One is too vague", feedback: "They are actually very specific statements.", isCorrect: false }
    ]
  }
];
