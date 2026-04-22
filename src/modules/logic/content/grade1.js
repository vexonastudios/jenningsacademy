const grade1 = [
  {
    "type": "spot-flaw",
    "scenario": "Tommy dropped his cookie on the floor. He cries and says: 'This is the worst day in the entire history of the world!'",
    "audioText": "Tommy dropped his cookie on the floor. He cries and says: 'This is the worst day in the entire history of the world!'",
    "options": [
      {
        "text": "Good reasoning",
        "feedback": "Think carefully. Are there worse things than dropping a cookie?",
        "isCorrect": false
      },
      {
        "text": "He is using a huge exaggeration.",
        "feedback": "Spot on! Losing a cookie is sad, but it definitely isn't the worst day in world history.",
        "isCorrect": true
      }
    ],
    "explainBack": {
      "question": "Which response would be more true and wise?",
      "options": [
        {
          "text": "I am having bad luck forever.",
          "isCorrect": false
        },
        {
          "text": "I am really sad that I dropped my treat.",
          "isCorrect": true
        }
      ]
    }
  },
  {
    "type": "fair-unfair",
    "scenario": "Mom tells Jack he can only have one piece of candy before dinner. Jack says, 'You want me to starve!'",
    "audioText": "Mom tells Jack he can only have one piece of candy before dinner. Jack says, 'You want me to starve!'",
    "options": [
      {
        "text": "Careful and fair response",
        "feedback": "Jack is not choosing his words carefully.",
        "isCorrect": false
      },
      {
        "text": "Emotional and twisted response",
        "feedback": "Correct. Mom wants him to eat a healthy dinner, but Jack exaggerates her rule into something terrible.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put these events in the correct logical order.",
    "audioText": "The Bible says that we plant the seeds, but God makes them grow. Put these steps in the right order.",
    "parts": [
      {
        "id": "p2",
        "text": "God sends rain and sunshine."
      },
      {
        "id": "p1",
        "text": "The farmer plants the tiny seeds."
      },
      {
        "id": "p3",
        "text": "The tall green plants grow."
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
    "scenario": "Analyze these two statements.\nStatement 1: The toy box is completely empty.\nStatement 2: There are three red cars inside the toy box.",
    "audioText": "Analyze these two statements. Statement 1: The toy box is completely empty. Statement 2: There are three red cars inside the toy box.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "If a box is empty, can it have cars in it?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right! Empty means nothing is inside, so there cannot be cars in it.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "Sarah wants to go play outside in the heavy rain. She puts on her normal shoes and a t-shirt. She says, 'I am ready!'",
    "audioText": "Sarah wants to go play outside in the heavy rain. She puts on her normal shoes and a t-shirt. She says, 'I am ready!'",
    "question": "What is Sarah missing?",
    "options": [
      {
        "text": "She needs a raincoat and an umbrella.",
        "feedback": "Exactly! She will get soaking wet without rain gear.",
        "isCorrect": true
      },
      {
        "text": "She needs her sunglasses.",
        "feedback": "Sunglasses won't help her in the rain.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put these steps of an apology in the right order.",
    "audioText": "The Bible teaches us to confess our sins and say we are sorry. What is the right order to fix a mistake?",
    "parts": [
      {
        "id": "p3",
        "text": "Your friend forgives you and you hug."
      },
      {
        "id": "p1",
        "text": "You accidentally break your friend's toy."
      },
      {
        "id": "p2",
        "text": "You say, 'I am so sorry I broke your toy.'"
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
    "scenario": "Caleb sees a boy sitting alone at recess. Caleb thinks, 'That boy must have done something mean, and that's why no one is playing with him.'",
    "audioText": "First Samuel says that man looks on the outside, but God looks on the heart. Caleb sees a boy sitting alone at recess. Caleb thinks, 'That boy must have done something mean, and that's why no one is playing with him.'",
    "options": [
      {
        "text": "Careful reasoning",
        "feedback": "Caleb is not being careful. He doesn't know anything about the boy.",
        "isCorrect": false
      },
      {
        "text": "Jumping to a bad conclusion",
        "feedback": "Right. Caleb has no facts. The boy might just be new to the school or feeling shy.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Emily lost her pencil. She points at David and says, 'David must have stolen my pencil because he is sitting closest to me!'",
    "audioText": "The Bible warns us not to tell lies about our neighbors. Emily lost her pencil. She points at David and says, 'David must have stolen my pencil because he is sitting closest to me!'",
    "options": [
      {
        "text": "Weak reasoning",
        "feedback": "Right! Emily is guessing without any proof. A good thinker gathers facts first.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Wait, just because he is close, does that mean he is a thief?",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "What should Emily do instead?",
      "options": [
        {
          "text": "Tell the teacher David stole it.",
          "isCorrect": false
        },
        {
          "text": "Search her desk and ask David politely if he saw it.",
          "isCorrect": true
        }
      ]
    }
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Analyze these statements about Peter.\nStatement A: Peter always tells the exact truth.\nStatement B: Yesterday, Peter told a lie to his mom.",
    "audioText": "Analyze these statements about Peter. Statement A: Peter always tells the exact truth. Statement B: Yesterday, Peter told a lie to his mom.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "If Peter 'always' tells the truth, can he tell a lie?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Correct! The word 'always' makes it impossible for him to also tell a lie.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A builder wants to build a really tall house. He says, 'I have the best wood and the best hammer. My house will be the strongest!'",
    "audioText": "Jesus teaches that a wise man builds his house on the rock. A builder says: 'I have the best wood and the best hammer. My house will be the strongest!'",
    "question": "What is missing from the builder's reasoning?",
    "options": [
      {
        "text": "He needs a strong foundation, like rock.",
        "feedback": "Good! Even the best wood will fall if the house is built on sand.",
        "isCorrect": true
      },
      {
        "text": "He needs to paint it red.",
        "feedback": "Paint doesn't make a house strong.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put these morning steps in the correct logical order.",
    "audioText": "God gives us a new day to be responsible. Put these morning steps in the right order.",
    "parts": [
      {
        "id": "p1",
        "text": "You wake up and stretch."
      },
      {
        "id": "p3",
        "text": "You put on your shoes."
      },
      {
        "id": "p2",
        "text": "You put on your socks."
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
    "scenario": "Leo wore his yellow shirt, and his team won the game. Leo says, 'My yellow shirt has magic powers! If I wear it, we will always win!'",
    "audioText": "Leo wore his yellow shirt, and his team won the game. Leo says, 'My yellow shirt has magic powers! If I wear it, we will always win!'",
    "options": [
      {
        "text": "He is confusing a coincidence with a cause.",
        "feedback": "Exactly. The shirt doesn't control the game just because two things happened on the same day.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Do shirts play the game?",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "Why did the team actually win?",
      "options": [
        {
          "text": "Because the yellow shirt confused the other team.",
          "isCorrect": false
        },
        {
          "text": "Because they practiced hard and played well together.",
          "isCorrect": true
        }
      ]
    }
  },
  {
    "type": "fair-unfair",
    "scenario": "Mia says, 'I don't think we should play tag today because the grass is too muddy.' Her friend Lily says, 'Mia hates playing with us and just wants to ruin our fun!'",
    "audioText": "The Bible tells us to be fair and kind. Mia says, 'I don't think we should play tag today because the grass is too muddy.' Her friend Lily says, 'Mia hates playing with us and just wants to ruin our fun!'",
    "options": [
      {
        "text": "Careful response",
        "feedback": "Lily is jumping to a mean conclusion, instead of listening to Mia's real reason.",
        "isCorrect": false
      },
      {
        "text": "Twisted and unfair response",
        "feedback": "That's right. Mia only talked about the mud, but Lily twisted it into an insult.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: God is perfectly good and loving.\nStatement 2: God does mean things just to hurt people.",
    "audioText": "Statement 1: God is perfectly good and loving. Statement 2: God does mean things just to hurt people.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "Can someone who is perfectly good act purely out of meanness?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Correct! A perfectly good God cannot have evil, mean motives.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A little boy wants to buy a new bicycle. He says, 'I look at pictures of the bike every single day, so I will definitely get it!'",
    "audioText": "A little boy wants to buy a new bicycle. He says, 'I look at pictures of the bike every single day, so I will definitely get it!'",
    "question": "What is the boy missing in his reasoning?",
    "options": [
      {
        "text": "He needs a plan to save money, not just look at pictures.",
        "feedback": "Exactly! Looking at pictures doesn't earn money.",
        "isCorrect": true
      },
      {
        "text": "He needs a bigger picture.",
        "feedback": "A bigger picture won't pay for the bike.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Lily saw a spider in her bedroom. She ran out and said, 'There are a million giant spiders in my room!'",
    "audioText": "Lily saw a spider in her bedroom. She ran out and said, 'There are a million giant spiders in my room!'",
    "options": [
      {
        "text": "She is using a huge exaggeration.",
        "feedback": "Right! One spider is scary, but saying there are a million is a big exaggeration.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Did she actually count a million spiders?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "Tim says, 'I have a toothbrush and I have a sink. My teeth are going to be so clean!'",
    "audioText": "Tim says, 'I have a toothbrush and I have a sink. My teeth are going to be so clean!'",
    "question": "What is Tim forgetting?",
    "options": [
      {
        "text": "He needs toothpaste.",
        "feedback": "Exactly! A brush and a sink aren't enough without toothpaste.",
        "isCorrect": true
      },
      {
        "text": "He needs a towel.",
        "feedback": "A towel is nice, but toothpaste actually cleans the teeth.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put these steps of getting dressed in the right order.",
    "audioText": "Everything has a proper order. Put these steps of getting dressed in order.",
    "parts": [
      {
        "id": "p1",
        "text": "You put on your socks."
      },
      {
        "id": "p3",
        "text": "You tie your shoelaces."
      },
      {
        "id": "p2",
        "text": "You put your shoes on over your socks."
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
    "scenario": "Dad says, 'Please turn off the TV so we can eat dinner.' Mike says, 'You hate my favorite show and want me to be sad!'",
    "audioText": "Dad says, 'Please turn off the TV so we can eat dinner.' Mike says, 'You hate my favorite show and want me to be sad!'",
    "options": [
      {
        "text": "Fair response",
        "feedback": "Is Dad trying to make Mike sad, or just trying to feed him?",
        "isCorrect": false
      },
      {
        "text": "Twisted and unfair response",
        "feedback": "Correct! Dad just wants the family to eat together, but Mike twisted his motives.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: My glass of milk is completely empty.\nStatement B: I am taking a big drink of milk from my glass.",
    "audioText": "Statement A: My glass of milk is completely empty. Statement B: I am taking a big drink of milk from my glass.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "Can you drink milk from an empty glass?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right! An empty glass has no milk to drink.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Mom told Emma to clean her room. Emma picked up one sock and said, 'I'm completely done cleaning!'",
    "audioText": "Mom told Emma to clean her room. Emma picked up one sock and said, 'I'm completely done cleaning!'",
    "options": [
      {
        "text": "Good reasoning",
        "feedback": "Does picking up one sock clean a whole room?",
        "isCorrect": false
      },
      {
        "text": "She is making a false claim.",
        "feedback": "Correct. One sock does not equal a clean room.",
        "isCorrect": true
      }
    ],
    "explainBack": {
      "question": "What does a truly clean room look like?",
      "options": [
        {
          "text": "All toys and clothes are put in their proper places.",
          "isCorrect": true
        },
        {
          "text": "Only the biggest toys are put away.",
          "isCorrect": false
        }
      ]
    }
  },
  {
    "type": "build-chain",
    "scenario": "Arrange the steps of helping a friend.",
    "audioText": "Put the steps of helping a friend in the right order.",
    "parts": [
      {
        "id": "p1",
        "text": "Your friend falls down on the playground."
      },
      {
        "id": "p2",
        "text": "You run over and help them stand up."
      },
      {
        "id": "p3",
        "text": "Your friend says 'Thank you!'"
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A boy says, 'I have a piece of paper and a great idea. I'm going to draw a beautiful picture!'",
    "audioText": "A boy says, 'I have a piece of paper and a great idea. I'm going to draw a beautiful picture!'",
    "question": "What is the boy missing?",
    "options": [
      {
        "text": "He needs crayons or a pencil.",
        "feedback": "Spot on! You can't draw without something to draw with.",
        "isCorrect": true
      },
      {
        "text": "He needs a picture frame.",
        "feedback": "A frame is for later, he needs a drawing tool first.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "A friend accidentally steps on your toe. You yell, 'You did that on purpose to hurt me!'",
    "audioText": "A friend accidentally steps on your toe. You yell, 'You did that on purpose to hurt me!'",
    "options": [
      {
        "text": "Careful reasoning",
        "feedback": "Are you being careful to find out the truth?",
        "isCorrect": false
      },
      {
        "text": "Jumping to a bad conclusion",
        "feedback": "Correct. Assuming an accident was a mean attack is unfair.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: God is always awake and watching over us.\nStatement 2: God is currently taking a nap.",
    "audioText": "Statement 1: God is always awake and watching over us. Statement 2: God is currently taking a nap.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "Can someone who is always awake take a nap?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. The Bible says God never sleeps.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Sam couldn't find his favorite toy. He says, 'My brother definitely stole it!' but he hasn't checked his toy box yet.",
    "audioText": "Sam couldn't find his favorite toy. He says, 'My brother definitely stole it!' but he hasn't checked his toy box yet.",
    "options": [
      {
        "text": "Jumping to a conclusion without evidence.",
        "feedback": "Right! Sam accused his brother before even looking for his toy.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Should we accuse people without looking first?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of making a sandwich in order.",
    "audioText": "Put the steps of making a sandwich in the right order.",
    "parts": [
      {
        "id": "p1",
        "text": "Get two pieces of bread."
      },
      {
        "id": "p2",
        "text": "Put meat and cheese between the bread."
      },
      {
        "id": "p3",
        "text": "Take a big bite!"
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A girl says, 'I planted a seed in the dirt and I have a watering can. It will definitely grow!'",
    "audioText": "A girl says, 'I planted a seed in the dirt and I have a watering can. It will definitely grow!'",
    "question": "What is she forgetting?",
    "options": [
      {
        "text": "She needs to actually pour water on the seed, not just have the can.",
        "feedback": "Correct! The can alone does nothing if she doesn't use it.",
        "isCorrect": true
      },
      {
        "text": "She needs to sing to it.",
        "feedback": "Singing doesn't make seeds grow.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "Teacher: 'We will stay inside for recess because it is too cold.' Student: 'You just want to lock us in the classroom all day!'",
    "audioText": "Teacher: 'We will stay inside for recess because it is too cold.' Student: 'You just want to lock us in the classroom all day!'",
    "options": [
      {
        "text": "Careful response",
        "feedback": "Is the student listening to the teacher's reason?",
        "isCorrect": false
      },
      {
        "text": "Twisted and unfair response",
        "feedback": "Right. The teacher is keeping them warm, but the student twists it into a punishment.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: This box is filled with heavy rocks.\nStatement B: The box is lighter than a feather.",
    "audioText": "Statement A: This box is filled with heavy rocks. Statement B: The box is lighter than a feather.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "Can rocks be lighter than a feather?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Correct. Heavy rocks cannot be light as a feather.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "A boy says, 'I watched a cartoon about a flying dog, so flying dogs must be real!'",
    "audioText": "A boy says, 'I watched a cartoon about a flying dog, so flying dogs must be real!'",
    "options": [
      {
        "text": "Confusing imagination with reality.",
        "feedback": "Spot on! Just because someone drew it on TV doesn't make it real.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Are all cartoons real?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of washing your hands in order.",
    "audioText": "Put the steps of washing your hands in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Turn on the water and get your hands wet."
      },
      {
        "id": "p2",
        "text": "Scrub your hands with soap."
      },
      {
        "id": "p3",
        "text": "Rinse the soap off and dry your hands."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A dad says, 'I have the car keys and the kids are buckled in. We are ready to drive!' but the car has no engine.",
    "audioText": "A dad says, 'I have the car keys and the kids are buckled in. We are ready to drive!' but the car has no engine.",
    "question": "What is Dad missing?",
    "options": [
      {
        "text": "A car cannot move without an engine.",
        "feedback": "Correct! Keys are useless if the car is broken.",
        "isCorrect": true
      },
      {
        "text": "He needs the radio on.",
        "feedback": "The radio doesn't make the car drive.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "Your sister asks to borrow your crayon. You say no. She says, 'You never share anything with anyone, ever!'",
    "audioText": "Your sister asks to borrow your crayon. You say no. She says, 'You never share anything with anyone, ever!'",
    "options": [
      {
        "text": "Careful response",
        "feedback": "Did she accurately describe your whole life?",
        "isCorrect": false
      },
      {
        "text": "Emotional and distorted response",
        "feedback": "Exactly. She exaggerated one 'no' into a rule about your whole life.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: I have never told a single lie in my entire life.\nStatement 2: I am a human being who makes mistakes.",
    "audioText": "Statement 1: I have never told a single lie in my entire life. Statement 2: I am a human being who makes mistakes.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "If you make mistakes, have you really never told a lie?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right. The Bible says all humans have sinned, so claiming to be perfect is a lie itself.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "A boy says, 'I ate a cookie before bed, and then I had a bad dream. Cookies cause bad dreams!'",
    "audioText": "A boy says, 'I ate a cookie before bed, and then I had a bad dream. Cookies cause bad dreams!'",
    "options": [
      {
        "text": "Confusing coincidence with cause.",
        "feedback": "Correct! Just because the dream happened after the cookie doesn't mean the cookie caused it.",
        "isCorrect": true
      },
      {
        "text": "Good reasoning",
        "feedback": "Do cookies actually control dreams?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Put the steps of a bedtime routine in order.",
    "audioText": "Put the steps of a bedtime routine in order.",
    "parts": [
      {
        "id": "p1",
        "text": "Put on your pajamas."
      },
      {
        "id": "p2",
        "text": "Brush your teeth."
      },
      {
        "id": "p3",
        "text": "Get in bed and pray."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A girl says, 'I have an umbrella, so I will definitely not get wet in the pool.'",
    "audioText": "A girl says, 'I have an umbrella, so I will definitely not get wet in the pool.'",
    "question": "What logic flaw is she making?",
    "options": [
      {
        "text": "Umbrellas protect from rain above, not water you jump into.",
        "feedback": "Exactly! An umbrella won't help you if you jump in a pool.",
        "isCorrect": true
      },
      {
        "text": "She needs a bigger umbrella.",
        "feedback": "A bigger umbrella still won't help in a pool.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "fair-unfair",
    "scenario": "A boy accidentally spills his juice. His sister laughs and says, 'You did that on purpose because you're clumsy!'",
    "audioText": "A boy accidentally spills his juice. His sister laughs and says, 'You did that on purpose because you're clumsy!'",
    "options": [
      {
        "text": "Careful reasoning",
        "feedback": "Can you do something 'on purpose' if you are just 'clumsy'?",
        "isCorrect": false
      },
      {
        "text": "Unfair and contradictory response",
        "feedback": "Right. If it was on purpose, it wasn't clumsiness. She is being unfair and illogical.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: The sun is shining brightly with zero clouds in the sky.\nStatement B: It is completely dark outside.",
    "audioText": "Statement A: The sun is shining brightly with zero clouds in the sky. Statement B: It is completely dark outside.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "Can a bright sun make it dark?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. Bright sunshine and complete darkness are opposites.",
        "isCorrect": true
      }
    ]
  }
];

export default grade1;
