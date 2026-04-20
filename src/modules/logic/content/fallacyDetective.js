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
  },
  {
    type: "spot-flaw",
    scenario: "If we let students choose their own book for the library project, next they'll want to choose the teachers, and before we know it, students will be running the whole school in total chaos!",
    audioText: "If we let students choose their own book for the library project, next they'll want to choose the teachers, and before we know it, students will be running the whole school in total chaos!",
    options: [
      { text: "Circular Reasoning", feedback: "Is the conclusion just repeating the premise?", isCorrect: false },
      { text: "Slippery Slope", feedback: "Correct! The speaker connects a small harmless step to a massive disaster without any logical proof.", isCorrect: true },
      { text: "Red Herring", feedback: "Does the speaker completely change the subject? No, they predict the future wildly.", isCorrect: false }
    ],
    explainBack: {
      question: "Why is a Slippery Slope bad logic?",
      options: [
        { text: "Because small steps usually don't cause massive, unconnected disasters.", isCorrect: true },
        { text: "Because the speaker's voice is too loud.", isCorrect: false }
      ]
    }
  },
  {
    type: "spot-flaw",
    scenario: "No one has ever proven that aliens do NOT live on the rings of Saturn. Therefore, alien civilizations definitely exist on Saturn's rings!",
    audioText: "No one has ever proven that aliens do NOT live on the rings of Saturn. Therefore, alien civilizations definitely exist on Saturn's rings!",
    options: [
      { text: "Appeal to Ignorance", feedback: "Exactly. Just because something hasn't been proven false doesn't automatically make it true.", isCorrect: true },
      { text: "Hasty Generalization", feedback: "They aren't generalizing from a small sample. They are relying on a lack of evidence.", isCorrect: false },
      { text: "False Dilemma", feedback: "Are they giving only two choices? No.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Alice: 'You really shouldn't eat so much junk food, it's bad for you.' Bob: 'Why should I listen to you? You ate three donuts yesterday!'",
    audioText: "Alice: 'You really shouldn't eat so much junk food, it's bad for you.' Bob: 'Why should I listen to you? You ate three donuts yesterday!'",
    options: [
      { text: "Straw Man", feedback: "Did Bob twist Alice's words?", isCorrect: false },
      { text: "Tu Quoque (You Also)", feedback: "Correct! Bob attacked Alice's hypocrisy instead of dealing with her argument. Even if Alice is a hypocrite, junk food is still bad for you.", isCorrect: true },
      { text: "Circular Reasoning", feedback: "Bob is not restating his own conclusion.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "People have believed that the earth is flat for thousands of years. It's a very old belief, so there must be some truth to it.",
    audioText: "People have believed that the earth is flat for thousands of years. It's a very old belief, so there must be some truth to it.",
    options: [
      { text: "Appeal to Tradition", feedback: "Correct! Just because something has been around a long time does not make it true.", isCorrect: true },
      { text: "Ad Hominem", feedback: "Is there a personal attack here?", isCorrect: false },
      { text: "Red Herring", feedback: "Is the subject being changed to distract you?", isCorrect: false }
    ]
  },
  {
    type: "fair-unfair",
    scenario: "Senator Jones says: 'We need to invest more in our military defense.' The news reporter states: 'Senator Jones wants to start World War III and loves violence!'",
    audioText: "Senator Jones says: 'We need to invest more in our military defense.' The news reporter states: 'Senator Jones wants to start World War III and loves violence!'",
    options: [
      { text: "Straw Man fallacy (Distorted)", feedback: "Correct! The reporter wildly exaggerated the Senator's view to make him look evil.", isCorrect: true },
      { text: "Fair representation", feedback: "Is wanting strong defense the exact same as wanting World War III?", isCorrect: false }
    ]
  },
  {
    type: "missing-piece",
    scenario: "Tom argues: 'You either have to buy me a new video game console, or I will be bored for the rest of my life!'",
    audioText: "Tom argues: 'You either have to buy me a new video game console, or I will be bored for the rest of my life!'",
    question: "This is a False Dilemma. What is the missing flaw in Tom's logic?",
    options: [
      { text: "He forgets there are thousands of other ways to not be bored, like reading, going outside, or playing a board game.", feedback: "Spot on! There are always more than two extreme options in life.", isCorrect: true },
      { text: "He forgot to say please.", feedback: "Manners are good, but what is logically wrong?", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Drag the parts of the argument into a Modus Tollens structure.",
    audioText: "A Modus Tollens argument takes the form: If P, then Q. Not Q. Therefore, Not P.",
    parts: [
      { id: "evidence", text: "It is not cloudy." },
      { id: "claim", text: "If it is raining, then it must be cloudy." },
      { id: "conclusion", text: "Therefore, it is not raining." }
    ],
    correctOrder: ["claim", "evidence", "conclusion"]
  },
  {
    type: "spot-flaw",
    scenario: "The new movie 'Galactic Wars' must be the greatest movie ever made because it made a billion dollars on opening weekend!",
    audioText: "The new movie 'Galactic Wars' must be the greatest movie ever made because it made a billion dollars on opening weekend!",
    options: [
      { text: "Appeal to Popularity", feedback: "Correct! Just because many people paid to see it does not mean the plot or acting was good.", isCorrect: true },
      { text: "Circular Reasoning", feedback: "Are they restating the conclusion? No, they are pointing to money.", isCorrect: false },
      { text: "False Dilemma", feedback: "Are there only two choices presented?", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Dr. Gregory says the new bridge design is structurally unsafe. Mayor Higgins says: 'Ignore Dr. Gregory. He wears ugly shirts and drives a rusty car!'",
    audioText: "Dr. Gregory says the new bridge design is structurally unsafe. Mayor Higgins says: 'Ignore Dr. Gregory. He wears ugly shirts and drives a rusty car!'",
    options: [
      { text: "Red Herring", feedback: "Close, it is distracting, but attack on clothing/cars is a specific type of fallacy.", isCorrect: false },
      { text: "Ad Hominem", feedback: "Correct! An attack on the person rather than the engineering argument.", isCorrect: true },
      { text: "Slippery Slope", feedback: "There are no extreme futures predicted here.", isCorrect: false }
    ],
    explainBack: {
      question: "What does the car a man drives have to do with bridge engineering?",
      options: [
        { text: "Nothing at all.", isCorrect: true },
        { text: "Engineers should drive nice cars.", isCorrect: false }
      ]
    }
  },
  {
    type: "spot-flaw",
    scenario: "To prove that ghosts exist, Susan says: 'Ghosts exist because I saw one, and I only see things that exist!'",
    audioText: "To prove that ghosts exist, Susan says: 'Ghosts exist because I saw one, and I only see things that exist!'",
    options: [
      { text: "Circular Reasoning", feedback: "Correct! She is basically saying 'Ghosts exist because ghosts exist'.", isCorrect: true },
      { text: "Hasty Generalization", feedback: "She isn't judging a whole population based on a sample.", isCorrect: false },
      { text: "Appeal to Ignorance", feedback: "She relies on what she 'saw', not on what hasn't been disproven.", isCorrect: false }
    ]
  },
  {
    type: "missing-piece",
    scenario: "Carl reads an article about a shark attack in Australia. The next day he reads about a shark attack in Florida. He declares: 'It is not safe to swim in any ocean, ever again!'",
    audioText: "Carl reads an article about a shark attack in Australia. The next day he reads about a shark attack in Florida. He declares: 'It is not safe to swim in any ocean, ever again!'",
    question: "This Hasty Generalization misses a key statistical piece of logic. What is it?",
    options: [
      { text: "Two incidents out of millions of swimmers around the world is too small a sample to fear all oceans.", feedback: "Perfect. A tiny sample does not equal a universal rule.", isCorrect: true },
      { text: "He didn't check what kind of shark it was.", feedback: "The species doesn't matter as much as his tiny sample size.", isCorrect: false }
    ]
  },
  {
    type: "fair-unfair",
    scenario: "Mother asks: 'Did you clean your room like I asked?' Son answers: 'Why are you always trying to control my life and make me miserable?'",
    audioText: "Mother asks: 'Did you clean your room like I asked?' Son answers: 'Why are you always trying to control my life and make me miserable?'",
    options: [
      { text: "Red Herring / Avoidance", feedback: "Correct! Instead of answering the question, the son deflects by attacking the mother's motives.", isCorrect: true },
      { text: "Fair response", feedback: "Did the son answer the question respectfully?", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "I don't need to listen to your argument about morality because you read it in a book written by a controversial author.",
    audioText: "I don't need to listen to your argument about morality because you read it in a book written by a controversial author.",
    options: [
      { text: "Genetic Fallacy", feedback: "Correct! Dismissing an argument purely because of where it originated from is poor logic. Even a bad source can state a true fact.", isCorrect: true },
      { text: "Appeal to Popularity", feedback: "Does it claim a majority believe it? No.", isCorrect: false },
      { text: "False Dilemma", feedback: "Does it give only two options?", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Build a chain that exposes an Ad Hominem fallacy.",
    audioText: "Let's arrange the steps of how an Ad Hominem fails logic.",
    parts: [
      { id: "p2", text: "The first person states a factual argument about taxes." },
      { id: "p1", text: "The opponent ignores the argument completely." },
      { id: "p3", text: "The opponent insults the first person's appearance to win the crowd." }
    ],
    correctOrder: ["p2", "p1", "p3"]
  },
  {
    type: "spot-flaw",
    scenario: "Teacher: 'We need to focus more on spelling this semester.' Parent: 'So you think math is completely useless and we shouldn't teach numbers at all?'",
    audioText: "Teacher: 'We need to focus more on spelling this semester.' Parent: 'So you think math is completely useless and we shouldn't teach numbers at all?'",
    options: [
      { text: "Straw Man", feedback: "Correct! The parent twisted the teacher's desire for more spelling into a hatred for math, which the teacher never said.", isCorrect: true },
      { text: "Circular Reasoning", feedback: "Is the parent restating a premise?", isCorrect: false },
      { text: "Hasty Generalization", feedback: "Are they jumping to a conclusion about a group based on one person?", isCorrect: false }
    ],
    explainBack: {
      question: "Why is this a Straw Man?",
      options: [
        { text: "Because wanting to improve one area does not mean you hate another area.", isCorrect: true },
        { text: "Because math is actually very important.", isCorrect: false }
      ]
    }
  }
];
