const grade3 = [
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
    "scenario": "A man says, 'If I eat one piece of broccoli, I will turn into a giant green monster!'",
    "audioText": "A man says, 'If I eat one piece of broccoli, I will turn into a giant green monster!'",
    "options": [
      {
        "text": "Exaggeration and false claim",
        "feedback": "Right. Broccoli is healthy, it doesn't turn you into a monster.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Does food change your DNA into a monster?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A builder says, 'I bought thousands of bricks. The building is basically finished!'",
    "audioText": "A builder says, 'I bought thousands of bricks. The building is basically finished!'",
    "question": "What is he missing?",
    "options": [
      {
        "text": "He needs mortar, plans, and hard work to actually build it.",
        "feedback": "Exactly. A pile of bricks is not a building.",
        "isCorrect": true
      },
      {
        "text": "He needs a roof.",
        "feedback": "He needs everything else first.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of an apology in order.",
    "audioText": "Put the steps of an apology in order.",
    "parts": [
      {
        "id": "p1",
        "text": "You realize you hurt your sibling's feelings."
      },
      {
        "id": "p2",
        "text": "You say, 'I am sorry I was mean.'"
      },
      {
        "id": "p3",
        "text": "Your sibling says, 'I forgive you.'"
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
    "scenario": "Dad asks for help in the garden. Daughter says, 'You just want me to get dirty and ruin my clothes!'",
    "audioText": "Dad asks for help in the garden. Daughter says, 'You just want me to get dirty and ruin my clothes!'",
    "options": [
      {
        "text": "Twisted and unfair response",
        "feedback": "Correct. Dad wants help with chores, not to ruin her clothes.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is she assuming the best of her Dad?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: The car is completely silent when it runs.\nStatement B: The car makes a loud roaring sound when it runs.",
    "audioText": "Statement A: The car is completely silent when it runs. Statement B: The car makes a loud roaring sound when it runs.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right. It cannot be totally silent and roaring loudly at the same time.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can a sound be silent?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Sarah says, 'I used a green pencil and I passed the test. Green pencils make you smart!'",
    "audioText": "Sarah says, 'I used a green pencil and I passed the test. Green pencils make you smart!'",
    "options": [
      {
        "text": "Confusing coincidence with cause.",
        "feedback": "Right. The color of the pencil didn't take the test for her.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Do pencils have brains?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A camper says, 'I brought a sleeping bag and a pillow. I am ready to sleep in the woods!'",
    "audioText": "A camper says, 'I brought a sleeping bag and a pillow. I am ready to sleep in the woods!'",
    "question": "What is he missing?",
    "options": [
      {
        "text": "He needs a tent for shelter.",
        "feedback": "Spot on! You need protection from bugs and weather.",
        "isCorrect": true
      },
      {
        "text": "He needs a flashlight.",
        "feedback": "A flashlight is nice, but shelter is more important for sleeping.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of writing a letter in order.",
    "audioText": "Put the steps of writing a letter in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Write the letter on paper."
      },
      {
        "id": "p2",
        "text": "Put the letter in an envelope and add a stamp."
      },
      {
        "id": "p3",
        "text": "Put the envelope in the mailbox."
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
    "scenario": "Mom says, 'No more cookies before dinner.' Son says, 'You never let me eat anything I like!'",
    "audioText": "Mom says, 'No more cookies before dinner.' Son says, 'You never let me eat anything I like!'",
    "options": [
      {
        "text": "Emotional and twisted response",
        "feedback": "Correct. Mom just said no cookies BEFORE dinner, she didn't ban all food forever.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Did the son listen to the boundary?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: God knows everything that has ever happened or will happen.\nStatement 2: God forgot what day it was.",
    "audioText": "Statement 1: God knows everything that has ever happened or will happen. Statement 2: God forgot what day it was.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. If God knows everything, He cannot forget anything.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can you know everything and also forget?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "A man says, 'If I jump off the roof with an umbrella, I will float down like a feather!'",
    "audioText": "A man says, 'If I jump off the roof with an umbrella, I will float down like a feather!'",
    "options": [
      {
        "text": "Ignoring the laws of physics.",
        "feedback": "Correct. An umbrella is not a parachute, gravity will pull him down fast.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Will an umbrella really hold his weight?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A girl says, 'I put on a warm coat and a scarf. I am ready to go swimming in the pool!'",
    "audioText": "A girl says, 'I put on a warm coat and a scarf. I am ready to go swimming in the pool!'",
    "question": "What is wrong with her plan?",
    "options": [
      {
        "text": "Coats and scarves are for snow, not for swimming pools.",
        "feedback": "Exactly. She is dressed for the wrong activity.",
        "isCorrect": true
      },
      {
        "text": "She forgot her sunglasses.",
        "feedback": "Sunglasses won't help her swim in a heavy winter coat.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of a thunderstorm in order.",
    "audioText": "Put the steps of a thunderstorm in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Dark clouds gather in the sky."
      },
      {
        "id": "p2",
        "text": "Lightning flashes and thunder booms."
      },
      {
        "id": "p3",
        "text": "Heavy rain pours down to the ground."
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
    "scenario": "A boy drops his ice cream. His friend says, 'You dropped that because you don't even like ice cream!'",
    "audioText": "A boy drops his ice cream. His friend says, 'You dropped that because you don't even like ice cream!'",
    "options": [
      {
        "text": "Unfair and distorted response",
        "feedback": "Right. Dropping it was an accident, not a statement of dislike.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Did the friend think logically about gravity?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: The pool is completely empty of water.\nStatement B: The pool is filled to the very top with water.",
    "audioText": "Statement A: The pool is completely empty of water. Statement B: The pool is filled to the very top with water.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. It cannot be empty and full at the exact same time.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can empty be the same as full?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "A man says, 'If I eat one piece of broccoli, I will turn into a giant green monster!'",
    "audioText": "A man says, 'If I eat one piece of broccoli, I will turn into a giant green monster!'",
    "options": [
      {
        "text": "Exaggeration and false claim",
        "feedback": "Right. Broccoli is healthy, it doesn't turn you into a monster.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Does food change your DNA into a monster?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A builder says, 'I bought thousands of bricks. The building is basically finished!'",
    "audioText": "A builder says, 'I bought thousands of bricks. The building is basically finished!'",
    "question": "What is he missing?",
    "options": [
      {
        "text": "He needs mortar, plans, and hard work to actually build it.",
        "feedback": "Exactly. A pile of bricks is not a building.",
        "isCorrect": true
      },
      {
        "text": "He needs a roof.",
        "feedback": "He needs everything else first.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of an apology in order.",
    "audioText": "Put the steps of an apology in order.",
    "parts": [
      {
        "id": "p1",
        "text": "You realize you hurt your sibling's feelings."
      },
      {
        "id": "p2",
        "text": "You say, 'I am sorry I was mean.'"
      },
      {
        "id": "p3",
        "text": "Your sibling says, 'I forgive you.'"
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
    "scenario": "Dad asks for help in the garden. Daughter says, 'You just want me to get dirty and ruin my clothes!'",
    "audioText": "Dad asks for help in the garden. Daughter says, 'You just want me to get dirty and ruin my clothes!'",
    "options": [
      {
        "text": "Twisted and unfair response",
        "feedback": "Correct. Dad wants help with chores, not to ruin her clothes.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is she assuming the best of her Dad?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: The car is completely silent when it runs.\nStatement B: The car makes a loud roaring sound when it runs.",
    "audioText": "Statement A: The car is completely silent when it runs. Statement B: The car makes a loud roaring sound when it runs.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right. It cannot be totally silent and roaring loudly at the same time.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can a sound be silent?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Jenny says, 'I used a green pencil and I passed the test. Green pencils make you smart!'",
    "audioText": "Jenny says, 'I used a green pencil and I passed the test. Green pencils make you smart!'",
    "options": [
      {
        "text": "Confusing coincidence with cause.",
        "feedback": "Right. The color of the pencil didn't take the test for her.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Do pencils have brains?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A camper says, 'I brought a sleeping bag and a pillow. I am ready to sleep in the woods!'",
    "audioText": "A camper says, 'I brought a sleeping bag and a pillow. I am ready to sleep in the woods!'",
    "question": "What is he missing?",
    "options": [
      {
        "text": "He needs a tent for shelter.",
        "feedback": "Spot on! You need protection from bugs and weather.",
        "isCorrect": true
      },
      {
        "text": "He needs a flashlight.",
        "feedback": "A flashlight is nice, but shelter is more important for sleeping.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of writing a letter in order.",
    "audioText": "Put the steps of writing a letter in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Write the letter on paper."
      },
      {
        "id": "p2",
        "text": "Put the letter in an envelope and add a stamp."
      },
      {
        "id": "p3",
        "text": "Put the envelope in the mailbox."
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
    "scenario": "Dad says, 'No more cookies before dinner.' Son says, 'You never let me eat anything I like!'",
    "audioText": "Dad says, 'No more cookies before dinner.' Son says, 'You never let me eat anything I like!'",
    "options": [
      {
        "text": "Emotional and twisted response",
        "feedback": "Correct. Mom just said no cookies BEFORE dinner, she didn't ban all food forever.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Did the son listen to the boundary?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: God knows everything that has ever happened or will happen.\nStatement 2: God forgot what day it was.",
    "audioText": "Statement 1: God knows everything that has ever happened or will happen. Statement 2: God forgot what day it was.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. If God knows everything, He cannot forget anything.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can you know everything and also forget?",
        "isCorrect": false
      }
    ]
  }
];

export default grade3;
