const grade4 = [
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
    "concept": {
      "title": "Hasty Generalization",
      "description": "Jumping to a huge conclusion based on a small amount of evidence."
    },
    "scenario": "Mike tried one piece of sushi and didn't like it. He said, 'All food from Japan is terrible!'",
    "audioText": "Mike tried one piece of sushi and didn't like it. He said, 'All food from Japan is terrible!'",
    "options": [
      {
        "text": "Hasty Generalization",
        "feedback": "Right. Judging an entire country's cuisine based on one bite is a huge logical leap.",
        "isCorrect": true
      },
      {
        "text": "Ad Hominem",
        "feedback": "He isn't attacking a person.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "Argument: 'It rained today, therefore my team will definitely win the soccer game.'",
    "audioText": "Argument: 'It rained today, therefore my team will definitely win the soccer game.'",
    "question": "What is wrong with this logic?",
    "options": [
      {
        "text": "Non Sequitur (It does not follow). Rain has no logical connection to winning a game.",
        "feedback": "Exactly. The weather doesn't score goals.",
        "isCorrect": true
      },
      {
        "text": "Rain makes the field slippery.",
        "feedback": "That's a physical fact, but doesn't guarantee a win.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of a logical argument in order.",
    "audioText": "Put the steps of a logical argument in order.",
    "parts": [
      {
        "id": "p1",
        "text": "If you eat too much candy, you will get a stomach ache."
      },
      {
        "id": "p2",
        "text": "You ate 20 pieces of candy."
      },
      {
        "id": "p3",
        "text": "Therefore, you have a stomach ache."
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
    "concept": {
      "title": "Straw Man",
      "description": "Twisting someone's argument to make it easier to attack."
    },
    "scenario": "Teacher: 'We need less talking during reading time.' Student: 'The teacher wants us to be completely silent robots forever!'",
    "audioText": "Teacher: 'We need less talking during reading time.' Student: 'The teacher wants us to be completely silent robots forever!'",
    "options": [
      {
        "text": "Straw Man Fallacy",
        "feedback": "Correct. The student exaggerated a reasonable rule into a ridiculous claim.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is that really what the teacher said?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: I never, ever watch television.\nStatement 2: My favorite thing to do on weekends is watch television.",
    "audioText": "Statement 1: I never, ever watch television. Statement 2: My favorite thing to do on weekends is watch television.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. You cannot 'never' watch it if it's your favorite weekend activity.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can 'never' co-exist with 'favorite weekend activity'?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Ad Hominem",
      "description": "Attacking the person instead of answering their argument."
    },
    "scenario": "Bob says, 'We should recycle more.' Tom replies, 'Why should we listen to you? You have an ugly haircut!'",
    "audioText": "Bob says, 'We should recycle more.' Tom replies, 'Why should we listen to you? You have an ugly haircut!'",
    "options": [
      {
        "text": "Ad Hominem",
        "feedback": "Right. Tom attacked Bob's hair instead of discussing recycling.",
        "isCorrect": true
      },
      {
        "text": "Straw Man",
        "feedback": "He didn't twist Bob's words.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A politician says, 'I ate a hamburger for lunch, so I will be the best Mayor in history!'",
    "audioText": "A politician says, 'I ate a hamburger for lunch, so I will be the best Mayor in history!'",
    "question": "What is missing here?",
    "options": [
      {
        "text": "Logical connection. Eating a burger has nothing to do with political skill.",
        "feedback": "Spot on! This is another Non Sequitur.",
        "isCorrect": true
      },
      {
        "text": "He needs a side of fries.",
        "feedback": "Fries don't help you govern a city.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct the argument.",
    "audioText": "Construct the argument.",
    "parts": [
      {
        "id": "p1",
        "text": "All birds have feathers."
      },
      {
        "id": "p2",
        "text": "A parrot is a bird."
      },
      {
        "id": "p3",
        "text": "Therefore, a parrot has feathers."
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
    "scenario": "Mom: 'You need to go to bed at 9 PM.' Son: 'You are trying to ruin my life and take away all my freedom!'",
    "audioText": "Mom: 'You need to go to bed at 9 PM.' Son: 'You are trying to ruin my life and take away all my freedom!'",
    "options": [
      {
        "text": "Emotional and twisted response",
        "feedback": "Correct. A bedtime is for your health, not to destroy your freedom.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Did he understand why he needs sleep?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: The speed limit on this road applies to absolutely everyone.\nStatement B: The speed limit does not apply to me.",
    "audioText": "Statement A: The speed limit on this road applies to absolutely everyone. Statement B: The speed limit does not apply to me.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right. If it applies to everyone, you cannot be an exception.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Are you not part of 'everyone'?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "False Dilemma",
      "description": "Pretending there are only two extreme choices when other options exist."
    },
    "scenario": "An ad says, 'Either you buy our expensive vitamins, or you will get terribly sick and feel awful!'",
    "audioText": "An ad says, 'Either you buy our expensive vitamins, or you will get terribly sick and feel awful!'",
    "options": [
      {
        "text": "False Dilemma",
        "feedback": "Correct! You can stay healthy by eating good food and exercising, not just by buying their pills.",
        "isCorrect": true
      },
      {
        "text": "Bandwagon",
        "feedback": "The ad doesn't claim everyone is doing it.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A girl says, 'I studied for five minutes, so I will definitely get 100% on the massive final exam.'",
    "audioText": "A girl says, 'I studied for five minutes, so I will definitely get 100% on the massive final exam.'",
    "question": "What is she missing?",
    "options": [
      {
        "text": "She assumes 5 minutes is enough time to learn everything.",
        "feedback": "Exactly. 5 minutes is usually not enough for a massive exam.",
        "isCorrect": true
      },
      {
        "text": "She needs to use a blue pen.",
        "feedback": "The pen color doesn't change her knowledge.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Order the chain of cause and effect.",
    "audioText": "Order the chain of cause and effect.",
    "parts": [
      {
        "id": "p1",
        "text": "You leave the freezer door open."
      },
      {
        "id": "p2",
        "text": "The warm air melts the ice cream."
      },
      {
        "id": "p3",
        "text": "The ice cream makes a huge sticky mess on the floor."
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
    "scenario": "A boy trips during a race. The winner says, 'You tripped because you are a terrible athlete!'",
    "audioText": "A boy trips during a race. The winner says, 'You tripped because you are a terrible athlete!'",
    "options": [
      {
        "text": "Unfair response",
        "feedback": "Right. Tripping is an accident, it doesn't mean someone is terrible.",
        "isCorrect": true
      },
      {
        "text": "Careful reasoning",
        "feedback": "Did the winner show good sportsmanship or logic?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: God is perfectly holy and cannot sin.\nStatement 2: God lies to people when He feels like it.",
    "audioText": "Statement 1: God is perfectly holy and cannot sin. Statement 2: God lies to people when He feels like it.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. A perfectly holy God cannot lie.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can holiness include lying?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Hasty Generalization",
      "description": "Jumping to a huge conclusion based on a small amount of evidence."
    },
    "scenario": "David tried one piece of sushi and didn't like it. He said, 'All food from Japan is terrible!'",
    "audioText": "David tried one piece of sushi and didn't like it. He said, 'All food from Japan is terrible!'",
    "options": [
      {
        "text": "Hasty Generalization",
        "feedback": "Right. Judging an entire country's cuisine based on one bite is a huge logical leap.",
        "isCorrect": true
      },
      {
        "text": "Ad Hominem",
        "feedback": "He isn't attacking a person.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "Argument: 'It rained today, therefore my team will definitely win the soccer game.'",
    "audioText": "Argument: 'It rained today, therefore my team will definitely win the soccer game.'",
    "question": "What is wrong with this logic?",
    "options": [
      {
        "text": "Non Sequitur (It does not follow). Rain has no logical connection to winning a game.",
        "feedback": "Exactly. The weather doesn't score goals.",
        "isCorrect": true
      },
      {
        "text": "Rain makes the field slippery.",
        "feedback": "That's a physical fact, but doesn't guarantee a win.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of a logical argument in order.",
    "audioText": "Put the steps of a logical argument in order.",
    "parts": [
      {
        "id": "p1",
        "text": "If you eat too much candy, you will get a stomach ache."
      },
      {
        "id": "p2",
        "text": "You ate 20 pieces of candy."
      },
      {
        "id": "p3",
        "text": "Therefore, you have a stomach ache."
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
    "concept": {
      "title": "Straw Man",
      "description": "Twisting someone's argument to make it easier to attack."
    },
    "scenario": "Teacher: 'We need less talking during reading time.' Student: 'The teacher wants us to be completely silent robots forever!'",
    "audioText": "Teacher: 'We need less talking during reading time.' Student: 'The teacher wants us to be completely silent robots forever!'",
    "options": [
      {
        "text": "Straw Man Fallacy",
        "feedback": "Correct. The student exaggerated a reasonable rule into a ridiculous claim.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is that really what the teacher said?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: I never, ever watch television.\nStatement 2: My favorite thing to do on weekends is watch television.",
    "audioText": "Statement 1: I never, ever watch television. Statement 2: My favorite thing to do on weekends is watch television.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. You cannot 'never' watch it if it's your favorite weekend activity.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can 'never' co-exist with 'favorite weekend activity'?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Ad Hominem",
      "description": "Attacking the person instead of answering their argument."
    },
    "scenario": "Sam says, 'We should recycle more.' Tom replies, 'Why should we listen to you? You have an ugly haircut!'",
    "audioText": "Sam says, 'We should recycle more.' Tom replies, 'Why should we listen to you? You have an ugly haircut!'",
    "options": [
      {
        "text": "Ad Hominem",
        "feedback": "Right. Tom attacked Bob's hair instead of discussing recycling.",
        "isCorrect": true
      },
      {
        "text": "Straw Man",
        "feedback": "He didn't twist Bob's words.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A politician says, 'I ate a hamburger for lunch, so I will be the best Mayor in history!'",
    "audioText": "A politician says, 'I ate a hamburger for lunch, so I will be the best Mayor in history!'",
    "question": "What is missing here?",
    "options": [
      {
        "text": "Logical connection. Eating a burger has nothing to do with political skill.",
        "feedback": "Spot on! This is another Non Sequitur.",
        "isCorrect": true
      },
      {
        "text": "He needs a side of fries.",
        "feedback": "Fries don't help you govern a city.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct the argument.",
    "audioText": "Construct the argument.",
    "parts": [
      {
        "id": "p1",
        "text": "All birds have feathers."
      },
      {
        "id": "p2",
        "text": "A parrot is a bird."
      },
      {
        "id": "p3",
        "text": "Therefore, a parrot has feathers."
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
    "scenario": "Mom: 'You need to go to bed at 9 PM.' Son: 'You are trying to ruin my life and take away all my freedom!'",
    "audioText": "Mom: 'You need to go to bed at 9 PM.' Son: 'You are trying to ruin my life and take away all my freedom!'",
    "options": [
      {
        "text": "Emotional and twisted response",
        "feedback": "Correct. A bedtime is for your health, not to destroy your freedom.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Did he understand why he needs sleep?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: The speed limit on this road applies to absolutely everyone.\nStatement B: The speed limit does not apply to me.",
    "audioText": "Statement A: The speed limit on this road applies to absolutely everyone. Statement B: The speed limit does not apply to me.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right. If it applies to everyone, you cannot be an exception.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Are you not part of 'everyone'?",
        "isCorrect": false
      }
    ]
  }
];

export default grade4;
