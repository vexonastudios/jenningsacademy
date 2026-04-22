const grade8 = [
  {
    "type": "spot-flaw",
    "scenario": "A student is caught cheating on a math test. When confronted, he says: 'But Mr. Davis, did you know the school lunches have been terrible lately? We need better pizza!'",
    "audioText": "A student is caught cheating on a math test. When confronted, he says: 'But Mr. Davis, did you know the school lunches have been terrible lately? We need better pizza!'",
    "options": [
      {
        "text": "Red Herring",
        "feedback": "Correct! The student threw out a distracting topic to sniff the teacher off the trail of the real issue.",
        "isCorrect": true
      },
      {
        "text": "Circular Reasoning",
        "feedback": "Is his conclusion just repeating his premise? No, he changed the subject entirely.",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "Why is this a Red Herring?",
      "options": [
        {
          "text": "Because it completely avoids the actual topic of the cheating.",
          "isCorrect": true
        },
        {
          "text": "Because school lunches are actually important.",
          "isCorrect": false
        }
      ]
    },
    "concept": {
      "title": "Red Herring",
      "description": "A Red Herring is when someone distracts you from the main argument by throwing in an unrelated topic."
    }
  },
  {
    "type": "fair-unfair",
    "scenario": "Teacher: 'We need to focus more on spelling this semester.' Parent: 'So you think math is completely useless and we shouldn't teach numbers at all?'",
    "audioText": "Teacher: 'We need to focus more on spelling this semester.' Parent: 'So you think math is completely useless and we shouldn't teach numbers at all?'",
    "options": [
      {
        "text": "Careful response",
        "feedback": "Did the parent listen carefully to what the teacher actually said?",
        "isCorrect": false
      },
      {
        "text": "Straw Man Fallacy",
        "feedback": "Correct! The parent twisted the teacher's desire for more spelling into a hatred for math, which the teacher never said.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct a valid categorical syllogism (Modus Ponens form).",
    "audioText": "Let's build a valid logical argument using Modus Ponens (Affirming by Affirming).",
    "parts": [
      {
        "id": "p1",
        "text": "If someone can forgive sins, they must be God."
      },
      {
        "id": "p2",
        "text": "Jesus Christ forgave sins."
      },
      {
        "id": "p3",
        "text": "Therefore, Jesus Christ is God."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "concept": {
      "title": "Modus Ponens",
      "description": "Modus Ponens is a valid argument form: If A is true, then B is true. A is true, therefore B is true."
    }
  },
  {
    "type": "contradiction-hunt",
    "scenario": "A college professor declares: 'There is absolutely no such thing as absolute truth!'",
    "audioText": "A college professor declares: 'There is absolutely no such thing as absolute truth!'",
    "options": [
      {
        "text": "It is a valid logical claim.",
        "feedback": "Wait. Does the statement itself claim to be absolutely true?",
        "isCorrect": false
      },
      {
        "text": "It is a self-defeating contradiction.",
        "feedback": "Exactly! By claiming 'there is no absolute truth,' the professor is making an absolute statement, which contradicts his own claim.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "Argument: 'That car is moving incredibly fast. Therefore, it must be breaking the speed limit.'",
    "audioText": "Argument: 'That car is moving incredibly fast. Therefore, it must be breaking the speed limit.'",
    "question": "Identify the hidden assumption (enthymeme) connecting the premise to the conclusion.",
    "options": [
      {
        "text": "Assumption: Driving 'fast' automatically means exceeding the legal limit in this zone.",
        "feedback": "Correct. The argument assumes 'fast' means 'illegal', ignoring what the actual limit is.",
        "isCorrect": true
      },
      {
        "text": "Assumption: Cars always have working speedometers.",
        "feedback": "The speedometer isn't the logical connection here.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct a Modus Tollens (Denying the Consequent) argument.",
    "audioText": "Let's construct a Modus Tollens argument. It denies the end to prove the beginning is false.",
    "parts": [
      {
        "id": "p1",
        "text": "If it is raining, the street will be wet."
      },
      {
        "id": "p2",
        "text": "The street is not wet."
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
    "concept": {
      "title": "Modus Tollens",
      "description": "Modus Tollens is a valid argument form: If A is true, then B is true. B is not true, therefore A is not true."
    }
  },
  {
    "type": "fair-unfair",
    "scenario": "Politician A says, 'We need to reduce military spending by 5% to balance the budget.' Politician B replies, 'My opponent wants to leave our country completely defenseless against our enemies!'",
    "audioText": "Politician A says, 'We need to reduce military spending by 5% to balance the budget.' Politician B replies, 'My opponent wants to leave our country completely defenseless against our enemies!'",
    "options": [
      {
        "text": "Careful and fair response",
        "feedback": "Does a 5% cut leave a country 'completely defenseless'?",
        "isCorrect": false
      },
      {
        "text": "Distorted response (Straw Man)",
        "feedback": "Exactly. Politician B wildly exaggerated a small budget cut into total destruction.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "spot-flaw",
    "scenario": "Alice: 'You really shouldn't eat so much junk food, it's bad for you.' Bob: 'Why should I listen to you? You ate three donuts yesterday!'",
    "audioText": "Alice: 'You really shouldn't eat so much junk food, it's bad for you.' Bob: 'Why should I listen to you? You ate three donuts yesterday!'",
    "options": [
      {
        "text": "Tu Quoque (You Also)",
        "feedback": "Correct! Bob attacked Alice's hypocrisy instead of dealing with her argument. Even if Alice is a hypocrite, junk food is still bad.",
        "isCorrect": true
      },
      {
        "text": "Straw Man",
        "feedback": "Did Bob twist Alice's words?",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "Why is Bob's logic flawed?",
      "options": [
        {
          "text": "Because pointing out someone else's mistake doesn't make your mistake right.",
          "isCorrect": true
        },
        {
          "text": "Because donuts are actually healthy.",
          "isCorrect": false
        }
      ]
    },
    "concept": {
      "title": "Tu Quoque",
      "description": "Tu Quoque means 'you too'. It is trying to avoid guilt by pointing out that your opponent also did something wrong."
    }
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Analyze these statements.\nStatement 1: The chef's secret recipe has never been written down or spoken out loud.\nStatement 2: I found a copy of the chef's secret recipe typed in a book.",
    "audioText": "Analyze these statements. Statement 1: The chef's secret recipe has never been written down or spoken out loud. Statement 2: I found a copy of the chef's secret recipe typed in a book.",
    "options": [
      {
        "text": "Both can be true",
        "feedback": "Can something never written down be found in a book?",
        "isCorrect": false
      },
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right. If it was *never* written down, you cannot find it typed in a book.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A historian claims, 'The great Roman Empire fell entirely because they used lead pipes for their drinking water.'",
    "audioText": "A historian claims, 'The great Roman Empire fell entirely because they used lead pipes for their drinking water.'",
    "question": "What logic principle is the historian ignoring regarding complex events?",
    "options": [
      {
        "text": "The Fallacy of the Single Cause.",
        "feedback": "You got it! The fall of a massive empire involves politics, economics, and warfare, not just one single cause like pipes.",
        "isCorrect": true
      },
      {
        "text": "The Law of Non-Contradiction.",
        "feedback": "This is not about contradictory statements.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct the Teleological Argument (Design Argument).",
    "audioText": "Construct the famous Design Argument for the existence of God.",
    "parts": [
      {
        "id": "p1",
        "text": "Every complex design with a purpose has a designer."
      },
      {
        "id": "p2",
        "text": "The universe is a highly complex design with a purpose."
      },
      {
        "id": "p3",
        "text": "Therefore, the universe has a Designer."
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
    "scenario": "Customer: 'This phone battery dies after two hours.' Salesman: 'Well, millions of people buy this phone, so it must be the best one on the market!'",
    "audioText": "Customer: 'This phone battery dies after two hours.' Salesman: 'Well, millions of people buy this phone, so it must be the best one on the market!'",
    "options": [
      {
        "text": "Bandwagon Fallacy",
        "feedback": "Correct! The salesman argues that because many people buy it, it must be good, completely ignoring the actual factual complaint.",
        "isCorrect": true
      },
      {
        "text": "Ad Hominem",
        "feedback": "The salesman doesn't attack the customer personally.",
        "isCorrect": false
      }
    ],
    "explainBack": {
      "question": "Why is the Bandwagon fallacy dangerous here?",
      "options": [
        {
          "text": "It uses popular group opinion to ignore a real factual problem.",
          "isCorrect": true
        },
        {
          "text": "It forces the customer to pay more money.",
          "isCorrect": false
        }
      ]
    },
    "concept": {
      "title": "Bandwagon Fallacy",
      "description": "The Bandwagon Fallacy claims that because something is popular or many people believe it, it must be true."
    }
  },
  {
    "type": "fair-unfair",
    "scenario": "Coach tells the team they lost because they didn't practice hard enough. A player says, 'The coach just wanted the other team to win.'",
    "audioText": "Coach tells the team they lost because they didn't practice hard enough. A player says, 'The coach just wanted the other team to win.'",
    "options": [
      {
        "text": "Careful response",
        "feedback": "The player is ignoring the truth about their lack of practice.",
        "isCorrect": false
      },
      {
        "text": "Emotional and distorted response",
        "feedback": "Correct. The coach points out a fact about practice, but the player twists it into a weird conspiracy theory.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "A famous singer declares loudly on live TV: 'I refuse to ever speak in English to anyone, anywhere!'",
    "audioText": "A famous singer declares loudly on live TV: 'I refuse to ever speak in English to anyone, anywhere!'",
    "options": [
      {
        "text": "It is a valid preference.",
        "feedback": "Look closely at the language she is using to make the claim.",
        "isCorrect": false
      },
      {
        "text": "It is a self-defeating contradiction.",
        "feedback": "Correct! The singer is speaking in English to state that they refuse to speak in English.",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A commercial shows a very sick person taking Medicine A. The next scene shows them running a marathon. The narrator says, 'Medicine A cures everything!'",
    "audioText": "A commercial shows a very sick person taking Medicine A. The next scene shows them running a marathon. The narrator says, 'Medicine A cures everything!'",
    "question": "What logic flaw is the commercial hoping you will fall for?",
    "options": [
      {
        "text": "Hasty Generalization.",
        "feedback": "Correct! You see one (possibly fake) case and are asked to assume it works perfectly for everyone, everywhere.",
        "isCorrect": true
      },
      {
        "text": "Straw Man.",
        "feedback": "The commercial is not attacking a distorted argument.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Genetic Fallacy",
      "description": "Rejecting an idea because of where it came from."
    },
    "scenario": "You say 2+2=4, but you learned that from a bad teacher, so it must be false!",
    "audioText": "You say 2 plus 2 is 4, but you learned that from a bad teacher, so it must be false!",
    "options": [
      {
        "text": "Genetic Fallacy",
        "feedback": "Right. A bad teacher can still state a true fact.",
        "isCorrect": true
      },
      {
        "text": "Bandwagon",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "missing-piece",
    "scenario": "I studied for exactly one minute, so I will get an A.",
    "audioText": "I studied for exactly one minute, so I will get an A.",
    "question": "What is missing?",
    "options": [
      {
        "text": "Assuming 1 minute is enough time.",
        "feedback": "Correct.",
        "isCorrect": true
      },
      {
        "text": "Assuming A is the highest grade.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "build-chain",
    "scenario": "Modus Ponens",
    "audioText": "Modus Ponens",
    "parts": [
      {
        "id": "p1",
        "text": "If I read, I learn."
      },
      {
        "id": "p2",
        "text": "I read."
      },
      {
        "id": "p3",
        "text": "Therefore, I learn."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "grade": 8
  },
  {
    "type": "fair-unfair",
    "scenario": "He wants to eat healthier. You say: So you want to starve to death?!",
    "audioText": "He wants to eat healthier. You say: So you want to starve to death?!",
    "options": [
      {
        "text": "Straw Man",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: I am entirely mute. 2: I am speaking out loud.",
    "audioText": "1: I am entirely mute. 2: I am speaking out loud.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Slippery Slope",
      "description": "Small step leads to huge disaster."
    },
    "scenario": "If I drop this pencil, the school will explode!",
    "audioText": "If I drop this pencil, the school will explode!",
    "options": [
      {
        "text": "Slippery Slope",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Red Herring",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "missing-piece",
    "scenario": "I have wheels, so I have a car.",
    "audioText": "I have wheels, so I have a car.",
    "question": "What's missing?",
    "options": [
      {
        "text": "A car needs an engine and body.",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Nothing.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "build-chain",
    "scenario": "Syllogism",
    "audioText": "Syllogism",
    "parts": [
      {
        "id": "p1",
        "text": "All dogs bark."
      },
      {
        "id": "p2",
        "text": "Max is a dog."
      },
      {
        "id": "p3",
        "text": "Max barks."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "grade": 8
  },
  {
    "type": "fair-unfair",
    "scenario": "You don't want to go to the movie. Friend: You hate me!",
    "audioText": "You don't want to go to the movie. Friend: You hate me!",
    "options": [
      {
        "text": "Unfair response",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Careful",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: Water is completely dry. 2: Water is wet.",
    "audioText": "1: Water is completely dry. 2: Water is wet.",
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
    "grade": 8
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Appeal to Authority",
      "description": "Trusting a fake expert."
    },
    "scenario": "My dentist says this brand of car is the fastest.",
    "audioText": "My dentist says this brand of car is the fastest.",
    "options": [
      {
        "text": "Appeal to Authority",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Tu Quoque",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "missing-piece",
    "scenario": "I ate ice cream, so it will rain.",
    "audioText": "I ate ice cream, so it will rain.",
    "question": "What is wrong?",
    "options": [
      {
        "text": "Non Sequitur. No connection.",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Nothing.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
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
    "grade": 8
  },
  {
    "type": "fair-unfair",
    "scenario": "Dad: Time for bed. You: You want me to die of boredom!",
    "audioText": "Dad: Time for bed. You: You want me to die of boredom!",
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
    "grade": 8
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: 2+2=5. 2: 2+2=4.",
    "audioText": "1: 2 plus 2 is 5. 2: 2 plus 2 is 4.",
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
    "grade": 8
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Genetic Fallacy",
      "description": "Rejecting an idea because of where it came from."
    },
    "scenario": "You say 2+2=4, but you learned that from a bad teacher, so it must be false! (G8)",
    "audioText": "You say 2 plus 2 is 4, but you learned that from a bad teacher, so it must be false!",
    "options": [
      {
        "text": "Genetic Fallacy",
        "feedback": "Right. A bad teacher can still state a true fact.",
        "isCorrect": true
      },
      {
        "text": "Bandwagon",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "missing-piece",
    "scenario": "I studied for exactly one minute, so I will get an A. (G8)",
    "audioText": "I studied for exactly one minute, so I will get an A.",
    "question": "What is missing?",
    "options": [
      {
        "text": "Assuming 1 minute is enough time.",
        "feedback": "Correct.",
        "isCorrect": true
      },
      {
        "text": "Assuming A is the highest grade.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "build-chain",
    "scenario": "Modus Ponens (G8)",
    "audioText": "Modus Ponens",
    "parts": [
      {
        "id": "p1",
        "text": "If I read, I learn."
      },
      {
        "id": "p2",
        "text": "I read."
      },
      {
        "id": "p3",
        "text": "Therefore, I learn."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "grade": 8
  },
  {
    "type": "fair-unfair",
    "scenario": "He wants to eat healthier. You say: So you want to starve to death?! (G8)",
    "audioText": "He wants to eat healthier. You say: So you want to starve to death?!",
    "options": [
      {
        "text": "Straw Man",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: I am entirely mute. 2: I am speaking out loud. (G8)",
    "audioText": "1: I am entirely mute. 2: I am speaking out loud.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Slippery Slope",
      "description": "Small step leads to huge disaster."
    },
    "scenario": "If I drop this pencil, the school will explode! (G8)",
    "audioText": "If I drop this pencil, the school will explode!",
    "options": [
      {
        "text": "Slippery Slope",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Red Herring",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "missing-piece",
    "scenario": "I have wheels, so I have a car. (G8)",
    "audioText": "I have wheels, so I have a car.",
    "question": "What's missing?",
    "options": [
      {
        "text": "A car needs an engine and body.",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Nothing.",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "build-chain",
    "scenario": "Syllogism (G8)",
    "audioText": "Syllogism",
    "parts": [
      {
        "id": "p1",
        "text": "All dogs bark."
      },
      {
        "id": "p2",
        "text": "Max is a dog."
      },
      {
        "id": "p3",
        "text": "Max barks."
      }
    ],
    "correctOrder": [
      "p1",
      "p2",
      "p3"
    ],
    "grade": 8
  },
  {
    "type": "fair-unfair",
    "scenario": "You don't want to go to the movie. Friend: You hate me! (G8)",
    "audioText": "You don't want to go to the movie. Friend: You hate me!",
    "options": [
      {
        "text": "Unfair response",
        "feedback": "Right.",
        "isCorrect": true
      },
      {
        "text": "Careful",
        "feedback": "Wrong.",
        "isCorrect": false
      }
    ],
    "grade": 8
  },
  {
    "type": "contradiction-hunt",
    "scenario": "1: Water is completely dry. 2: Water is wet. (G8)",
    "audioText": "1: Water is completely dry. 2: Water is wet.",
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
    "grade": 8
  }
];

export default grade8;
