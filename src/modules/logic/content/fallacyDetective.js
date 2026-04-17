export const FALLACY_DETECTIVE_CONTENT = [
  {
    type: "spot-flaw",
    scenario: "Candidate Smith argues his opponent's tax plan will hurt the middle class. The opponent responds: 'Well, you shouldn't listen to Smith, he can't even remember to tie his own shoes!'",
    audioText: "Candidate Smith argues his opponent's tax plan will hurt the middle class. The opponent responds: 'Well, you shouldn't listen to Smith, he can't even remember to tie his own shoes!'",
    options: [
      { text: "Hasty Generalization", feedback: "Not quite. Hasty Generalization is jumping to a conclusion with too few examples.", isCorrect: false },
      { text: "Ad Hominem", feedback: "Correct! The opponent attacked Smith personally rather than addressing the argument about the tax plan.", isCorrect: true },
      { text: "Red Herring", feedback: "It is a distraction, but because it specifically attacks the person's character, it's called an Ad Hominem.", isCorrect: false }
    ],
    explainBack: {
      question: "Why is this an Ad Hominem fallacy?",
      options: [
        { text: "Because he changed the subject completely.", isCorrect: false },
        { text: "Because he attacked the person instead of the argument.", isCorrect: true }
      ]
    }
  },
  {
    type: "fair-unfair",
    scenario: "Julie says: 'I think we should spend less money on new decorations for the youth group and instead donate to the food bank.' Mark says: 'Julie wants our youth group room to look terrible and doesn't care about our space!'",
    audioText: "Julie says: 'I think we should spend less money on new decorations for the youth group and instead donate to the food bank.' Mark says: 'Julie wants our youth group room to look terrible and doesn't care about our space!'",
    options: [
      { text: "Fair representation", feedback: "Did Mark accurately summarize what Julie said?", isCorrect: false },
      { text: "Straw Man fallacy (Distorted)", feedback: "Correct! Mark exaggerated Julie's position to make it easier to attack.", isCorrect: true }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "A commercial says: 'Either you buy our new expensive security system, or you don't care about your family's safety at all!'",
    audioText: "A commercial says: 'Either you buy our new expensive security system, or you don't care about your family's safety at all!'",
    options: [
      { text: "Hasty Generalization", feedback: "Are they jumping to a conclusion based on a small sample?", isCorrect: false },
      { text: "False Dilemma", feedback: "Exactly! They act like there are only two choices, ignoring that you could care about safety and just use a different system.", isCorrect: true },
      { text: "Good reasoning", feedback: "Think again. Is it true that the ONLY way to care about safety is buying their specific product?", isCorrect: false }
    ],
    explainBack: {
      question: "What trick does the False Dilemma play here?",
      options: [
        { text: "It pretends there are no other options.", isCorrect: true },
        { text: "It insults the families who don't buy the product.", isCorrect: false }
      ]
    }
  },
  {
    type: "spot-flaw",
    scenario: "A student is caught cheating on a math test. When confronted, he says: 'But Mr. Davis, did you know that the school lunches have been terrible lately? We need better pizza!'",
    audioText: "A student is caught cheating on a math test. When confronted, he says: 'But Mr. Davis, did you know that the school lunches have been terrible lately? We need better pizza!'",
    options: [
      { text: "Red Herring", feedback: "Correct! The student threw out a distracting topic to sniff the teacher off the trail of the real issue.", isCorrect: true },
      { text: "False Dilemma", feedback: "Is he presenting exactly two choices?", isCorrect: false },
      { text: "Circular Reasoning", feedback: "Is his conclusion just repeating his premise? No, he changed the subject entirely.", isCorrect: false }
    ],
    explainBack: {
      question: "Why is this a Red Herring?",
      options: [
        { text: "Because school lunches are actually important.", isCorrect: false },
        { text: "Because it completely avoids the topic of the cheating.", isCorrect: true }
      ]
    }
  },
  {
    type: "spot-flaw",
    scenario: "Sarah saw a teenager drop a candy wrapper on the sidewalk. She thought to herself, 'Wow, teenagers these days are so incredibly messy and disrespectful!'",
    audioText: "Sarah saw a teenager drop a candy wrapper on the sidewalk. She thought to herself, 'Wow, teenagers these days are so incredibly messy and disrespectful!'",
    options: [
      { text: "Straw Man", feedback: "Is Sarah distorting someone's argument?", isCorrect: false },
      { text: "Ad Hominem", feedback: "Is she attacking the teenager to avoid answering an argument? Not quite.", isCorrect: false },
      { text: "Hasty Generalization", feedback: "Correct! She saw one teenager do something wrong, and instantly assumed ALL teenagers are like that.", isCorrect: true }
    ],
    explainBack: {
      question: "How should Sarah think more carefully?",
      options: [
        { text: "Recognize that one example doesn't define a whole group of people.", isCorrect: true },
        { text: "Make sure the teenager actually dropped the wrapper on purpose before bringing it up.", isCorrect: false }
      ]
    }
  },
  {
    type: "missing-piece",
    scenario: "Liam argues: 'You have to let me go to the midnight movie. Every single person in our grade is going!'",
    audioText: "Liam argues: 'You have to let me go to the midnight movie. Every single person in our grade is going!'",
    question: "This is the Appeal to Popularity fallacy. What is the missing piece in Liam's logic?",
    options: [
      { text: "Just because something is popular doesn't mean it is a good or wise choice.", feedback: "Spot on. The number of people doing it doesn't make it the right thing to do.", isCorrect: true },
      { text: "He didn't explain what the movie was actually about.", feedback: "That might be true, but what is logically wrong with his main argument?", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Tim says: 'I am the best basketball player in our town because no one else is better than me at basketball.'",
    audioText: "Tim says: 'I am the best basketball player in our town because no one else is better than me at basketball.'",
    options: [
      { text: "Circular Reasoning", feedback: "Correct! He is trying to prove his point by just restating the same point in different words.", isCorrect: true },
      { text: "Slippery Slope", feedback: "Is he predicting a chain of terrible events? No.", isCorrect: false },
      { text: "Red Herring", feedback: "Did he change to an unrelated subject? No.", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Drag the parts of the argument into the correct logical order: Claim, Evidence, Conclusion.",
    audioText: "A good argument needs a clear structure. Let's arrange these statements.",
    parts: [
      { id: "evidence", text: "Whenever it snows, the roads get icy." },
      { id: "claim", text: "It is snowing heavily right now." },
      { id: "conclusion", text: "Therefore, the roads will be icy." }
    ],
    correctOrder: ["claim", "evidence", "conclusion"]
  }
];
