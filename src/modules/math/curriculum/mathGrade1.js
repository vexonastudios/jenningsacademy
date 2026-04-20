export const GRADE_1_CURRICULUM = [
  {
    day: 1,
    isTestDay: false,
    newSkills: ["addition_plus_1", "number_after"],
    teachingScript: "Welcome to Grade 1 Math! Today we are learning how to add 1 to a number. Adding 1 is just like counting to the very next number. If I have 3 apples, and I get 1 more, I just count up to 4. We are also going to practice finding the number that comes after another number.",
    teachingVisual: "3 + 1 = 4"
  },
  {
    day: 2,
    isTestDay: false,
    newSkills: ["addition_1_to_5"],
    teachingScript: "Today we will learn how to add numbers up to 5. Just put the big number in your head and count up with your fingers.",
    teachingVisual: "2 + 3 = 5"
  },
  {
    day: 3,
    isTestDay: false,
    newSkills: ["addition_plus_0"],
    teachingScript: "Here is a secret rule about zero. Zero means nothing. So, if you add zero to any number, the number stays exactly the same!",
    teachingVisual: "7 + 0 = 7"
  },
  {
    day: 4,
    isTestDay: false,
    newSkills: ["subtraction_1_to_5", "number_before"],
    teachingScript: "Today we are learning subtraction! Subtraction means taking away. If you have 5 cookies, and you eat 2, you count backward. We will also practice finding the number that comes right before another number.",
    teachingVisual: "5 - 2 = 3"
  },
  {
    day: 5,
    isTestDay: true,
    newSkills: [],
    teachingScript: null, // Test days skip teaching
    teachingVisual: null
  },
  {
    day: 6,
    isTestDay: false,
    newSkills: ["addition_doubles"],
    teachingScript: "Today we are learning Doubles! That means adding the exact same number together twice. Like 2 plus 2, or 3 plus 3. Memorizing these will make you very fast at math.",
    teachingVisual: "4 + 4 = 8"
  },
  {
    day: 7,
    isTestDay: false,
    newSkills: ["addition_1_to_9"],
    teachingScript: "You are getting so good at adding! Now we are going to add bigger numbers, all the way up to 9.",
    teachingVisual: "6 + 2 = 8"
  },
  {
    day: 8,
    isTestDay: false,
    newSkills: ["subtraction_1_to_9"],
    teachingScript: "It's time to subtract with bigger numbers. Remember, start with the big number and count backward.",
    teachingVisual: "9 - 4 = 5"
  },
  {
    day: 9,
    isTestDay: false,
    newSkills: [], // Dedicated review day, no new skills introduced.
    teachingScript: "Today is a pure practice day. Let's sharpen our skills and get ready for the test tomorrow!",
    teachingVisual: "Practice Day"
  },
  {
    day: 10,
    isTestDay: true,
    newSkills: [],
    teachingScript: null,
    teachingVisual: null
  },
  { day:11, isTestDay:false, newSkills:["addition_1_to_5", "subtraction_1_to_5"], teachingScript:"Welcome to the next level! Today we mix addition and subtraction. Pay close attention to the plus and minus signs!", teachingVisual:"4 + 1 = 5  |  4 - 1 = 3" },
  { day:12, isTestDay:false, newSkills:["addition_doubles", "addition_plus_1"], teachingScript:"Let's do some rapid-fire doubles and plus-ones. These should become automatic. See how fast you can answer them.", teachingVisual:"3 + 3 = 6" },
  { day:13, isTestDay:false, newSkills:["subtraction_1_to_9", "addition_plus_0"], teachingScript:"Subtraction with bigger numbers today. And don't forget the zero rule: anything minus zero stays the same!", teachingVisual:"8 - 0 = 8" },
  { day:14, isTestDay:false, newSkills:["addition_1_to_9", "number_after", "number_before"], teachingScript:"We are reviewing numbers that come before and after, right alongside our 1-9 addition. Think about the number line.", teachingVisual:"Before 7 is 6" },
  { day:15, isTestDay:true,  newSkills:[], teachingScript:null, teachingVisual:null },
  { day:16, isTestDay:false, newSkills:["addition_1_to_9", "subtraction_1_to_9"], teachingScript:"Mixed operations up to 9! Transitioning smoothly from adding to taking away is a core mathematical skill.", teachingVisual:"7 + 2 = 9  |  9 - 5 = 4" },
  { day:17, isTestDay:false, newSkills:["addition_doubles", "subtraction_1_to_5"], teachingScript:"More doubles and small subtractions. Try to picture the objects in your head without using your fingers if you can.", teachingVisual:"5 + 5 = 10" },
  { day:18, isTestDay:false, newSkills:["addition_plus_1", "addition_plus_0", "number_before"], teachingScript:"Let's breeze through plus ones and zeroes. These are your easy foundational facts.", teachingVisual:"9 + 0 = 9" },
  { day:19, isTestDay:false, newSkills:[], teachingScript:"Review day. Take a deep breath and apply everything you know before the big test.", teachingVisual:"Review Day" },
  { day:20, isTestDay:true,  newSkills:[], teachingScript:null, teachingVisual:null },
  { day:21, isTestDay:false, newSkills:["addition_1_to_9"], teachingScript:"Let's focus strictly on addition today. Find your speed and rhythm.", teachingVisual:"6 + 3 = 9" },
  { day:22, isTestDay:false, newSkills:["subtraction_1_to_9"], teachingScript:"Now strictly subtraction. Taking away from 9 and 8 can be tricky, so count backward carefully.", teachingVisual:"9 - 6 = 3" },
  { day:23, isTestDay:false, newSkills:["addition_doubles", "number_after"], teachingScript:"Doubles are back! If you know 4 plus 4 is 8, what comes right after 8? Think in steps.", teachingVisual:"4 + 4 = 8, then 9" },
  { day:24, isTestDay:false, newSkills:["addition_1_to_5", "subtraction_1_to_5"], teachingScript:"A gentle review of smaller numbers. Master the basics, and the big math will be easy.", teachingVisual:"3 + 2 = 5" },
  { day:25, isTestDay:true,  newSkills:[], teachingScript:null, teachingVisual:null },
  { day:26, isTestDay:false, newSkills:["addition_plus_1", "addition_plus_0", "subtraction_1_to_9"], teachingScript:"We're hitting the home stretch. Fast ones, zeroes, and large subtractions.", teachingVisual:"8 - 7 = 1" },
  { day:27, isTestDay:false, newSkills:["addition_1_to_9", "subtraction_1_to_9"], teachingScript:"Full mixing! Keep your eyes glued to the plus and minus signs so you don't get tricked.", teachingVisual:"Mixed Math" },
  { day:28, isTestDay:false, newSkills:["addition_doubles", "addition_1_to_9"], teachingScript:"Our final day of learning new addition patterns! You have grown so much.", teachingVisual:"You are Math Stars" },
  { day:29, isTestDay:false, newSkills:[], teachingScript:"The ultimate review day! Practice everything you have learned this month.", teachingVisual:"Mega Review" },
  { day:30, isTestDay:true,  newSkills:[], teachingScript:null, teachingVisual:null }
];
