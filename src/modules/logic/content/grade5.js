const grade5 = [
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
      "title": "Tu Quoque",
      "description": "Trying to avoid guilt by pointing out your opponent also did something wrong."
    },
    "scenario": "Mom: 'Don't leave your bike in the driveway.' Son: 'Why? You left your car in the driveway yesterday!'",
    "audioText": "Mom: 'Don't leave your bike in the driveway.' Son: 'Why? You left your car in the driveway yesterday!'",
    "options": [
      {
        "text": "Tu Quoque",
        "feedback": "Right! Pointing out Mom's action doesn't change the rule for the bike.",
        "isCorrect": true
      },
      {
        "text": "Circular Reasoning",
        "feedback": "He isn't repeating himself.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A scientist says, 'I found water on this planet, so it definitely has alien cities on it!'",
    "audioText": "A scientist says, 'I found water on this planet, so it definitely has alien cities on it!'",
    "question": "What is the massive leap in logic?",
    "options": [
      {
        "text": "Water is necessary for life, but water does not automatically create cities.",
        "feedback": "Exactly. It's a huge non sequitur leap.",
        "isCorrect": true
      },
      {
        "text": "Water is dangerous.",
        "feedback": "Not the logic flaw.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct Modus Tollens.",
    "audioText": "Construct Modus Tollens.",
    "parts": [
      {
        "id": "p1",
        "text": "If it is snowing, it must be winter."
      },
      {
        "id": "p2",
        "text": "It is not winter."
      },
      {
        "id": "p3",
        "text": "Therefore, it is not snowing."
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
      "description": "Twisting an argument to easily attack it."
    },
    "scenario": "Student: 'I prefer playing piano over violin.' Friend: 'So you think violins are horrible garbage instruments?!'",
    "audioText": "Student: 'I prefer playing piano over violin.' Friend: 'So you think violins are horrible garbage instruments?!'",
    "options": [
      {
        "text": "Straw Man Fallacy",
        "feedback": "Correct. A preference for piano is not a hatred for violin.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is that what the student said?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: My little brother is entirely invisible to everyone.\nStatement 2: I saw my little brother hiding under the table.",
    "audioText": "Statement 1: My little brother is entirely invisible to everyone. Statement 2: I saw my little brother hiding under the table.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. If he is invisible, you cannot see him.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can you see the invisible?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Bandwagon Fallacy",
      "description": "Saying something is right because it is popular."
    },
    "scenario": "A boy says, 'We should all wear our shirts backward because all the cool kids in 6th grade are doing it!'",
    "audioText": "A boy says, 'We should all wear our shirts backward because all the cool kids in 6th grade are doing it!'",
    "options": [
      {
        "text": "Bandwagon Fallacy",
        "feedback": "Right. Popularity doesn't mean something is a smart idea.",
        "isCorrect": true
      },
      {
        "text": "Tu Quoque",
        "feedback": "He isn't calling anyone a hypocrite.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A baker says, 'I put my dough in a perfectly hot oven. In an hour, I will definitely have a delicious chocolate cake!'",
    "audioText": "A baker says, 'I put my dough in a perfectly hot oven. In an hour, I will definitely have a delicious chocolate cake!'",
    "question": "What assumption is the baker making?",
    "options": [
      {
        "text": "Assuming the dough actually has chocolate in it.",
        "feedback": "Spot on! An oven can't bake chocolate cake out of plain dough.",
        "isCorrect": true
      },
      {
        "text": "Assuming the oven is hot.",
        "feedback": "He already stated it was hot.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Order the argument.",
    "audioText": "Order the argument.",
    "parts": [
      {
        "id": "p1",
        "text": "All fish can swim."
      },
      {
        "id": "p2",
        "text": "A shark is a fish."
      },
      {
        "id": "p3",
        "text": "Therefore, a shark can swim."
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
    "scenario": "Dad: 'We need to save money this month.' Teen: 'You just want to lock me in the house so I can never see my friends again!'",
    "audioText": "Dad: 'We need to save money this month.' Teen: 'You just want to lock me in the house so I can never see my friends again!'",
    "options": [
      {
        "text": "Emotional and distorted response",
        "feedback": "Correct. Saving money doesn't mean locking someone in.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Did the teen accurately summarize saving money?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: God's power is absolutely limitless.\nStatement B: God cannot create a rock so heavy He cannot lift it.",
    "audioText": "Statement A: God's power is absolutely limitless. Statement B: God cannot create a rock so heavy He cannot lift it.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Actually, this is a classic paradox. God's omnipotence doesn't mean He can do logically contradictory things.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "This is a trick question. Limitless power doesn't mean doing the logically impossible.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Red Herring",
      "description": "Distracting from the main point."
    },
    "scenario": "Teacher: 'Why didn't you do your homework?' Student: 'Did you know the cafeteria ran out of milk today? It was a disaster!'",
    "audioText": "Teacher: 'Why didn't you do your homework?' Student: 'Did you know the cafeteria ran out of milk today? It was a disaster!'",
    "options": [
      {
        "text": "Red Herring",
        "feedback": "Correct! The student completely changed the subject to avoid the homework question.",
        "isCorrect": true
      },
      {
        "text": "Bandwagon",
        "feedback": "He isn't appealing to a crowd.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "Argument: 'The sun rises every time the rooster crows. The rooster causes the sun to rise!'",
    "audioText": "Argument: 'The sun rises every time the rooster crows. The rooster causes the sun to rise!'",
    "question": "What is wrong with this?",
    "options": [
      {
        "text": "Correlation vs Causation. They happen together, but one doesn't cause the other.",
        "feedback": "Exactly. The rooster doesn't control the sun.",
        "isCorrect": true
      },
      {
        "text": "Roosters sleep late.",
        "feedback": "Not a logical answer.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct the design argument.",
    "audioText": "Construct the design argument.",
    "parts": [
      {
        "id": "p1",
        "text": "A painting requires a painter."
      },
      {
        "id": "p2",
        "text": "The universe is far more complex than a painting."
      },
      {
        "id": "p3",
        "text": "Therefore, the universe requires a Creator."
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
    "scenario": "Player says to referee, 'You called that foul because you hate my team!'",
    "audioText": "Player says to referee, 'You called that foul because you hate my team!'",
    "options": [
      {
        "text": "Unfair response",
        "feedback": "Right. Assuming bad motives for a rule enforcement is unfair.",
        "isCorrect": true
      },
      {
        "text": "Careful reasoning",
        "feedback": "Is there proof the ref hates the team?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: No one is allowed to be outside after dark.\nStatement 2: The police officers are outside after dark.",
    "audioText": "Statement 1: No one is allowed to be outside after dark. Statement 2: The police officers are outside after dark.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. 'No one' means NO ONE.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can 'no one' exclude the police?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Tu Quoque",
      "description": "Trying to avoid guilt by pointing out your opponent also did something wrong."
    },
    "scenario": "Dad: 'Don't leave your bike in the driveway.' Son: 'Why? You left your car in the driveway yesterday!'",
    "audioText": "Dad: 'Don't leave your bike in the driveway.' Son: 'Why? You left your car in the driveway yesterday!'",
    "options": [
      {
        "text": "Tu Quoque",
        "feedback": "Right! Pointing out Mom's action doesn't change the rule for the bike.",
        "isCorrect": true
      },
      {
        "text": "Circular Reasoning",
        "feedback": "He isn't repeating himself.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A scientist says, 'I found water on this planet, so it definitely has alien cities on it!'",
    "audioText": "A scientist says, 'I found water on this planet, so it definitely has alien cities on it!'",
    "question": "What is the massive leap in logic?",
    "options": [
      {
        "text": "Water is necessary for life, but water does not automatically create cities.",
        "feedback": "Exactly. It's a huge non sequitur leap.",
        "isCorrect": true
      },
      {
        "text": "Water is dangerous.",
        "feedback": "Not the logic flaw.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Construct Modus Tollens.",
    "audioText": "Construct Modus Tollens.",
    "parts": [
      {
        "id": "p1",
        "text": "If it is snowing, it must be winter."
      },
      {
        "id": "p2",
        "text": "It is not winter."
      },
      {
        "id": "p3",
        "text": "Therefore, it is not snowing."
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
      "description": "Twisting an argument to easily attack it."
    },
    "scenario": "Student: 'I prefer playing piano over violin.' Friend: 'So you think violins are horrible garbage instruments?!'",
    "audioText": "Student: 'I prefer playing piano over violin.' Friend: 'So you think violins are horrible garbage instruments?!'",
    "options": [
      {
        "text": "Straw Man Fallacy",
        "feedback": "Correct. A preference for piano is not a hatred for violin.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Is that what the student said?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement 1: My little brother is entirely invisible to everyone.\nStatement 2: I saw my little brother hiding under the table.",
    "audioText": "Statement 1: My little brother is entirely invisible to everyone. Statement 2: I saw my little brother hiding under the table.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Exactly. If he is invisible, you cannot see him.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "Can you see the invisible?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "spot-flaw",
    "concept": {
      "title": "Bandwagon Fallacy",
      "description": "Saying something is right because it is popular."
    },
    "scenario": "A boy says, 'We should all wear our shirts backward because all the cool kids in 6th grade are doing it!'",
    "audioText": "A boy says, 'We should all wear our shirts backward because all the cool kids in 6th grade are doing it!'",
    "options": [
      {
        "text": "Bandwagon Fallacy",
        "feedback": "Right. Popularity doesn't mean something is a smart idea.",
        "isCorrect": true
      },
      {
        "text": "Tu Quoque",
        "feedback": "He isn't calling anyone a hypocrite.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "missing-piece",
    "scenario": "A baker says, 'I put my dough in a perfectly hot oven. In an hour, I will definitely have a delicious chocolate cake!'",
    "audioText": "A baker says, 'I put my dough in a perfectly hot oven. In an hour, I will definitely have a delicious chocolate cake!'",
    "question": "What assumption is the baker making?",
    "options": [
      {
        "text": "Assuming the dough actually has chocolate in it.",
        "feedback": "Spot on! An oven can't bake chocolate cake out of plain dough.",
        "isCorrect": true
      },
      {
        "text": "Assuming the oven is hot.",
        "feedback": "He already stated it was hot.",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "build-chain",
    "scenario": "Order the argument.",
    "audioText": "Order the argument.",
    "parts": [
      {
        "id": "p1",
        "text": "All fish can swim."
      },
      {
        "id": "p2",
        "text": "A shark is a fish."
      },
      {
        "id": "p3",
        "text": "Therefore, a shark can swim."
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
    "scenario": "Dad: 'We need to save money this month.' Teen: 'You just want to lock me in the house so I can never see my friends again!'",
    "audioText": "Dad: 'We need to save money this month.' Teen: 'You just want to lock me in the house so I can never see my friends again!'",
    "options": [
      {
        "text": "Emotional and distorted response",
        "feedback": "Correct. Saving money doesn't mean locking someone in.",
        "isCorrect": true
      },
      {
        "text": "Careful response",
        "feedback": "Did the teen accurately summarize saving money?",
        "isCorrect": false
      }
    ]
  },
  {
    "type": "contradiction-hunt",
    "scenario": "Statement A: God's power is absolutely limitless.\nStatement B: God cannot create a rock so heavy He cannot lift it.",
    "audioText": "Statement A: God's power is absolutely limitless. Statement B: God cannot create a rock so heavy He cannot lift it.",
    "options": [
      {
        "text": "They conflict (Contradiction)",
        "feedback": "Actually, this is a classic paradox. God's omnipotence doesn't mean He can do logically contradictory things.",
        "isCorrect": true
      },
      {
        "text": "Both can be true",
        "feedback": "This is a trick question. Limitless power doesn't mean doing the logically impossible.",
        "isCorrect": false
      }
    ]
  }
];

export default grade5;
