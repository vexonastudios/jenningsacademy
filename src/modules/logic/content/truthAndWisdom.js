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
    scenario: "Sarah says: 'My dog is hungry. He needs to eat.'",
    audioText: "Sarah says: 'My dog is hungry. He needs to eat.'",
    question: "Is Sarah's thought complete to feed her dog?",
    options: [
      { text: "Yes, it is complete.", feedback: "Good! She stated a fact and the correct solution.", isCorrect: true },
      { text: "No, information is missing.", feedback: "She knows her dog is hungry. What else does she need?", isCorrect: false }
    ]
  },
  {
    type: "fair-unfair",
    scenario: "Mom says: 'We need to clean the living room before our guests arrive.' Leo says: 'You never let me play! You always make me work!'",
    audioText: "Mom says: 'We need to clean the living room before our guests arrive.' Leo says: 'You never let me play! You always make me work!'",
    options: [
      { text: "Careful response", feedback: "Leo is exaggerating. He isn't being careful with his words.", isCorrect: false },
      { text: "Emotional and distorted response", feedback: "That's right. Mom only asked him to clean the living room, but he exaggerated it.", isCorrect: true }
    ]
  }
];
