/**
 * "This Country of Ours" by H. E. Marshall
 * MP3 + SRT-synced audiobook content for Jennings Academy.
 *
 * Each chapter entry defines:
 *  - id, title, startSec, endSec  (for audio slicing)
 *  - questions: 10 comprehension questions with answer context
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
        a: "Eric the Red was a mighty king who lived in Greenland.",
        hintSec: 21,
        hintText: "In days long long ago there dwelt in Greenland a King named Eric the Red. He was a man mighty in war, and men held him in high honour.",
      },
      {
        q: "What did Bjarni report to the court of Eric the Red?",
        a: "Bjarni reported that he had spotted a strange new land far across the sea, though he had not gone ashore.",
        hintSec: 37,
        hintText: "He told how far away across the sea of Greenland, where no man had sailed before, he had found a new, strange land.",
      },
      {
        q: "Why did the people scorn Bjarni after his tale?",
        a: "They scorned him because he had not set foot on the new land and could tell them little about it.",
        hintSec: 77,
        hintText: "But when the people asked news of this unknown land Bjarni could tell them little, for he had not set foot upon those far shores. Therefore the people scorned him.",
      },
      {
        q: "Who decided to sail and find the land Bjarni had seen, and how did he prepare?",
        a: "Leif, the son of Eric the Red, decided to go. He asked his father for gold, bought Bjarni's ship, and gathered thirty-five companions.",
        hintSec: 111,
        hintText: "Leif the son of Eric the Red, longed to find that land. So Leif went to Eric and said: 'Oh my father, I fain would seek the land which Bjarni the Traveler has seen.'",
      },
      {
        q: "Who was Tyrker, and why was Leif upset when he went missing?",
        a: "Tyrker was Leif's foster father, a clever German craftsman whom Leif loved dearly.",
        hintSec: 535,
        hintText: "Tyrker also loved Leif dearly, for he had known him since he was a child, and was indeed his foster father.",
      },
      {
        q: "What amazing discovery did Tyrker make on the new land?",
        a: "Tyrker discovered grapevines and grapes growing in the land.",
        hintSec: 597,
        hintText: "'I did not go much farther than the others,' he said. 'But I have found something new. I have found vines and grapes.'",
      },
      {
        q: "What did Leif name the three lands he visited and why?",
        a: "He called the rocky land Helluland (Stone Land), the wooded flat land Markland (Woodland), and the lush green land Vineland (after the grapevines).",
        hintSec: 367,
        hintText: "'I will call it Helluland or Stone Land,' said Leif. ... So he called it Markland or Woodland. ... he called the land Vineland because of them.",
      },
      {
        q: "Why did Eric the Red not sail with Leif on the voyage?",
        a: "Eric's horse stumbled and threw him, wounding his foot, so he took it as a sign he was not meant to go.",
        hintSec: 413,
        hintText: "The horse upon which he was riding stumbled, and he was thrown to the ground. He tried to rise but could not, for his foot was sorely wounded. Seeing that he cried out sadly, 'It is not for me to discover new lands.'",
      },
      {
        q: "What happened to Thorvald when he explored Vineland after Leif?",
        a: "Thorvald was wounded in the armpit by an arrow from the native people and died from the wound.",
        hintSec: 860,
        hintText: "'As for me, I am wounded in the armpit by an arrow. Here is the shaft. Of a surety it will cause my death.'",
      },
      {
        q: "Why did Thorfinn and Gudrid eventually leave Vineland?",
        a: "Quarrels broke out between the Norsemen and the native people; the savages attacked and killed many of the Norsemen, so Thorfinn decided to return to Greenland.",
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
        a: "The Sea of Darkness was what people called the Atlantic Ocean. Sailors feared it because of legends about sea dragons, a giant bird, a bottomless pit of fire, and the belief that the ocean flowed downhill with no return.",
        hintSec: 1313,
        hintText: "To men of those days the Atlantic Ocean was known as the Outer Sea or the Sea of Darkness. It was said that huge and horrible sea-dragons lived there, ready to wreck and swallow down any vessel.",
      },
      {
        q: "Why did European sailors begin to think about sailing west toward India?",
        a: "The old eastern trade routes had fallen into the hands of Turks and Infidels, making them dangerous, so sailors looked for a new western route.",
        hintSec: 1400,
        hintText: "Port after port came under their rule, and infidel pirates swarmed in the Indian Ocean and Mediterranean until no Christian vessel was safe. They began to long for another way to the lands of spice and pearls.",
      },
      {
        q: "Who was Christopher Columbus, and what was his great dream?",
        a: "Columbus was a poor Italian sailor who believed the world was round and that India could be reached by sailing westward.",
        hintSec: 1455,
        hintText: "Many men now came to this conclusion, among them an Italian sailor named Christopher Columbus. The more Columbus thought about his plan of sailing west to reach India, the more he believed in it.",
      },
      {
        q: "Why did Columbus go to King John of Portugal?",
        a: "Columbus was poor and needed money to fund his voyage, so he sought the support of wealthy rulers, starting with King John of Portugal.",
        hintSec: 1500,
        hintText: "Without a great deal of money such an expedition was impossible, and Columbus was poor. His only hope was to win the help and friendship of a king or some other great and wealthy person.",
      },
      {
        q: "How did King John of Portugal betray Columbus?",
        a: "King John pretended to consult his wise men, then secretly sent out his own expedition using Columbus's plan without helping Columbus.",
        hintSec: 1537,
        hintText: "Instead of helping Columbus he meanly resolved to send out an expedition of his own. When Columbus heard of it he was so angry that he left Portugal.",
      },
      {
        q: "Why was it hard for Columbus to get help from King Henry VII of England?",
        a: "Henry VII had just seized the crown from Richard III and was focused on domestic affairs, not exploration.",
        hintSec: 1581,
        hintText: "Henry VII had but newly wrested the crown from Richard III, and so had no thought to spare for unknown lands.",
      },
      {
        q: "What was the name of the great sea voyage Columbus proposed, and which two kingdoms were fighting at the time?",
        a: "Columbus proposed a westward voyage to reach India. Spain was at war with the Moors when he arrived.",
        hintSec: 1592,
        hintText: "Christopher also arrived in Spain at an unfortunate time. For the Spaniards were carrying on a fierce warfare against the Moors.",
      },
      {
        q: "Which Spanish rulers eventually agreed to fund Columbus, and why?",
        a: "King Ferdinand and Queen Isabella of Spain agreed to fund him after he was almost ready to give up and leave for France.",
        hintSec: 1700,
        hintText: "At length Queen Isabella of Spain, moved by pity and enthusiasm, determined to help Columbus. She offered to pledge her own crown jewels to raise the money.",
      },
      {
        q: "What did Columbus promise to do with the wealth from his voyage?",
        a: "Columbus promised that with the riches he found he would equip ships and soldiers to recapture Jerusalem from the Infidels.",
        hintSec: 1750,
        hintText: "Columbus also promised that with the wealth he hoped to gain from his voyage he would equip warriors to rescue the Holy Sepulchre from the power of the Infidels.",
      },
      {
        q: "What title did Columbus request if his voyage succeeded?",
        a: "Columbus asked to be made Admiral and Viceroy of all the lands he discovered, and to keep one-tenth of all the wealth found there.",
        hintSec: 1790,
        hintText: "He asked to be made Admiral and Viceroy of all the lands he might discover, and to be allowed to keep a tenth part of all the wealth found there.",
      },
    ],
  },
];
