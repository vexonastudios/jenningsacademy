/**
 * "This Country of Ours" by H. E. Marshall
 * MP3 + SRT-synced audiobook content for Jennings Academy.
 *
 * Each chapter entry defines:
 *  - id, title, startSec, endSec  (for audio slicing)
 *  - questions: 10 comprehension questions with answer context
 *    options: Array of 4 strings for multiple choice
 *    hintTimestamp: approx second in the audio where the answer is spoken
 *    hintText: the passage excerpt shown when "Hint" is pressed
 */

export const BOOK_META = {
  id: "this-country-of-ours",
  title: "This Country of Ours",
  author: "H. E. Marshall",
  grade: "4+",
  mp3Url: "https://pub-b480fabed2b248b7827216136484e7a5.r2.dev/this-country-of-ours.mp3",
  srtUrl: "https://pub-b480fabed2b248b7827216136484e7a5.r2.dev/This_Country_of_OUrs_(Done).srt",
  coverColor: "#1e3a5f",
  description:
    "A living history of America — from the Vikings and Columbus through the Pilgrims, Revolutionary War, and beyond. Written for young readers and packed with adventure.",
};

export const CHAPTERS = [
  {
    id: 1,
    title: "How the Vikings of Old Sought and Found New Lands",
    startSec: 13,
    endSec: 1264,
    questions: [
      {
        q: "Who was Eric the Red, and where did he live?",
        options: [
          "A mighty king who lived in Greenland.",
          "A poor farmer in Norway.",
          "A famous shipbuilder from Iceland.",
          "A legendary explorer from England."
        ],
        a: "A mighty king who lived in Greenland.",
        hintSec: 21,
        hintText: "In days long long ago there dwelt in Greenland a King named Eric the Red. He was a man mighty in war, and men held him in high honour.",
      },
      {
        q: "What did Bjarni report to the court of Eric the Red?",
        options: [
          "He had spotted a strange new land far across the sea.",
          "He had found an island full of gold.",
          "He had met a king from the West.",
          "He saw a terrible sea monster."
        ],
        a: "He had spotted a strange new land far across the sea.",
        hintSec: 37,
        hintText: "He told how far away across the sea of Greenland, where no man had sailed before, he had found a new, strange land.",
      },
      {
        q: "Why did the people scorn Bjarni after his tale?",
        options: [
          "Because he had not set foot on the new land and could tell them little about it.",
          "Because they didn't believe the new land existed.",
          "Because he lost all his treasure on the voyage.",
          "Because he refused to tell them where the land was."
        ],
        a: "Because he had not set foot on the new land and could tell them little about it.",
        hintSec: 77,
        hintText: "But when the people asked news of this unknown land Bjarni could tell them little, for he had not set foot upon those far shores. Therefore the people scorned him.",
      },
      {
        q: "Who decided to sail and find the land Bjarni had seen, and how did he prepare?",
        options: [
          "Leif asked his father for gold, bought Bjarni's ship, and gathered 35 men.",
          "Thorvald built a new ship and gathered 100 men.",
          "Eric the Red sold his crown jewels to buy a fleet of ships.",
          "Bjarni returned with his own crew to claim the land."
        ],
        a: "Leif asked his father for gold, bought Bjarni's ship, and gathered 35 men.",
        hintSec: 111,
        hintText: "Leif the son of Eric the Red, longed to find that land. So Leif went to Eric and said: 'Oh my father, I fain would seek the land which Bjarni the Traveler has seen.'",
      },
      {
        q: "Who was Tyrker, and why was Leif upset when he went missing?",
        options: [
          "Tyrker was Leif's foster father, a clever German craftsman.",
          "Tyrker was the only navigator on the ship.",
          "Tyrker was a prince from a neighboring land.",
          "Tyrker was Leif's younger brother."
        ],
        a: "Tyrker was Leif's foster father, a clever German craftsman.",
        hintSec: 535,
        hintText: "Tyrker also loved Leif dearly, for he had known him since he was a child, and was indeed his foster father.",
      },
      {
        q: "What amazing discovery did Tyrker make on the new land?",
        options: [
          "He discovered grapevines and grapes growing in the land.",
          "He found a chest buried in the sand.",
          "He discovered a friendly tribe of natives.",
          "He found a river full of gold."
        ],
        a: "He discovered grapevines and grapes growing in the land.",
        hintSec: 597,
        hintText: "'I did not go much farther than the others,' he said. 'But I have found something new. I have found vines and grapes.'",
      },
      {
        q: "What did Leif name the three lands he visited?",
        options: [
          "Helluland (Stone Land), Markland (Woodland), and Vineland (Vine Land).",
          "Northland, Southland, and Eastland.",
          "Greenland, Iceland, and Vineland.",
          "Stone Land, Ice Land, and Snow Land."
        ],
        a: "Helluland (Stone Land), Markland (Woodland), and Vineland (Vine Land).",
        hintSec: 367,
        hintText: "'I will call it Helluland or Stone Land,' said Leif. ... So he called it Markland or Woodland. ... he called the land Vineland because of them.",
      },
      {
        q: "Why did Eric the Red not sail with Leif on the voyage?",
        options: [
          "His horse stumbled and wounded his foot, which he took as a bad sign.",
          "He was too old to travel across the sea.",
          "He needed to stay and rule his kingdom.",
          "He did not believe the new land was real."
        ],
        a: "His horse stumbled and wounded his foot, which he took as a bad sign.",
        hintSec: 413,
        hintText: "The horse upon which he was riding stumbled, and he was thrown to the ground. He tried to rise but could not, for his foot was sorely wounded. Seeing that he cried out sadly, 'It is not for me to discover new lands.'",
      },
      {
        q: "What happened to Thorvald when he explored Vineland after Leif?",
        options: [
          "He was wounded in the armpit by an arrow from the native people and died.",
          "He got lost in the woods and was never seen again.",
          "He built a great city and became its king.",
          "He returned to Greenland with a ship full of gold."
        ],
        a: "He was wounded in the armpit by an arrow from the native people and died.",
        hintSec: 860,
        hintText: "'As for me, I am wounded in the armpit by an arrow. Here is the shaft. Of a surety it will cause my death.'",
      },
      {
        q: "Why did Thorfinn and Gudrid eventually leave Vineland?",
        options: [
          "Quarrels broke out with the natives, who attacked and killed many Norsemen.",
          "A terrible winter froze their ships in the ice.",
          "They ran out of food and water.",
          "They missed their home in Greenland."
        ],
        a: "Quarrels broke out with the natives, who attacked and killed many Norsemen.",
        hintSec: 1155,
        hintText: "Quarrels arose between the newcomers and the natives, and the savages attacked the Norsemen and killed many of them. Then Thorfinn said he would no longer stay in Vineland.",
      },
    ],
  },
  {
    id: 2,
    title: "The Sea of Darkness and the Great Faith of Columbus",
    startSec: 1264,
    endSec: 2700,
    questions: [
      {
        q: "What was the 'Sea of Darkness' and why did sailors fear it?",
        options: [
          "The Atlantic Ocean; they feared sea dragons, a bottomless pit, and an ocean flowing downhill.",
          "The Indian Ocean; they feared pirates and terrible storms.",
          "The Mediterranean Sea; they feared the dark clouds that always covered it.",
          "The Pacific Ocean; they feared it was too cold to cross."
        ],
        a: "The Atlantic Ocean; they feared sea dragons, a bottomless pit, and an ocean flowing downhill.",
        hintSec: 1313,
        hintText: "To men of those days the Atlantic Ocean was known as the Outer Sea or the Sea of Darkness. It was said that huge and horrible sea-dragons lived there, ready to wreck and swallow down any vessel.",
      },
      {
        q: "Why did European sailors begin to think about sailing west toward India?",
        options: [
          "The old eastern routes fell into the hands of Turks and pirates, making them dangerous.",
          "They wanted to find new lands to conquer in the west.",
          "The King of Portugal ordered them to sail west.",
          "They followed a map left by the Vikings."
        ],
        a: "The old eastern routes fell into the hands of Turks and pirates, making them dangerous.",
        hintSec: 1400,
        hintText: "Port after port came under their rule, and infidel pirates swarmed in the Indian Ocean and Mediterranean until no Christian vessel was safe. They began to long for another way to the lands of spice and pearls.",
      },
      {
        q: "Who was Christopher Columbus, and what was his great dream?",
        options: [
          "A poor Italian sailor who believed he could reach India by sailing west.",
          "A wealthy Spanish noble who wanted to discover new lands.",
          "A brave English captain who wanted to defeat the pirates.",
          "A wise German scientist who proved the world was round."
        ],
        a: "A poor Italian sailor who believed he could reach India by sailing west.",
        hintSec: 1455,
        hintText: "Many men now came to this conclusion, among them an Italian sailor named Christopher Columbus. The more Columbus thought about his plan of sailing west to reach India, the more he believed in it.",
      },
      {
        q: "Why did Columbus go to King John of Portugal?",
        options: [
          "He was poor and needed money from wealthy rulers to fund his voyage.",
          "King John was famous for helping Italian sailors.",
          "He wanted to ask King John for a map of the world.",
          "King John was the only king who believed the world was round."
        ],
        a: "He was poor and needed money from wealthy rulers to fund his voyage.",
        hintSec: 1500,
        hintText: "Without a great deal of money such an expedition was impossible, and Columbus was poor. His only hope was to win the help and friendship of a king or some other great and wealthy person.",
      },
      {
        q: "How did King John of Portugal betray Columbus?",
        options: [
          "He secretly sent out his own expedition using Columbus's plan without helping him.",
          "He told the King of Spain not to help Columbus.",
          "He stole Columbus's maps and claimed them as his own.",
          "He threw Columbus in prison so he couldn't sail."
        ],
        a: "He secretly sent out his own expedition using Columbus's plan without helping him.",
        hintSec: 1537,
        hintText: "Instead of helping Columbus he meanly resolved to send out an expedition of his own. When Columbus heard of it he was so angry that he left Portugal.",
      },
      {
        q: "Why was it hard for Columbus to get help from King Henry VII of England?",
        options: [
          "Henry VII had just seized the crown and was focused on domestic affairs.",
          "Henry VII did not believe the world was round.",
          "Henry VII was too poor to fund an expedition.",
          "Henry VII was at war with Spain."
        ],
        a: "Henry VII had just seized the crown and was focused on domestic affairs.",
        hintSec: 1581,
        hintText: "Henry VII had but newly wrested the crown from Richard III, and so had no thought to spare for unknown lands.",
      },
      {
        q: "What was happening in Spain when Columbus arrived to ask for help?",
        options: [
          "Spain was fighting a fierce war against the Moors.",
          "Spain was celebrating a great victory over France.",
          "Spain was preparing to send a fleet to England.",
          "Spain was recovering from a terrible earthquake."
        ],
        a: "Spain was fighting a fierce war against the Moors.",
        hintSec: 1592,
        hintText: "Christopher also arrived in Spain at an unfortunate time. For the Spaniards were carrying on a fierce warfare against the Moors.",
      },
      {
        q: "Which Spanish rulers eventually agreed to fund Columbus, and why?",
        options: [
          "Queen Isabella and King Ferdinand, after Columbus was almost ready to leave for France.",
          "King Charles and Queen Mary, because they wanted spices.",
          "King Philip and Queen Elizabeth, to defeat Portugal.",
          "Queen Isabella alone, because she wanted a new crown."
        ],
        a: "Queen Isabella and King Ferdinand, after Columbus was almost ready to leave for France.",
        hintSec: 1700,
        hintText: "At length Queen Isabella of Spain, moved by pity and enthusiasm, determined to help Columbus. She offered to pledge her own crown jewels to raise the money.",
      },
      {
        q: "What did Columbus promise to do with the wealth from his voyage?",
        options: [
          "Equip ships and soldiers to recapture Jerusalem from the Infidels.",
          "Build a magnificent palace for the King and Queen of Spain.",
          "Give it all to the poor people of Italy.",
          "Buy a fleet of ships to conquer Portugal."
        ],
        a: "Equip ships and soldiers to recapture Jerusalem from the Infidels.",
        hintSec: 1750,
        hintText: "Columbus also promised that with the wealth he hoped to gain from his voyage he would equip warriors to rescue the Holy Sepulchre from the power of the Infidels.",
      },
      {
        q: "What title did Columbus request if his voyage succeeded?",
        options: [
          "Admiral and Viceroy of all the lands he discovered.",
          "King of the New World.",
          "Duke of the Western Seas.",
          "Commander of the Spanish Fleet."
        ],
        a: "Admiral and Viceroy of all the lands he discovered.",
        hintSec: 1790,
        hintText: "He asked to be made Admiral and Viceroy of all the lands he might discover, and to be allowed to keep a tenth part of all the wealth found there.",
      },
    ],
  },
];
