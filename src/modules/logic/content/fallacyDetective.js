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
    type: "build-chain",
    scenario: "Drag the parts of the argument into the correct logical order: Claim, Evidence, Conclusion.",
    audioText: "A good argument needs a clear structure. Let's arrange these statements.",
    parts: [
      { id: "evidence", text: "Whenever it snows, the roads get icy." },
      { id: "claim", text: "It is snowing heavily right now." },
      { id: "conclusion", text: "Therefore, the roads will be icy." }
    ],
    correctOrder: ["claim", "evidence", "conclusion"] // Alternatively, Evidence, Claim, Conclusion is fine, but we can set one as primary. Let's accept claim first.
  }
];
