const grade12 = [
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Appeal to Emotion",
      "description": "An Appeal to Emotion tries to win an argument by making you feel sad, angry, or scared, instead of using actual facts and logic."
    },
    "scenario": "A student who failed the final exam argues: 'You have to give me an A, Mr. Smith! If I don't get an A, my parents will be so disappointed and my whole summer will be ruined!'",
    "audioText": "A student who failed the final exam argues: 'You have to give me an A, Mr. Smith! If I don't get an A, my parents will be so disappointed and my whole summer will be ruined!'",
    "options": [
      {
        "text": "Appeal to Emotion",
        "feedback": "Correct! The student relies entirely on guilt and sadness to change a factual grade, instead of showing they actually learned the material.",
        "isCorrect": true
      },
      {
        "text": "Ad Hominem",
        "feedback": "The student isn't attacking the teacher's character.",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "Why does this argument fail logically?",
      "options": [
        {
          "text": "Because a grade is based on academic performance, not emotional sympathy.",
          "isCorrect": true
        },
        {
          "text": "Because the student didn't cry hard enough.",
          "isCorrect": false
        }
      ]
    }
  },
  {
    "type": "fair-unfair",
    "concept": {
      "title": "Poisoning the Well",
      "description": "Poisoning the Well is a trick where you insult someone before they even have a chance to speak, hoping the audience won't listen to them."
    },
    "scenario": "Before the debate begins, Candidate A says: 'Now, my opponent is about to speak. But remember, he is a known liar and you can't trust a single word he says.'",
    "audioText": "Before the debate begins, Candidate A says: 'Now, my opponent is about to speak. But remember, he is a known liar and you can't trust a single word he says.'",
    "options": [
      {
        "text": "Careful debate strategy",
        "feedback": "Is it careful to dismiss an argument before hearing it?",
        "isCorrect": false
      },
      {
        "text": "Poisoning the Well (Pre-emptive Ad Hominem)",
        "feedback": "Spot on. Candidate A is trying to ruin the audience's perception before any actual arguments are made.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct the Moral Argument using Modus Tollens.",
    "audioText": "Construct the Moral Argument for God using Modus Tollens (Denying the Consequent).",
    "parts": [
      {
        "id": "p1",
        "text": "If God does not exist, objective moral values do not exist."
      },
      {
        "id": "p2",
        "text": "But objective moral values DO exist (some things are truly evil)."
      },
      {
        "id": "p3",
        "text": "Therefore, God exists."
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
    "scenario": "A person argues passionately: 'It is always wrong for anyone to ever judge someone else's choices!'",
    "audioText": "A person argues passionately: 'It is always wrong for anyone to ever judge someone else's choices!'",
    "options": [
      {
        "text": "It is a valid moral rule.",
        "feedback": "Wait. What is the speaker doing to people who judge?",
        "isCorrect": false
      },
      {
        "text": "It is a self-defeating contradiction.",
        "feedback": "Exactly. The speaker is actively judging anyone who judges. If judging is always wrong, their own statement is wrong.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "concept": {
      "title": "Argument from Silence",
      "description": "An Argument from Silence assumes that because a historical writer didn't mention an event, the event must never have happened."
    },
    "scenario": "A critic says: 'The famous Roman historian Tacitus never wrote about the earthquake in Greece, therefore the earthquake never happened.'",
    "audioText": "A critic says: 'The famous Roman historian Tacitus never wrote about the earthquake in Greece, therefore the earthquake never happened.'",
    "question": "Why is this an Argument from Silence?",
    "options": [
      {
        "text": "Just because one historian didn't write about it doesn't mean it didn't occur. He might not have cared or known.",
        "feedback": "Correct! Absence of mention is not proof of non-existence.",
        "isCorrect": true
      },
      {
        "text": "Tacitus wasn't born yet.",
        "feedback": "That's a historical fact issue, but the logical flaw is assuming silence equals proof.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Translate this Disjunctive Syllogism.",
    "audioText": "Arrange the statements to form a valid Disjunctive Syllogism (Either/Or).",
    "parts": [
      {
        "id": "p1",
        "text": "Either Jesus was a liar, a lunatic, or He was Lord."
      },
      {
        "id": "p2",
        "text": "He was clearly not a liar or a lunatic."
      },
      {
        "id": "p3",
        "text": "Therefore, He is Lord."
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
    "scenario": "Pastor: 'The Bible teaches that God is sovereign over history.' Skeptic: 'So you believe humans are just mindless robots with absolutely no free will!'",
    "audioText": "Pastor: 'The Bible teaches that God is sovereign over history.' Skeptic: 'So you believe humans are just mindless robots with absolutely no free will!'",
    "options": [
      {
        "text": "Careful theological response",
        "feedback": "Did the skeptic represent the pastor's view accurately?",
        "isCorrect": false
      },
      {
        "text": "Straw Man Fallacy",
        "feedback": "Right. The skeptic wildly exaggerated the doctrine of God's sovereignty to make it look ridiculous.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Texas Sharpshooter Fallacy",
      "description": "The Texas Sharpshooter Fallacy is when you cherry-pick a few pieces of data that support your idea, while ignoring massive amounts of data that prove you wrong."
    },
    "scenario": "A man claims his diet pill works perfectly. He points to 3 people who lost weight, but completely ignores the 97 people who got sick and gained weight.",
    "audioText": "A man claims his diet pill works perfectly. He points to 3 people who lost weight, but completely ignores the 97 people who got sick and gained weight.",
    "options": [
      {
        "text": "Texas Sharpshooter Fallacy (Cherry Picking)",
        "feedback": "Spot on! He drew a bullseye only around the hits, and ignored all the misses.",
        "isCorrect": true
      },
      {
        "text": "Appeal to Authority",
        "feedback": "He isn't citing an expert.",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "Why is cherry-picking data dangerous?",
      "options": [
        {
          "text": "Because it gives a totally false impression of reality by hiding the full truth.",
          "isCorrect": true
        },
        {
          "text": "Because 3 people is a lot of people.",
          "isCorrect": false
        }
      ]
    }
  },
  {
    "type": "contradiction-hunt",
    "scenario": "A philosopher writes a 500-page book to prove this main point: 'Everything in life is completely meaningless and communicates nothing.'",
    "audioText": "A philosopher writes a 500-page book to prove this main point: 'Everything in life is completely meaningless and communicates nothing.'",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "If everything is meaningless, what about the book he just wrote?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. If everything is meaningless, then his book is also meaningless, so why should we read it?",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "Premise 1: If an animal is a fish, it lives in the water.\nPremise 2: This animal lives in the water.\nConclusion: Therefore, this animal is a fish.",
    "audioText": "Premise 1: If an animal is a fish, it lives in the water. Premise 2: This animal lives in the water. Conclusion: Therefore, this animal is a fish.",
    "question": "This is Affirming the Consequent. What did the speaker forget?",
    "options": [
      {
        "text": "Other animals, like whales or crabs, also live in the water without being fish.",
        "feedback": "Correct! Living in water is necessary for fish, but not exclusive to them.",
        "isCorrect": true
      },
      {
        "text": "Fish sometimes jump out of the water.",
        "feedback": "That doesn't break the logical trap of the syllogism.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct a valid Modus Ponens argument about the law.",
    "audioText": "Construct a valid Modus Ponens argument about the law.",
    "parts": [
      {
        "id": "p1",
        "text": "If you drive over the speed limit, you break the law."
      },
      {
        "id": "p2",
        "text": "You drove 80mph in a 50mph zone."
      },
      {
        "id": "p3",
        "text": "Therefore, you broke the law."
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
    "concept": {
      "title": "Fallacy of Division",
      "description": "The Fallacy of Division assumes that what is true for the whole group must automatically be true for every single piece of that group."
    },
    "scenario": "A music critic writes: 'The city choir is incredibly loud and powerful. Therefore, every single singer in the choir must have a loud and powerful voice.'",
    "audioText": "A music critic writes: 'The city choir is incredibly loud and powerful. Therefore, every single singer in the choir must have a loud and powerful voice.'",
    "options": [
      {
        "text": "Fallacy of Division",
        "feedback": "Correct! The choir is loud because there are 100 people singing together, not because every individual is loud.",
        "isCorrect": true
      },
      {
        "text": "Ad Hominem",
        "feedback": "No one is being attacked.",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "Give another example of the Fallacy of Division.",
      "options": [
        {
          "text": "'This puzzle is a circle, therefore every puzzle piece is a circle.'",
          "isCorrect": true
        },
        {
          "text": "'This choir is loud, therefore they are bad singers.'",
          "isCorrect": false
        }
      ]
    }
  },
  {
    "type": "fair-unfair",
    "scenario": "A politician says: 'My opponent wants to build a new park because he secretly wants to steal the construction money for himself!'",
    "audioText": "A politician says: 'My opponent wants to build a new park because he secretly wants to steal the construction money for himself!'",
    "options": [
      {
        "text": "Careful political debate",
        "feedback": "Is it careful to assume secret criminal motives without proof?",
        "isCorrect": false
      },
      {
        "text": "Ad Hominem (Circumstantial)",
        "feedback": "Spot on. Instead of debating whether the park is a good idea, he attacks his opponent's secret motives.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "A scientist claims: 'I will only believe a statement if it can be physically proven through an experiment in a science lab.'",
    "audioText": "A scientist claims: 'I will only believe a statement if it can be physically proven through an experiment in a science lab.'",
    "options": [
      {
        "text": "It is a solid scientific rule.",
        "feedback": "Look closely at the claim itself. Can you prove that claim in a lab?",
        "isCorrect": false
      },
      {
        "text": "It is a self-defeating contradiction.",
        "feedback": "Correct! The statement 'I only believe what can be proven in a lab' cannot be proven in a lab. It is a philosophical belief.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "concept": {
      "title": "The Fine-Tuning Argument",
      "description": "The Fine-Tuning Argument points out that the universe is balanced on a razor's edge for life to exist, pointing strongly to a Creator."
    },
    "scenario": "A physicist notes that if the force of gravity was altered by a microscopic fraction, the universe would have collapsed and no life could exist.",
    "audioText": "A physicist notes that if the force of gravity was altered by a microscopic fraction, the universe would have collapsed and no life could exist.",
    "question": "According to the Fine-Tuning Argument, what does this extreme precision imply?",
    "options": [
      {
        "text": "It implies that the universe was intentionally designed by an intelligent Creator, rather than happening by blind chance.",
        "feedback": "Exactly. The odds of the universe tuning itself randomly are mathematically impossible.",
        "isCorrect": true
      },
      {
        "text": "It implies that gravity is not a real force.",
        "feedback": "Gravity is real; the argument is about WHY it is perfectly set.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Appeal to Emotion",
      "description": "Trying to win an argument by making people feel sad or scared instead of using facts."
    },
    "scenario": "You must buy this expensive dog food, or your dog will feel unloved and sad!",
    "audioText": "You must buy this expensive dog food, or your dog will feel unloved and sad!",
    "options": [
      {
        "text": "Appeal to Emotion",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Straw Man",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "missing-piece",
    "scenario": "Argument: The sky is blue, so it will rain.",
    "audioText": "Argument: The sky is blue, so it will rain.",
    "question": "What is wrong?",
    "options": [
      {
        "text": "Non Sequitur. The color of the sky doesn't mean rain is coming.",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "The sky is green.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "build-chain",
    "scenario": "Modus Tollens",
    "audioText": "Modus Tollens",
    "parts": [
      {
        "id": "p1",
        "text": "If it is raining, the grass is wet."
      },
      {
        "id": "p2",
        "text": "The grass is not wet."
      },
      {
        "id": "p3",
        "text": "Therefore, it is not raining."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "grade": 12
  },
  {
    "type": "fair-unfair",
    "scenario": "Pastor: God is loving. Skeptic: So you think God just gives everyone a hug and never judges evil?!",
    "audioText": "Pastor: God is loving. Skeptic: So you think God just gives everyone a hug and never judges evil?!",
    "options": [
      {
        "text": "Straw Man",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Careful",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: I never make any absolute claims. 2: That statement is an absolute claim.",
    "audioText": "1: I never make any absolute claims. 2: That statement is an absolute claim.",
    "options": [
      {
        "text": "Contradiction",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Both true",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Genetic Fallacy",
      "description": "Rejecting an idea because of its origin."
    },
    "scenario": "You only believe that because your parents told you!",
    "audioText": "You only believe that because your parents told you!",
    "options": [
      {
        "text": "Genetic Fallacy",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Bandwagon",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "missing-piece",
    "scenario": "I studied for 2 minutes so I will pass.",
    "audioText": "I studied for 2 minutes so I will pass.",
    "question": "What's missing?",
    "options": [
      {
        "text": "Assuming 2 minutes is enough.",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Nothing.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "build-chain",
    "scenario": "Syllogism",
    "audioText": "Syllogism",
    "parts": [
      {
        "id": "p1",
        "text": "All humans are mortal."
      },
      {
        "id": "p2",
        "text": "Socrates is human."
      },
      {
        "id": "p3",
        "text": "Socrates is mortal."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "grade": 12
  },
  {
    "type": "fair-unfair",
    "scenario": "You can't go to the party. Son: You hate me!",
    "audioText": "You can't go to the party. Son: You hate me!",
    "options": [
      {
        "text": "Unfair",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Fair",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: The room is silent. 2: The music is blaring.",
    "audioText": "1: The room is silent. 2: The music is blaring.",
    "options": [
      {
        "text": "Contradiction",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Both true",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Ad Hominem",
      "description": "Attacking the person."
    },
    "scenario": "You're wrong about math because you're ugly.",
    "audioText": "You're wrong about math because you're ugly.",
    "options": [
      {
        "text": "Ad Hominem",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Tu Quoque",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "missing-piece",
    "scenario": "I ate pizza, so it will snow.",
    "audioText": "I ate pizza, so it will snow.",
    "question": "What is wrong?",
    "options": [
      {
        "text": "Non Sequitur.",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Nothing.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "build-chain",
    "scenario": "Disjunctive",
    "audioText": "Disjunctive",
    "parts": [
      {
        "id": "p1",
        "text": "Either A or B."
      },
      {
        "id": "p2",
        "text": "Not A."
      },
      {
        "id": "p3",
        "text": "Therefore B."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "grade": 12
  },
  {
    "type": "fair-unfair",
    "scenario": "Dad: Time for chores. You: You want me to be a slave!",
    "audioText": "Dad: Time for chores. You: You want me to be a slave!",
    "options": [
      {
        "text": "Straw Man",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Fair",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: I am alone. 2: There are 10 people here.",
    "audioText": "1: I am alone. 2: There are 10 people here.",
    "options": [
      {
        "text": "Contradiction",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Both true",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Appeal to Emotion",
      "description": "Trying to win an argument by making people feel sad or scared instead of using facts."
    },
    "scenario": "You must buy this expensive dog food, or your dog will feel unloved and sad! (G12)",
    "audioText": "You must buy this expensive dog food, or your dog will feel unloved and sad!",
    "options": [
      {
        "text": "Appeal to Emotion",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Straw Man",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "missing-piece",
    "scenario": "Argument: The sky is blue, so it will rain. (G12)",
    "audioText": "Argument: The sky is blue, so it will rain.",
    "question": "What is wrong?",
    "options": [
      {
        "text": "Non Sequitur. The color of the sky doesn't mean rain is coming.",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "The sky is green.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "build-chain",
    "scenario": "Modus Tollens (G12)",
    "audioText": "Modus Tollens",
    "parts": [
      {
        "id": "p1",
        "text": "If it is raining, the grass is wet."
      },
      {
        "id": "p2",
        "text": "The grass is not wet."
      },
      {
        "id": "p3",
        "text": "Therefore, it is not raining."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "grade": 12
  },
  {
    "type": "fair-unfair",
    "scenario": "Pastor: God is loving. Skeptic: So you think God just gives everyone a hug and never judges evil?! (G12)",
    "audioText": "Pastor: God is loving. Skeptic: So you think God just gives everyone a hug and never judges evil?!",
    "options": [
      {
        "text": "Straw Man",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Careful",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: I never make any absolute claims. 2: That statement is an absolute claim. (G12)",
    "audioText": "1: I never make any absolute claims. 2: That statement is an absolute claim.",
    "options": [
      {
        "text": "Contradiction",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Both true",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Genetic Fallacy",
      "description": "Rejecting an idea because of its origin."
    },
    "scenario": "You only believe that because your parents told you! (G12)",
    "audioText": "You only believe that because your parents told you!",
    "options": [
      {
        "text": "Genetic Fallacy",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Bandwagon",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "missing-piece",
    "scenario": "I studied for 2 minutes so I will pass. (G12)",
    "audioText": "I studied for 2 minutes so I will pass.",
    "question": "What's missing?",
    "options": [
      {
        "text": "Assuming 2 minutes is enough.",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Nothing.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "build-chain",
    "scenario": "Syllogism (G12)",
    "audioText": "Syllogism",
    "parts": [
      {
        "id": "p1",
        "text": "All humans are mortal."
      },
      {
        "id": "p2",
        "text": "Socrates is human."
      },
      {
        "id": "p3",
        "text": "Socrates is mortal."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "grade": 12
  },
  {
    "type": "fair-unfair",
    "scenario": "You can't go to the party. Son: You hate me! (G12)",
    "audioText": "You can't go to the party. Son: You hate me!",
    "options": [
      {
        "text": "Unfair",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Fair",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: The room is silent. 2: The music is blaring. (G12)",
    "audioText": "1: The room is silent. 2: The music is blaring.",
    "options": [
      {
        "text": "Contradiction",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Both true",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 12
  }
];

export default grade12;
