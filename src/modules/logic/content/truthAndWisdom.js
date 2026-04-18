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
      { text: "He jumped to a conclusion without gathering facts.", feedback: "Exactly. The brother might have tripped, or the toy might have already been broken.", isCorrect: true },
      { text: "He used circular reasoning.", feedback: "Circular reasoning is repeating the same point. Sam is making a rash judgment.", isCorrect: false },
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
      { text: "Both can be true", feedback: "If God never leaves us, can He also abandon us?", is   isCorrect: false },
      { text: "They conflict (Contradiction)", feedback: "Correct! If God promised to never leave us, then Statement 2 cannot possibly be true.", isCorrect: true },
      { text: "One is too vague", feedback: "They are actually very specific statements.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Emily lost her pencil. She looks at David and says, 'David must have taken my pencil because he is sitting closest to me!'",
    audioText: "The Bible warns against bearing false witness. Emily lost her pencil. She looks at David and says, 'David must have taken my pencil because he is sitting closest to me!'",
    options: [
      { text: "Good reasoning", feedback: "Wait, just because he is close, does that mean he is a thief?", isCorrect: false },
      { text: "Weak reasoning", feedback: "Right! Emily is guessing without any proof. A good thinker gathers evidence first.", isCorrect: true },
      { text: "Not enough information", feedback: "We know her reason: he was sitting close. We are judging if that is a strong reason.", isCorrect: false }
    ],
    explainBack: {
      question: "How could Emily fix her weak reasoning?",
      options: [
        { text: "Tell the teacher David stole it.", isCorrect: false },
        { text: "Search her desk thoroughly and ask David politely if he saw it.", isCorrect: true }
      ]
    }
  },
  {
    type: "fair-unfair",
    scenario: "Dad says: 'We can't go to the park today because it is thundering and lightning outside.' Timmy says: 'You never let me do anything fun! You just want me to be bored!'",
    audioText: "Proverbs reminds us that a soft answer turns away anger. Dad says: 'We can't go to the park today because it is thundering and lightning outside.' Timmy says: 'You never let me do anything fun! You just want me to be bored!'",
    options: [
      { text: "Careful response", feedback: "Timmy was not careful; he accused his Dad of bad motives.", isCorrect: false },
      { text: "Emotional and distorted response", feedback: "Exactly. Dad is protecting Timmy from a storm, but Timmy twists it into a personal attack.", isCorrect: true }
    ]
  },
  {
    type: "missing-piece",
    scenario: "A king says: 'My army has the most soldiers, so we will definitely win the battle.'",
    audioText: "Psalm 20 says, 'Some trust in chariots and some in horses, but we trust in the name of the Lord our God.' A king says: 'My army has the most soldiers, so we will definitely win the battle.'",
    question: "What is the king missing in his reasoning?",
    options: [
      { text: "He forgets that victory comes from the Lord, not just large numbers.", feedback: "Excellent. The Bible shows many times that God can win battles with very few people.", isCorrect: true },
      { text: "He assumes his soldiers have the sharpest swords.", feedback: "Even with sharp swords, the core issue is his pride and reliance on numbers.", isCorrect: false }
    ]
  },
  {
    type: "contradiction-hunt",
    scenario: "Analyze these statements.\nStatement A: A good tree cannot bear bad fruit.\nStatement B: That tree is a good tree, but it is covered in rotten, poisonous fruit.",
    audioText: "Jesus said that you will know them by their fruits. Analyze these statements. Statement A: A good tree cannot bear bad fruit. Statement B: That tree is a good tree, but it is covered in rotten, poisonous fruit.",
    options: [
      { text: "Both can be true", feedback: "Look closely. Can a good tree bear bad fruit?", isCorrect: false },
      { text: "They conflict (Contradiction)", feedback: "That's right. If statement A is a rule, then Statement B cannot happen.", isCorrect: true },
      { text: "One is too vague", feedback: "The statements are very clear.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Jake ate green beans on Monday and felt sick. He ate green beans on Tuesday and felt sick. Jake says: 'All green vegetables in the whole world will make me sick.'",
    audioText: "Jake ate green beans on Monday and felt sick. He ate green beans on Tuesday and felt sick. Jake says: 'All green vegetables in the whole world will make me sick.'",
    options: [
      { text: "He made a huge jump from one vegetable to everything green.", feedback: "Spot on! This is called a 'hasty generalization'. Green beans might bother him, but what about broccoli or spinach?", isCorrect: true },
      { text: "Good reasoning", feedback: "Does feeling sick from one thing mean everything in that category is bad?", isCorrect: false },
      { text: "Not enough information", feedback: "Jake stated his conclusion loudly. We can judge his jump in logic.", isCorrect: false }
    ],
    explainBack: {
      question: "What would be a more logical conclusion for Jake?",
      options: [
        { text: "Green beans seem to upset my stomach.", isCorrect: true },
        { text: "I should only eat red candy from now on.", isCorrect: false }
      ]
    }
  },
  {
    type: "fair-unfair",
    scenario: "Mom asks Chloe to clean her room, but Chloe says: 'I'll clean it later, I'm drawing a picture.' Later, Mom tells Chloe she can't watch a movie because her room is still messy. Chloe cries: 'It's not fair! You didn't remind me!'",
    audioText: "We are called to take responsibility for our actions. Mom asks Chloe to clean her room, but Chloe says she will do it later. Later, Mom says Chloe can't watch a movie because the room is still messy. Chloe cries: 'It's not fair! You didn't remind me!'",
    options: [
      { text: "Careful response", feedback: "Chloe isn't being careful; she is blaming her Mom for her own choice to delay.", isCorrect: false },
      { text: "Emotional and distorted response", feedback: "Correct! Chloe made a choice to draw instead of clean, and now she is unfairly blaming Mom for the consequence.", isCorrect: true }
    ]
  },
  {
    type: "missing-piece",
    scenario: "A man wants to cross the desert. He says, 'I packed a map, my walking shoes, and a hat to block the sun. I am perfectly ready!'",
    audioText: "A man wants to cross the desert. He says, 'I packed a map, my walking shoes, and a hat to block the sun. I am perfectly ready!'",
    question: "What extremely important thing is the man missing in his logic?",
    options: [
      { text: "He forgot to pack any food or water.", feedback: "You found the missing piece! A map won't help if you don't have water in the desert.", isCorrect: true },
      { text: "He forgot his sunglasses.", feedback: "Sunglasses are nice, but not as critical as life-saving supplies.", isCorrect: false }
    ]
  },
  {
    type: "contradiction-hunt",
    scenario: "Analyze these statements about a man named Peter.\nStatement 1: Peter always tells the exact truth.\nStatement 2: Yesterday, Peter told a lie to his boss.",
    audioText: "Analyze these statements about a man named Peter. Statement 1: Peter always tells the exact truth. Statement 2: Yesterday, Peter told a lie to his boss.",
    options: [
      { text: "Both can be true", feedback: "If Statement 1 says 'always', can Statement 2 happen?", isCorrect: false },
      { text: "They conflict (Contradiction)", feedback: "Right! The word 'always' in Statement 1 makes it impossible for Statement 2 to be true at the same time.", isCorrect: true },
      { text: "One is too vague", feedback: "They are very direct statements.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "A sign says 'Do not walk on the grass'. Noah walks on the grass and tells the guard: 'I didn't break the rule because I hopped on one foot!'",
    audioText: "God loves honesty and a sincere heart. A sign says 'Do not walk on the grass'. Noah walks on the grass and tells the guard: 'I didn't break the rule because I hopped on one foot!'",
    options: [
      { text: "Good reasoning", feedback: "Is Noah keeping the spirit of the rule, or trying to trick it?", isCorrect: false },
      { text: "Weak reasoning", feedback: "Correct. Noah is playing word games. The clear purpose of the sign is to keep people off the grass.", isCorrect: true },
      { text: "Not enough information", feedback: "We have Noah's full excuse right here.", isCorrect: false }
    ],
    explainBack: {
      question: "Why does Noah's logic fail?",
      options: [
        { text: "Because hopping on one foot is still putting weight on the grass.", isCorrect: true },
        { text: "Because he didn't hop fast enough.", isCorrect: false }
      ]
    }
  },
  {
    type: "fair-unfair",
    scenario: "Caleb sees a boy sitting alone at lunch. Caleb thinks, 'That boy must have done something mean, and that's why no one is sitting with him.'",
    audioText: "First Samuel says that man looks on the outward appearance, but the Lord looks on the heart. Caleb sees a boy sitting alone at lunch. Caleb thinks, 'That boy must have done something mean, and that's why no one is sitting with him.'",
    options: [
      { text: "Careful response", feedback: "Caleb is not being careful. He doesn't know anything about the boy.", isCorrect: false },
      { text: "Emotional and distorted response", feedback: "Right. Caleb has no facts. The boy might just be new to the school, or feeling shy.", isCorrect: true }
    ]
  },
  {
    type: "missing-piece",
    scenario: "A farmer looks at his dry, dusty field. He says, 'I planted the seeds, so the crops will definitely grow tall.'",
    audioText: "Paul wrote that one man plants, another waters, but God gives the growth. A farmer looks at his dry, dusty field. He says, 'I planted the seeds, so the crops will definitely grow tall.'",
    question: "What is the farmer forgetting?",
    options: [
      { text: "Seeds need rain and water, and God to make them grow.", feedback: "Exactly. Just planting the seeds is not the whole story.", isCorrect: true },
      { text: "He needs a bigger tractor.", feedback: "A tractor won't make a dry seed grow.", isCorrect: false }
    ]
  },
  {
    type: "contradiction-hunt",
    scenario: "Analyze these two ideas.\nIdea 1: The Bible says God is completely good and perfectly loving.\nIdea 2: God creates evil things just to be mean.",
    audioText: "Analyze these two ideas. Idea 1: The Bible says God is completely good and perfectly loving. Idea 2: God creates evil things just to be mean.",
    options: [
      { text: "Both can be true", feedback: "Can a perfectly good being act purely out of meanness?", isCorrect: false },
      { text: "They conflict (Contradiction)", feedback: "Correct! A perfectly good God cannot have evil, mean motives.", isCorrect: true },
      { text: "One is too vague", feedback: "These statements are clear opposites.", isCorrect: false }
    ]
  },
  {
    type: "spot-flaw",
    scenario: "Grace wants a new toy. She prays and asks God for it. The next day, she doesn't get the toy. She says, 'God didn't answer my prayer.'",
    audioText: "Grace wants a new toy. She prays and asks God for it. The next day, she doesn't get the toy. She says, 'God didn't answer my prayer.'",
    options: [
      { text: "Good reasoning", feedback: "Does God always answer 'yes' to everything we want?”,", isCorrect: false },
      { text: "Weak reasoning", feedback: "Correct. God always hears prayers, but sometimes His answer is 'no' or 'wait', because He knows what is best.", isCorrect: true },
      { text: "Not enough information", feedback: "We know her conclusion, and it is based on a misunderstanding of prayer.", isCorrect: false }
    ],
    explainBack: {
      question: "Which of these is a wiser way to view prayer?",
      options: [
        { text: "Prayer is like a vending machine; you put a prayer in, you get a toy out.", isCorrect: false },
        { text: "Prayer is talking to a wise Father who gives us what we need, not always what we want.", isCorrect: true }
      ]
    }
  },
  {
    type: "fair-unfair",
    scenario: "The teacher gives the class a hard math test. Lily says, 'This is a hard test.' John says, 'The teacher hates us and wants us to fail!'",
    audioText: "The teacher gives the class a hard math test. Lily says, 'This is a hard test.' John says, 'The teacher hates us and wants us to fail!'",
    options: [
      { text: "Lily gave a careful response; John gave an emotional response", feedback: "Right! Lily stated a fact. John twisted the fact into a bad motive.", isCorrect: true },
      { text: "John gave a careful response; Lily gave an emotional response", feedback: "Look again. Which one is judging the teacher's heart unfairly?", isCorrect: false }
    ]
  }
];
