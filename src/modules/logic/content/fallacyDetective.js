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
  },
  {
    type: "spot-flaw",
    scenario: "Customer: 'This phone battery dies after two hours.' Salesman: 'Well, millions of people buy this phone, so it must be the best one on the market!'",
    audioText: "Customer: 'This phone battery dies after two hours.' Salesman: 'Well, millions of people buy this phone, so it must be the best one on the market!'",
    options: [
      { text: "Bandwagon Fallacy", feedback: "Correct! The salesman argues that because many people buy it, it must be good, ignoring the actual complaint.", isCorrect: true },
      { text: "Red Herring", feedback: "He is distracting, but using popularity as his specific argument.", isCorrect: false },
      { text: "Ad Hominem", feedback: "The salesman doesn't attack the customer personally.", isCorrect: false }
    ],
    explainBack: {
      question: "Why is the Bandwagon fallacy dangerous here?",
      options: [
        { text: "It uses group approval to ignore a real factual problem.", isCorrect: true },
        { text: "It forces the customer to pay more money.", isCorrect: false }
      ]
    }
  },
  {
    type: "fair-unfair",
    scenario: "Mom: 'You cannot go to the concert on a school night.' Son: 'So you don't want me to ever have fun with my friends again?!'",
    audioText: "Mom: 'You cannot go to the concert on a school night.' Son: 'So you don't want me to ever have fun with my friends again?!'",
    options: [
      { text: "Careful response", feedback: "The son overreacted massively to a specific boundary.", isCorrect: false },
      { text: "Emotional and distorted response (Straw Man)", feedback: "Right. The son twisted a reasonable boundary on a school night into a claim that mom hates fun entirely.", isCorrect: true }
    ]
  },
  {
    type: "missing-piece",
    scenario: "A politician claims, 'Crime went down the same year ice cream sales went down. Ice cream causes crime!'",
    audioText: "A politician claims, 'Crime went down the same year ice cream sales went down. Ice cream causes crime!'",
    question: "What logic rule did the politician forget?",
    options: [
      { text: "Correlation does not equal Causation.", feedback: "Precisely! Just because two things happen at the same time doesn't mean one causes the other.", isCorrect: true },
      { text: "The Law of Non-Contradiction.", feedback: "There's no direct contradiction here, just a bad assumption of cause.", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Build a chain showing the Slippery Slope fallacy.",
    audioText: "Let's arrange the steps of a Slippery Slope fallacy.",
    parts: [
      { id: "p1", text: "If I let you skip this homework assignment..." },
      { id: "p2", text: "You will start skipping all your homework and fail the class..." },
      { id: "p3", text: "And then you'll never get a job and you'll end up living in a cardboard box!" }
    ],
    correctOrder: ["p1", "p2", "p3"]
  },
  {
    type: "contradiction-hunt",
    scenario: "Analyze these laws governing a new town.\nLaw A: Residents are completely forbidden from keeping pets of any kind.\nLaw B: All dogs kept by residents must wear a blue collar.",
    audioText: "Analyze these laws governing a new town. Law A: Residents are completely forbidden from keeping pets of any kind. Law B: All dogs kept by residents must wear a blue collar.",
    options: [
      { text: "Both can be true", feedback: "If you are forbidden from keeping pets, can you keep a dog to put a collar on?", isCorrect: false },
      { text: "They conflict (Contradiction)", feedback: "Exactly. The first law forbids pets. The second law regulates a pet. They contradict.", isCorrect: true },
      { text: "One is too vague", feedback: "They are both very specific laws.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "A student asks, 'Why did I fail the exam?' The teacher replies, 'Because you didn't pass it.'",
    audioText: "A student asks, 'Why did I fail the exam?' The teacher replies, 'Because you didn't pass it.'",
    options: [
      { text: "Ad Hominem", feedback: "The teacher didn't insult the student.", isCorrect: false },
      { text: "Circular Reasoning (Begging the Question)", feedback: "Spot on! 'Failed' and 'didn't pass' mean the exact same thing; the teacher didn't provide a real reason.", isCorrect: true },
      { text: "Straw Man", feedback: "The teacher didn't exaggerate the student's argument.", isCorrect: false }
    ],
    explainBack: {
      question: "How could the teacher give a logical answer?",
      options: [
        { text: "'Because you missed more than 15 calculation questions.'", isCorrect: true },
        { text: "'Because you failed it repeatedly.'", isCorrect: false }
      ]
    }
  },
  {
    type: "fair-unfair",
    scenario: "Politician A says, 'We need to reduce military spending by 5% to balance the budget.' Politician B replies, 'My opponent wants to leave our country completely defenseless against terrorists!'",
    audioText: "Politician A says, 'We need to reduce military spending by 5% to balance the budget.' Politician B replies, 'My opponent wants to leave our country completely defenseless against terrorists!'",
    options: [
      { text: "Careful and fair response", feedback: "Does a 5% cut leave a country 'completely defenseless'?", isCorrect: false },
      { text: "Distorted response (Straw Man)", feedback: "Exactly. Politician B wildly exaggerated a small budget cut into total destruction.", isCorrect: true }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "An ad claims: 'Either you buy the new Turbo-Clean vacuum, or your house will remain a filthy, bacteria-filled dungeon forever!'",
    audioText: "An ad claims: 'Either you buy the new Turbo-Clean vacuum, or your house will remain a filthy, bacteria-filled dungeon forever!'",
    options: [
      { text: "False Dilemma (Either/Or Fallacy)", feedback: "Spot on. The ad gives only two extreme choices, ignoring the fact that you can clean your house with a broom or an older vacuum.", isCorrect: true },
      { text: "Hasty Generalization", feedback: "It isn't making an assumption based on a small sample.", isCorrect: false },
      { text: "Appeal to Authority", feedback: "The ad isn't citing an expert.", isCorrect: false }
    ]
  },
  {
    type: "missing-piece",
    scenario: "A historian claims, 'The Roman Empire fell entirely because they used lead pipes for their drinking water.'",
    audioText: "A historian claims, 'The Roman Empire fell entirely because they used lead pipes for their drinking water.'",
    question: "What logic principle is the historian ignoring regarding complex events?",
    options: [
      { text: "Fallacy of Single Cause.", feedback: "You got it! The fall of an empire involves politics, economics, and warfare, not just one single cause like pipes.", isCorrect: true },
      { text: "Texas Sharpshooter Fallacy.", feedback: "This is not about cherry-picking data to fit a pattern.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "A man on TV argues: 'You should definitely vote for Proposition 4, because my mechanic says it will improve our city's economy!'",
    audioText: "A man on TV argues: 'You should definitely vote for Proposition 4, because my mechanic says it will improve our city's economy!'",
    options: [
      { text: "False Authority", feedback: "Correct! A car mechanic is a great source for car repairs, but not necessarily an expert on city economics.", isCorrect: true },
      { text: "Bandwagon Fallacy", feedback: "The speaker is relying on one person, not a popular crowd.", isCorrect: false },
      { text: "Slippery Slope", feedback: "There is no chain of worsening events described here.", isCorrect: false }
    ],
    explainBack: {
      question: "Which expert would make this a stronger argument?",
      options: [
        { text: "A trained city economist.", isCorrect: true },
        { text: "A very popular celebrity actor.", isCorrect: false }
      ]
    }
  },
  {
    type: "build-chain",
    scenario: "Arrange the statements to demonstrate Circular Reasoning.",
    audioText: "Arrange the statements to demonstrate Circular Reasoning.",
    parts: [
      { id: "p1", text: "The new principal is the best principal we've ever had." },
      { id: "p2", text: "How do you know he is the best?" },
      { id: "p3", text: "Because nobody has ever been better than him." }
    ],
    correctOrder: ["p1", "p2", "p3"]
  },
  {
    type: "spot-flaw",
    scenario: "A debater argues: 'I see a few clouds in the sky. If we don't ban driving cars today, the earth will completely explode from pollution by tomorrow afternoon!'",
    audioText: "A debater argues: 'I see a few clouds in the sky. If we don't ban driving cars today, the earth will completely explode from pollution by tomorrow afternoon!'",
    options: [
      { text: "Red Herring", feedback: "Red Herring changes the subject. This is a crazy exaggeration of consequence.", isCorrect: false },
      { text: "Slippery Slope / Absurd Extrapolation", feedback: "Exactly. The debater jumps from seeing a few clouds directly to the planet exploding tomorrow.", isCorrect: true },
      { text: "Ad Hominem", feedback: "No personal insults were made.", isCorrect: false }
    ]
  },
  {
    type: "contradiction-hunt",
    scenario: "Analyze these statements.\nStatement 1: The chef's secret recipe has never been written down or spoken out loud.\nStatement 2: I found a copy of the chef's secret recipe typed in a book.",
    audioText: "Analyze these statements. Statement 1: The chef's secret recipe has never been written down or spoken out loud. Statement 2: I found a copy of the chef's secret recipe typed in a book.",
    options: [
      { text: "They conflict (Contradiction)", feedback: "Right. If it was *never* written down, you cannot find it typed in a book.", isCorrect: true },
      { text: "Both can be true", feedback: "Can something never written down be found in a book?", isCorrect: false },
      { text: "One is an opinion", feedback: "Both make factual claims about existence.", isCorrect: false }
    ]
  },
  {
    type: "fair-unfair",
    scenario: "A friend says, 'I can't go to the movies tonight because I promised my mom I would babysit.' Another friend replies, 'Oh, so you think spending time with your mom is better than us?'",
    audioText: "A friend says, 'I can't go to the movies tonight because I promised my mom I would babysit.' Another friend replies, 'Oh, so you think spending time with your mom is better than us?'",
    options: [
      { text: "Fair evaluation", feedback: "The friend didn't say who in the group was 'better', they just stated a prior commitment.", isCorrect: false },
      { text: "Unfair distortion (Straw Man)", feedback: "Correct. The second friend twisted an obligation to babysit into a personal insult about friendship.", isCorrect: true }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Alex failed the science test. When his parents ask why, he says: 'Well, did you know that polar bears can smell seals from a mile away?'",
    audioText: "Alex failed the science test. When his parents ask why, he says: 'Well, did you know that polar bears can smell seals from a mile away?'",
    options: [
      { text: "Red Herring", feedback: "Spot on! Alex is throwing out an interesting but completely irrelevant fact to distract from his failing grade.", isCorrect: true },
      { text: "False Dilemma", feedback: "He didn't give two false options.", isCorrect: false },
      { text: "Ad Hominem", feedback: "He didn't insult his parents.", isCorrect: false }
    ]
  },
  {
    type: "missing-piece",
    scenario: "A commercial shows a very sick person taking Medicine A. The next scene shows them running a marathon. The narrator says, 'Medicine A cures everything!'",
    audioText: "A commercial shows a very sick person taking Medicine A. The next scene shows them running a marathon. The narrator says, 'Medicine A cures everything!'",
    question: "What logic flaw is the commercial hoping you will commit?",
    options: [
      { text: "Hasty Generalization", feedback: "Correct! You see one (possibly fake) case and are asked to believe it works perfectly for everyone, everywhere.", isCorrect: true },
      { text: "Straw Man", feedback: "The commercial is not attacking a distorted argument.", isCorrect: false }
    ]
  },
  {
    type: "build-chain",
    scenario: "Arrange the statements to demonstrate a False Dilemma (Either/Or) fallacy.",
    audioText: "Arrange the statements to demonstrate a False Dilemma (Either/Or) fallacy.",
    parts: [
      { id: "p1", text: "We have two choices." },
      { id: "p2", text: "Either we cancel the field trip entirely..." },
      { id: "p3", text: "Or we force every student to pay 100 dollars today!" }
    ],
    correctOrder: ["p1", "p2", "p3"]
  },
  {
    type: "spot-flaw",
    scenario: "A man argues, 'Ghosts must be completely real! Why? Because you can't prove that they don't exist!'",
    audioText: "A man argues, 'Ghosts must be completely real! Why? Because you can't prove that they don't exist!'",
    options: [
      { text: "Appeal to Ignorance", feedback: "Spot on! 'You can't prove it false, so it must be true' is a classic logic trap.", isCorrect: true },
      { text: "Circular Reasoning", feedback: "He is moving the burden of proof, not repeating himself.", isCorrect: false },
      { text: "Bandwagon Fallacy", feedback: "He isn't claiming that a crowd believes in ghosts.", isCorrect: false }
    ]
  },
  {
    type: "fair-unfair",
    scenario: "A journalist writes: 'The mayor said we should repair the library roof. Thus, the mayor wants to bankrupt our city on luxury buildings!'",
    audioText: "A journalist writes: 'The mayor said we should repair the library roof. Thus, the mayor wants to bankrupt our city on luxury buildings!'",
    options: [
      { text: "Careful reporting", feedback: "Is fixing a roof the same as bankrupting a city on luxury?", isCorrect: false },
      { text: "Unfair Straw Man", feedback: "Right. The journalist twisted a basic maintenance repair into a massive luxury scandal.", isCorrect: true }
    ]
  },
  {
    type: "contradiction-hunt",
    scenario: "Statement 1: John is holding a solid, uncarved square wooden block.\nStatement 2: John is holding a perfectly round, spherical wooden ball.",
    audioText: "Statement 1: John is holding a solid, uncarved square wooden block. Statement 2: John is holding a perfectly round, spherical wooden ball.",
    options: [
      { text: "Both can be true", feedback: "Can a solid object be simultaneously perfectly square and perfectly round spherical?", isCorrect: false },
      { text: "They conflict (Contradiction)", feedback: "Exactly right. Geometrically, something cannot be completely square and completely round at the same time and in the same way.", isCorrect: true },
      { text: "One is an opinion", feedback: "Both are geometric claims of shape.", isCorrect: false }
    ]
  }
];
