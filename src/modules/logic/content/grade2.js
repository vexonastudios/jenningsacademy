const grade2 = [
  {
    "type": "build-chain",
    "scenario": "Put these steps for baking a cake in the correct order.",
    "audioText": "God is a God of order. When we bake a cake, we must follow the right order. Put these steps in order.",
    "parts": [
      {
        "id": "p2",
        "text": "You put the pan in the oven to bake."
      },
      {
        "id": "p1",
        "text": "You mix the flour, sugar, and eggs in a bowl."
      },
      {
        "id": "p3",
        "text": "You let the cake cool and eat a slice!"
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Sam sees a dog bark loudly at the mailman. Sam says, 'All dogs in the whole world are loud and mean!'",
    "audioText": "Sam sees a dog bark loudly at the mailman. Sam says, 'All dogs in the whole world are loud and mean!'",
    "options": [
      {
        "text": "Good reasoning",
        "feedback": "Does one loud dog mean every dog is loud?",
        "isCorrect": false
      },
      {
        "text": "He jumped to a huge conclusion.",
        "feedback": "Spot on! This is a hasty generalization. He judged all dogs based on just one dog.",
        "isCorrect": true
      }
    ],
    "explainBack": {
      "question": "What would be a more fair thing for Sam to say?",
      "options": [
        {
          "text": "That one dog is very loud.",
          "isCorrect": true
        },
        {
          "text": "No dogs ever bark.",
          "isCorrect": false
        }
      ]
    }
  },
  {
    "type": "fair-unfair",
    "scenario": "Dad says, 'We can't go to the park today because it is thundering and lightning outside.' Timmy says, 'You never let me do anything fun! You just want me to be bored!'",
    "audioText": "Proverbs reminds us that a gentle answer turns away anger. Dad says, 'We can't go to the park today because it is thundering and lightning outside.' Timmy says, 'You never let me do anything fun! You just want me to be bored!'",
    "options": [
      {
        "text": "Careful response",
        "feedback": "Timmy was not careful; he accused his Dad of bad motives.",
        "isCorrect": false
      },
      {
        "text": "Emotional and twisted response",
        "feedback": "Exactly. Dad is protecting Timmy from a storm, but Timmy twists it into a personal attack.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Analyze these statements.\nStatement 1: I never, ever eat vegetables.\nStatement 2: Yesterday, I ate a giant bowl of carrots for lunch.",
    "audioText": "Analyze these statements. Statement 1: I never, ever eat vegetables. Statement 2: Yesterday, I ate a giant bowl of carrots for lunch.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "If you 'never' eat vegetables, can you eat carrots?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right! Saying 'never' makes it impossible to eat carrots without contradicting yourself.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A baker says, 'I have a large bowl, a wooden spoon, and a hot oven. I am ready to bake a delicious chocolate cake!'",
    "audioText": "A baker says, 'I have a large bowl, a wooden spoon, and a hot oven. I am ready to bake a delicious chocolate cake!'",
    "question": "What is the baker obviously missing?",
    "options": [
      {
        "text": "He forgot the chocolate and ingredients!",
        "feedback": "Correct! A chocolate cake needs actual chocolate, not just tools.",
        "isCorrect": true
      },
      {
        "text": "He forgot a timer.",
        "feedback": "A timer is nice, but ingredients are essential.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put these events in the correct logical order.",
    "audioText": "Paul wrote that one man plants, another waters, but God gives the growth. Put these in order.",
    "parts": [
      {
        "id": "p3",
        "text": "God causes the plant to sprout."
      },
      {
        "id": "p1",
        "text": "One person plants the seed."
      },
      {
        "id": "p2",
        "text": "Another person waters the soil."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "The teacher gives the class a hard spelling test. John says, 'The teacher hates us and wants us all to fail!'",
    "audioText": "The teacher gives the class a hard spelling test. John says, 'The teacher hates us and wants us all to fail!'",
    "options": [
      {
        "text": "He is judging her heart unfairly.",
        "feedback": "Right! A hard test helps students learn. John twisted a hard task into a bad motive.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Does a hard test automatically mean the teacher hates you?",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "Which of these is a wiser way to think?",
      "options": [
        {
          "text": "The teacher gave a hard test to challenge us to grow.",
          "isCorrect": true
        },
        {
          "text": "The teacher should never give tests.",
          "isCorrect": false
        }
      ]
    }
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: God is invisible and everywhere at once (Omnipresent).\nStatement B: God is hiding inside a small wooden box in my closet.",
    "audioText": "Statement A: God is invisible and everywhere at once. Statement B: God is hiding inside a small wooden box in my closet.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "Can someone who is everywhere be locked inside a single box?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right! An omnipresent God cannot be confined to a physical box.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "A boy bumps into a girl in the hall and drops his books. The girl says, 'You did that on purpose just to annoy me!'",
    "audioText": "A boy accidentally bumps into a girl in the hall and drops his books. The girl says, 'You did that on purpose just to annoy me!'",
    "options": [
      {
        "text": "Careful response",
        "feedback": "Is it careful to assume someone dropped their books just to annoy you?",
        "isCorrect": false
      },
      {
        "text": "Unfair and distorted response",
        "feedback": "Exactly. The girl assumed the worst motive for an honest mistake.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A man wants to cross the desert. He says, 'I packed a map, my walking shoes, and a hat to block the sun. I am ready!'",
    "audioText": "A man wants to cross the desert. He says, 'I packed a map, my walking shoes, and a hat to block the sun. I am ready!'",
    "question": "What extremely important thing is the man missing in his logic?",
    "options": [
      {
        "text": "He forgot to pack any food or water.",
        "feedback": "You found the missing piece! A map won't help if you don't have water in the desert.",
        "isCorrect": true
      },
      {
        "text": "He forgot his sunglasses.",
        "feedback": "Sunglasses are nice, but not as critical as life-saving water.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Grace wants a new toy. She prays for it. The next day, she doesn't get the toy. She says, 'God didn't answer my prayer.'",
    "audioText": "Grace wants a new toy. She prays and asks God for it. The next day, she doesn't get the toy. She says, 'God didn't answer my prayer.'",
    "options": [
      {
        "text": "Good reasoning",
        "feedback": "Does God always answer 'yes' to everything we want?",
        "isCorrect": false
      },
      {
        "text": "Weak reasoning",
        "feedback": "Correct. God always hears prayers, but sometimes His answer is 'no' or 'wait', because He knows what is best.",
        "isCorrect": true
      }
    ],
    "explainBack": {
      "question": "Which of these is a wiser way to view prayer?",
      "options": [
        {
          "text": "Prayer is talking to a wise Father who gives us what we need, not always what we want.",
          "isCorrect": true
        },
        {
          "text": "Prayer is like a vending machine; you put a prayer in, you get a toy out.",
          "isCorrect": false
        }
      ]
    }
  },
  {
    "type": "build-chain",
    "scenario": "Put these parts of an argument in the right order.",
    "audioText": "A good argument has an order. Put these in order: the evidence, the claim, and the conclusion.",
    "parts": [
      {
        "id": "p1",
        "text": "Whenever it rains, the grass gets wet."
      },
      {
        "id": "p2",
        "text": "It is raining right now."
      },
      {
        "id": "p3",
        "text": "Therefore, the grass will be wet."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: The water pitcher is completely full to the top.\nStatement 2: The water pitcher is half empty.",
    "audioText": "Statement 1: The water pitcher is completely full to the top. Statement 2: The water pitcher is half empty.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "Can it be totally full and also half empty?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. It cannot be 100% full and 50% full at the same time.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A girl says, 'I bought the fastest running shoes in the store, so I am definitely going to win the gold medal in the race.'",
    "audioText": "A girl says, 'I bought the fastest running shoes in the store, so I am definitely going to win the gold medal in the race.'",
    "question": "What is she forgetting?",
    "options": [
      {
        "text": "She forgets that winning requires hard work and practice, not just new shoes.",
        "feedback": "You found it! Shoes don't run the race, the runner does.",
        "isCorrect": true
      },
      {
        "text": "She assumes she bought the right color of shoes.",
        "feedback": "The color doesn't change how fast the shoes can go.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "A sign says 'Do not walk on the grass'. Noah walks on the grass and tells the guard: 'I didn't break the rule because I hopped on one foot!'",
    "audioText": "God loves honesty and a sincere heart. A sign says 'Do not walk on the grass'. Noah walks on the grass and tells the guard: 'I didn't break the rule because I hopped on one foot!'",
    "options": [
      {
        "text": "Weak reasoning",
        "feedback": "Correct. Noah is playing word games. The clear purpose of the sign is to keep people off the grass.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Is Noah keeping the spirit of the rule, or trying to trick it?",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "Why does Noah's logic fail?",
      "options": [
        {
          "text": "Because hopping on one foot is still putting weight on the grass.",
          "isCorrect": true
        },
        {
          "text": "Because he didn't hop fast enough.",
          "isCorrect": false
        }
      ]
    }
  },
  {
    "type": "spot-flaw",
    "scenario": "John saw one bird flying south. He said, 'Every single bird in the world is flying south today!'",
    "audioText": "John saw one bird flying south. He said, 'Every single bird in the world is flying south today!'",
    "options": [
      {
        "text": "He jumped to a huge conclusion.",
        "feedback": "Right! One bird doesn't speak for all birds.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Did he see all the birds?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "Dad says, 'I have a hammer and nails, I am ready to build a birdhouse!'",
    "audioText": "Dad says, 'I have a hammer and nails, I am ready to build a birdhouse!'",
    "question": "What is Dad missing?",
    "options": [
      {
        "text": "He needs wood.",
        "feedback": "Exactly! You can't build a house out of just nails.",
        "isCorrect": true
      },
      {
        "text": "He needs a ladder.",
        "feedback": "A ladder isn't required for a small birdhouse.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of making lemonade in order.",
    "audioText": "Put the steps of making lemonade in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Squeeze the lemons into a pitcher."
      },
      {
        "id": "p2",
        "text": "Add water and sugar and stir."
      },
      {
        "id": "p3",
        "text": "Pour into a glass with ice."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "Teacher says, 'Please do not throw sand on the playground.' Student says, 'The teacher never wants us to play!'",
    "audioText": "Teacher says, 'Please do not throw sand on the playground.' Student says, 'The teacher never wants us to play!'",
    "options": [
      {
        "text": "Twisted and unfair response",
        "feedback": "Right. Keeping kids safe from sand in their eyes doesn't mean she hates play.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is that a fair way to treat the teacher's rule?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: My backpack is completely empty.\nStatement 2: I have three heavy books inside my backpack.",
    "audioText": "Statement 1: My backpack is completely empty. Statement 2: I have three heavy books inside my backpack.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. It can't be empty and have books inside.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can it be empty and full at the same time?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Mia wore her red shoes and found a dollar. She says, 'My red shoes create money!'",
    "audioText": "Mia wore her red shoes and found a dollar. She says, 'My red shoes create money!'",
    "options": [
      {
        "text": "Confusing coincidence with cause.",
        "feedback": "Right. The shoes didn't make the money appear.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Do shoes actually print money?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A boy says, 'I have flour, sugar, and milk. I am ready to bake cookies!'",
    "audioText": "A boy says, 'I have flour, sugar, and milk. I am ready to bake cookies!'",
    "question": "What is he missing?",
    "options": [
      {
        "text": "He needs an oven to actually bake them.",
        "feedback": "Spot on! Ingredients don't bake themselves.",
        "isCorrect": true
      },
      {
        "text": "He needs sprinkles.",
        "feedback": "Sprinkles are nice, but the oven is required to bake.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of growing a plant in order.",
    "audioText": "Put the steps of growing a plant in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Plant a seed in the soil."
      },
      {
        "id": "p2",
        "text": "Water the seed every day."
      },
      {
        "id": "p3",
        "text": "A tiny green sprout pops up."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "Mom tells Jack to eat his carrots. Jack says, 'You are trying to poison me with vegetables!'",
    "audioText": "Mom tells Jack to eat his carrots. Jack says, 'You are trying to poison me with vegetables!'",
    "options": [
      {
        "text": "Emotional and twisted response",
        "feedback": "Correct. Mom wants him to be healthy, not poisoned.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is Mom really trying to poison him?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: The dog always sleeps in the kitchen.\nStatement B: The dog never sleeps in the kitchen.",
    "audioText": "Statement A: The dog always sleeps in the kitchen. Statement B: The dog never sleeps in the kitchen.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right. 'Always' and 'never' are complete opposites.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can he always do it and never do it?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Leo saw a dark cloud and said, 'It is going to rain for the rest of the year!'",
    "audioText": "Leo saw a dark cloud and said, 'It is going to rain for the rest of the year!'",
    "options": [
      {
        "text": "Huge exaggeration",
        "feedback": "Correct. One dark cloud doesn't mean it will rain for a whole year.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Can one cloud last a whole year?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A girl says, 'I have a fishing pole and a hook. I am going to catch a huge fish!'",
    "audioText": "A girl says, 'I have a fishing pole and a hook. I am going to catch a huge fish!'",
    "question": "What is she missing?",
    "options": [
      {
        "text": "She needs bait for the hook and a lake.",
        "feedback": "Exactly. Fish don't just jump onto an empty hook in the air.",
        "isCorrect": true
      },
      {
        "text": "She needs a boat.",
        "feedback": "You can fish from the shore, but you definitely need water and bait.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of drawing a picture in order.",
    "audioText": "Put the steps of drawing a picture in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Get a piece of paper and crayons."
      },
      {
        "id": "p2",
        "text": "Draw a house and a tree."
      },
      {
        "id": "p3",
        "text": "Hang the picture on the fridge."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "A boy accidentally drops his pencil. His friend says, 'You threw that on the ground because you hate pencils!'",
    "audioText": "A boy accidentally drops his pencil. His friend says, 'You threw that on the ground because you hate pencils!'",
    "options": [
      {
        "text": "Unfair and distorted response",
        "feedback": "Right. It was an accident, not a hateful throw.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Did the friend find out the truth first?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: God loves everyone unconditionally.\nStatement 2: God only loves people who have blonde hair.",
    "audioText": "Statement 1: God loves everyone unconditionally. Statement 2: God only loves people who have blonde hair.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. Loving 'everyone' contradicts loving 'only' a specific group.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can He love everyone but also only love some?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Peter saw one bird flying south. He said, 'Every single bird in the world is flying south today!'",
    "audioText": "Peter saw one bird flying south. He said, 'Every single bird in the world is flying south today!'",
    "options": [
      {
        "text": "He jumped to a huge conclusion.",
        "feedback": "Right! One bird doesn't speak for all birds.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Did he see all the birds?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "Dad says, 'I have a hammer and nails, I am ready to build a birdhouse!'",
    "audioText": "Dad says, 'I have a hammer and nails, I am ready to build a birdhouse!'",
    "question": "What is Dad missing?",
    "options": [
      {
        "text": "He needs wood.",
        "feedback": "Exactly! You can't build a house out of just nails.",
        "isCorrect": true
      },
      {
        "text": "He needs a ladder.",
        "feedback": "A ladder isn't required for a small birdhouse.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of making lemonade in order.",
    "audioText": "Put the steps of making lemonade in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Squeeze the lemons into a pitcher."
      },
      {
        "id": "p2",
        "text": "Add water and sugar and stir."
      },
      {
        "id": "p3",
        "text": "Pour into a glass with ice."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "Teacher says, 'Please do not throw sand on the playground.' Student says, 'The teacher never wants us to play!'",
    "audioText": "Teacher says, 'Please do not throw sand on the playground.' Student says, 'The teacher never wants us to play!'",
    "options": [
      {
        "text": "Twisted and unfair response",
        "feedback": "Right. Keeping kids safe from sand in their eyes doesn't mean she hates play.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is that a fair way to treat the teacher's rule?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: My backpack is completely empty.\nStatement 2: I have three heavy books inside my backpack.",
    "audioText": "Statement 1: My backpack is completely empty. Statement 2: I have three heavy books inside my backpack.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. It can't be empty and have books inside.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can it be empty and full at the same time?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Mia wore her red shoes and found a dollar. She says, 'My red shoes create money!'",
    "audioText": "Mia wore her red shoes and found a dollar. She says, 'My red shoes create money!'",
    "options": [
      {
        "text": "Confusing coincidence with cause.",
        "feedback": "Right. The shoes didn't make the money appear.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Do shoes actually print money?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A boy says, 'I have flour, sugar, and milk. I am ready to bake cookies!'",
    "audioText": "A boy says, 'I have flour, sugar, and milk. I am ready to bake cookies!'",
    "question": "What is he missing?",
    "options": [
      {
        "text": "He needs an oven to actually bake them.",
        "feedback": "Spot on! Ingredients don't bake themselves.",
        "isCorrect": true
      },
      {
        "text": "He needs sprinkles.",
        "feedback": "Sprinkles are nice, but the oven is required to bake.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of growing a plant in order.",
    "audioText": "Put the steps of growing a plant in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Plant a seed in the soil."
      },
      {
        "id": "p2",
        "text": "Water the seed every day."
      },
      {
        "id": "p3",
        "text": "A tiny green sprout pops up."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "Mom tells Jack to eat his carrots. Jack says, 'You are trying to poison me with vegetables!'",
    "audioText": "Mom tells Jack to eat his carrots. Jack says, 'You are trying to poison me with vegetables!'",
    "options": [
      {
        "text": "Emotional and twisted response",
        "feedback": "Correct. Mom wants him to be healthy, not poisoned.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is Mom really trying to poison him?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: The dog always sleeps in the kitchen.\nStatement B: The dog never sleeps in the kitchen.",
    "audioText": "Statement A: The dog always sleeps in the kitchen. Statement B: The dog never sleeps in the kitchen.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right. 'Always' and 'never' are complete opposites.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can he always do it and never do it?",
        "isCorrect": false
      }
    ]
  }
];

export default grade2;
