const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const choice = (arr) => arr[rand(0, arr.length - 1)];

// Format a number cleanly: shows -3 not +-3, no leading +
const fmt = (n) => n < 0 ? `- ${Math.abs(n)}` : `${n}`;
const fmtSign = (n) => n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`;

// ── Generator Helpers ──────────────────────────────────────────────────────────
function makeEquation(a, op, b, answer, steps = []) {
  return { equation: `${a} ${op} ${b} = ?`, answer, type: "equation", steps };
}

// ── Skill Tag Generators ───────────────────────────────────────────────────────
const generators = {
  // Grade 1
  addition_plus_1: () => {
    const a = rand(1,9);
    return { equation:`${a} + 1 = ?`, answer:a+1, type:"equation",
      steps:[`Start with ${a}.`, `Count up 1.`, `${a} + 1 = ${a+1}`] };
  },
  addition_plus_0: () => {
    const a = rand(1,9);
    return { equation:`${a} + 0 = ?`, answer:a, type:"equation",
      steps:[`Adding zero means nothing changes.`, `${a} + 0 = ${a}`] };
  },
  addition_doubles: () => {
    const a = rand(1,9);
    return { equation:`${a} + ${a} = ?`, answer:a*2, type:"equation",
      steps:[`${a} + ${a} is a double.`, `Think: ${a} groups of 2 = ${a*2}`] };
  },
  addition_1_to_5: () => {
    const a=rand(1,4); const b=rand(1,5-a);
    return makeEquation(a,"+",b,a+b, [`Put ${a} in your head.`, `Count up ${b} more.`, `${a} + ${b} = ${a+b}`]);
  },
  addition_1_to_9: () => {
    const a=rand(1,8); const b=rand(1,9-a);
    return makeEquation(a,"+",b,a+b, [`Start at ${a}`, `Count forward ${b}`, `${a} + ${b} = ${a+b}`]);
  },
  subtraction_1_to_5: () => {
    const a=rand(2,5); const b=rand(1,a-1);
    return makeEquation(a,"-",b,a-b, [`Start at ${a}.`, `Count DOWN ${b}.`, `${a} - ${b} = ${a-b}`]);
  },
  subtraction_1_to_9: () => {
    const a=rand(2,9); const b=rand(1,a-1);
    return makeEquation(a,"-",b,a-b, [`Start at ${a}.`, `Take away ${b}.`, `${a} - ${b} = ${a-b}`]);
  },
  number_before: () => {
    const a=rand(2,20);
    return { equation:`What number comes before ${a}?`, answer:a-1, type:"word",
      steps:[`Count just below ${a}.`, `The number before ${a} is ${a-1}.`] };
  },
  number_after: () => {
    const a=rand(1,19);
    return { equation:`What number comes after ${a}?`, answer:a+1, type:"word",
      steps:[`Count just above ${a}.`, `The number after ${a} is ${a+1}.`] };
  },

  // Grade 2
  addition_2_digit: () => {
    const a=rand(10,89); const b=rand(10,99-a);
    return makeEquation(a,"+",b,a+b, [`Add the ones: ${a%10} + ${b%10}`, `Add the tens: ${Math.floor(a/10)} + ${Math.floor(b/10)}`, `Total: ${a+b}`]);
  },
  subtraction_2_digit: () => {
    const a=rand(20,99); const b=rand(10,a-1);
    return makeEquation(a,"-",b,a-b, [`Subtract ones column: ${a%10} - ${b%10}`, `Subtract tens column: ${Math.floor(a/10)} - ${Math.floor(b/10)}`, `Answer: ${a-b}`]);
  },
  even_odd: () => {
    const a=rand(1,20);
    return { equation:`Is ${a} even or odd? (0=even, 1=odd)`, answer:a%2, type:"word",
      steps:[`Even numbers end in 0,2,4,6,8.`, `Odd numbers end in 1,3,5,7,9.`, `${a} ends in ${a%10}, so it is ${a%2===0?"even":"odd"}.`] };
  },
  skip_count_2: () => {
    const a=rand(2,18);
    return { equation:`${a} + 2 = ?`, answer:a+2, type:"equation",
      steps:[`Counting by 2s: ${a}, ${a+2}...`, `${a} + 2 = ${a+2}`] };
  },
  skip_count_5: () => {
    const a=rand(5,45); const r=a%5===0?a:a+(5-a%5);
    return { equation:`${r} + 5 = ?`, answer:r+5, type:"equation",
      steps:[`Counting by 5s: ${r}, ${r+5}...`, `${r} + 5 = ${r+5}`] };
  },
  skip_count_10: () => {
    const a=rand(10,90); const r=Math.round(a/10)*10;
    return { equation:`${r} + 10 = ?`, answer:r+10, type:"equation",
      steps:[`Adding 10 means the tens digit goes up by 1.`, `${r} + 10 = ${r+10}`] };
  },

  // Grade 3
  multiplication_1_digit: () => {
    const a=rand(2,9); const b=rand(2,9);
    return makeEquation(a,"×",b,a*b, [`${a} × ${b} means ${a} groups of ${b}.`, `Add: ${Array(a).fill(b).join(" + ")} = ${a*b}`]);
  },
  division_basic: () => {
    const b=rand(2,9); const a=b*rand(1,9);
    return makeEquation(a,"÷",b,a/b, [`${a} ÷ ${b} asks: how many groups of ${b} fit in ${a}?`, `${b} × ? = ${a}`, `Answer: ${a/b}`]);
  },
  addition_3_digit: () => {
    const a=rand(100,499); const b=rand(100,999-a);
    return makeEquation(a,"+",b,a+b, [`Add ones: ${a%10}+${b%10}`, `Add tens: ${Math.floor(a/10)%10}+${Math.floor(b/10)%10}`, `Add hundreds: ${Math.floor(a/100)}+${Math.floor(b/100)}`, `Total: ${a+b}`]);
  },
  subtraction_3_digit: () => {
    const a=rand(200,999); const b=rand(100,a-1);
    return makeEquation(a,"-",b,a-b, [`Subtract column by column right to left.`, `Borrow from the next column if needed.`, `${a} - ${b} = ${a-b}`]);
  },

  // Grade 4
  multiplication_2_digit: () => {
    const a=rand(10,49); const b=rand(2,9);
    return makeEquation(a,"×",b,a*b, [`Multiply ones: ${a%10} × ${b} = ${(a%10)*b}`, `Multiply tens: ${Math.floor(a/10)} × ${b} = ${Math.floor(a/10)*b}`, `Add: ${(a%10)*b} + ${Math.floor(a/10)*b*10} = ${a*b}`]);
  },
  long_division: () => {
    const b=rand(2,9); const q=rand(10,50);
    return makeEquation(b*q,"÷",b,q, [`How many times does ${b} go into ${b*q}?`, `${b} × ${q} = ${b*q}`, `Answer: ${q}`]);
  },
  fraction_simplify: () => {
    const d=[2,3,4,5,6,8]; const den=choice(d); const num=rand(1,den-1);
    return { equation:`Simplify: ${num*2}/${den*2}`, answer:num, type:"fraction", denominator:den,
      steps:[`Divide top and bottom by 2.`, `${num*2} ÷ 2 = ${num}`, `${den*2} ÷ 2 = ${den}`, `Answer: ${num}/${den}`] };
  },
  fraction_addition_like_denom: () => {
    const d=rand(2,10); const a=rand(1,d-1); const b=rand(1,d-a);
    return { equation:`${a}/${d} + ${b}/${d} = ?/${d}`, answer:a+b, type:"equation",
      steps:[`Same denominator? Just add the tops.`, `${a} + ${b} = ${a+b}`, `Answer: ${a+b}/${d}`] };
  },

  // Grade 5
  fraction_subtraction_like_denom: () => {
    const d=rand(2,10); const a=rand(2,d); const b=rand(1,a-1);
    return { equation:`${a}/${d} - ${b}/${d} = ?/${d}`, answer:a-b, type:"equation",
      steps:[`Same denominator? Just subtract the tops.`, `${a} - ${b} = ${a-b}`, `Answer: ${a-b}/${d}`] };
  },
  fraction_multiplication: () => {
    const n1=rand(1,5); const d1=rand(2,6); const n2=rand(1,5); const d2=rand(2,6);
    return { equation:`${n1}/${d1} × ${n2}/${d2} = ? (numerator)`, answer:n1*n2, type:"equation",
      steps:[`Multiply tops: ${n1} × ${n2} = ${n1*n2}`, `Multiply bottoms: ${d1} × ${d2} = ${d1*d2}`, `Answer: ${n1*n2}/${d1*d2}`] };
  },
  decimal_addition: () => {
    const a=(rand(100,999)/100).toFixed(2); const b=(rand(10,99)/100).toFixed(2);
    const ans=parseFloat((parseFloat(a)+parseFloat(b)).toFixed(2));
    return { equation:`${a} + ${b} = ?`, answer:ans, type:"equation",
      steps:[`Line up the decimal points.`, `Add normally.`, `${a} + ${b} = ${ans}`] };
  },
  percent_of_number: () => {
    const percents=[10,20,25,50]; const p=choice(percents); const n=rand(2,20)*10;
    return { equation:`${p}% of ${n} = ?`, answer:(p*n/100), type:"equation",
      steps:[`Percent means "out of 100".`, `${p}% = ${p}/100`, `${p}/100 × ${n} = ${p*n/100}`] };
  },

  // Grade 6
  integers_addition: () => {
    const a=rand(-10,10); const b=rand(-10,10);
    const eq = b >= 0 ? `${a} + ${b}` : `${a} + (${b})`;
    return { equation:`${eq} = ?`, answer:a+b, type:"equation",
      steps:[`Use a number line.`, `Start at ${a}.`, `Move ${b >= 0 ? 'right' : 'left'} ${Math.abs(b)} steps.`, `Land on ${a+b}.`] };
  },
  integers_subtraction: () => {
    const a=rand(-10,10); const b=rand(-10,10);
    return { equation:`${a} - (${b}) = ?`, answer:a-b, type:"equation",
      steps:[`Subtracting a negative = adding a positive.`, `${a} - (${b}) = ${a} + ${-b}`, `= ${a-b}`] };
  },
  order_of_operations: () => {
    const a=rand(1,9); const b=rand(1,9); const c=rand(1,9);
    return { equation:`${a} + ${b} × ${c} = ?`, answer:a+(b*c), type:"equation",
      steps:[`Multiply FIRST: ${b} × ${c} = ${b*c}`, `Then add: ${a} + ${b*c} = ${a+b*c}`, `Answer: ${a+b*c}`] };
  },
  ratio_simplify: () => {
    const f=rand(2,5); const a=rand(1,6)*f; const b=rand(1,6)*f;
    return { equation:`Simplify ${a}:${b}`, answer:a/f, type:"equation",
      steps:[`Find what both ${a} and ${b} are divisible by.`, `Both divide by ${f}.`, `${a}÷${f} = ${a/f} and ${b}÷${f} = ${b/f}`, `Answer: ${a/f}`] };
  },

  // Grade 7
  pre_algebra_1_step: () => {
    const x=rand(1,20); const b=rand(1,15);
    return { equation:`x + ${b} = ${x+b}  →  x = ?`, answer:x, type:"equation",
      steps:[`To isolate x, subtract ${b} from both sides.`, `x + ${b} - ${b} = ${x+b} - ${b}`, `x = ${x}`] };
  },
  pre_algebra_multiply: () => {
    const x=rand(1,12); const a=rand(2,9);
    return { equation:`${a}x = ${a*x}  →  x = ?`, answer:x, type:"equation",
      steps:[`Divide both sides by ${a}.`, `${a}x ÷ ${a} = ${a*x} ÷ ${a}`, `x = ${x}`] };
  },
  integers_multiplication: () => {
    const a=rand(-9,-1); const b=rand(2,9);
    return makeEquation(a,"×",b,a*b, [`Negative × Positive = Negative.`, `${Math.abs(a)} × ${b} = ${Math.abs(a*b)}`, `Answer: ${a*b}`]);
  },

  // Grade 8
  algebra_2_step: () => {
    const x=rand(1,10); const a=rand(2,6); const b=rand(1,15);
    return { equation:`${a}x + ${b} = ${a*x+b}  →  x = ?`, answer:x, type:"equation",
      steps:[`Step 1: Subtract ${b} from both sides.`, `${a}x = ${a*x+b} - ${b} = ${a*x}`, `Step 2: Divide both sides by ${a}.`, `x = ${a*x} ÷ ${a} = ${x}`] };
  },
  square_roots: () => {
    const perf=[1,4,9,16,25,36,49,64,81,100,121,144]; const n=choice(perf);
    const ans=Math.sqrt(n);
    return { equation:`√${n} = ?`, answer:ans, type:"equation",
      steps:[`Square root asks: what number times itself = ${n}?`, `${ans} × ${ans} = ${n}`, `Answer: ${ans}`] };
  },
  exponents_basic: () => {
    const b=rand(2,9); const e=rand(2,3);
    const ans=Math.pow(b,e);
    return { equation:`${b}^${e} = ?`, answer:ans, type:"equation",
      steps:[`${b}^${e} means ${b} multiplied ${e} times.`, `${Array(e).fill(b).join(" × ")} = ${ans}`] };
  },
  pythagorean_theorem: () => {
    const pairs=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]];
    const [a,b,c]=choice(pairs);
    return { equation:`Right triangle: a=${a}, b=${b}. Find c.`, answer:c, type:"equation",
      steps:[`Formula: a² + b² = c²`, `${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a+b*b}`, `√${c*c} = ${c}`, `c = ${c}`] };
  },

  // Grades 9-12
  geometry_angle_sum: () => {
    const a=rand(30,80); const b=rand(30,80); const c=180-a-b;
    return { equation:`Triangle angles: ${a}° and ${b}°. Find the 3rd angle.`, answer:c, type:"geometry",
      visualData:{ type:"triangle", angles:[a,b,c] },
      steps:[`All triangle angles add up to 180°.`, `${a} + ${b} + ? = 180`, `? = 180 - ${a} - ${b} = ${c}`] };
  },
  geometry_area_rectangle: () => {
    const w=rand(3,15); const h=rand(3,15);
    return { equation:`Rectangle: width=${w}, height=${h}. Area = ?`, answer:w*h, type:"geometry",
      visualData:{ type:"rectangle", w, h },
      steps:[`Area of rectangle = width × height`, `= ${w} × ${h}`, `= ${w*h}`] };
  },
  geometry_area_triangle: () => {
    const b=rand(4,20); const h=rand(4,20);
    return { equation:`Triangle: base=${b}, height=${h}. Area = ?`, answer:(b*h)/2, type:"geometry",
      visualData:{ type:"triangle_area", b, h },
      steps:[`Area of triangle = ½ × base × height`, `= ½ × ${b} × ${h}`, `= ${(b*h)/2}`] };
  },
  algebra_linear: () => {
    const m=rand(1,5); const b=rand(-5,5); const x=rand(-5,5);
    const ans=m*x+b;
    // Clean formatting: avoid "5x + -1"
    const bPart = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    return { equation:`y = ${m}x ${bPart}  when x = ${x}. y = ?`, answer:ans, type:"equation",
      steps:[`Plug in x = ${x}.`, `y = ${m}(${x}) ${bPart}`, `y = ${m*x} ${bPart}`, `y = ${ans}`] };
  },
  quadratic_evaluate: () => {
    const x=rand(-3,3); const a=rand(1,3); const b=rand(-3,3); const c=rand(-5,5);
    const ans=a*x*x+b*x+c;
    const bPart = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
    const cPart = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    return { equation:`y = ${a}x² ${bPart} ${cPart}  when x = ${x}. y = ?`, answer:ans, type:"equation",
      steps:[`Plug in x = ${x}.`, `y = ${a}(${x})² ${bPart} ${cPart}`, `y = ${a*x*x} + ${b*x} + ${c}`, `y = ${ans}`] };
  },
  algebra_systems: () => {
    const x=rand(1,8); const y=rand(1,8);
    return { equation:`x + y = ${x+y},  x - y = ${x-y}.  x = ?`, answer:x, type:"equation",
      steps:[`Add the two equations together.`, `(x+y) + (x-y) = ${x+y} + ${x-y}`, `2x = ${2*x}`, `x = ${x}`] };
  },

  // Kindergarten (Grade 0)
  counting_up_to_5: () => {
    const start = rand(1, 3);
    return { equation: `${start}, ${start+1}, ?`, answer: start+2, type: "equation", steps: [`Count up by 1.`, `${start}, ${start+1}, ${start+2}`] };
  },
  counting_up_to_10: () => {
    const start = rand(4, 8);
    return { equation: `${start}, ${start+1}, ?`, answer: start+2, type: "equation", steps: [`Count up by 1.`, `${start}, ${start+1}, ${start+2}`] };
  },
  number_recognition: () => {
    const n = rand(1, 10);
    return { equation: `What number is this: ${n}?`, answer: n, type: "word", steps: [`This is the number ${n}.`] };
  },

  // Grade 11
  trig_sin_cos: () => {
    const problems = [
      { eq: "sin(0°)", ans: 0 },
      { eq: "cos(0°)", ans: 1 },
      { eq: "sin(90°)", ans: 1 },
      { eq: "cos(90°)", ans: 0 },
      { eq: "sin(180°)", ans: 0 },
      { eq: "cos(180°)", ans: -1 }
    ];
    const p = choice(problems);
    return { equation: `${p.eq} = ?`, answer: p.ans, type: "equation", steps: [`Think of the unit circle.`, `${p.eq} = ${p.ans}`] };
  },
  exponential_solve: () => {
    const base = rand(2, 5);
    const exp = rand(2, 4);
    const result = Math.pow(base, exp);
    return { equation: `${base}^x = ${result} → x = ?`, answer: exp, type: "equation", steps: [`What power of ${base} equals ${result}?`, `${base}^${exp} = ${result}`, `x = ${exp}`] };
  },
  logarithm_basic: () => {
    const bases = [2, 3, 10];
    const base = choice(bases);
    const exp = rand(2, 4);
    const result = Math.pow(base, exp);
    return { equation: `log_${base}(${result}) = ?`, answer: exp, type: "equation", steps: [`What power is ${base} raised to to get ${result}?`, `${base}^${exp} = ${result}`, `Answer is ${exp}`] };
  },
  rational_solve: () => {
    const x = rand(2, 10);
    const num = rand(2, 5) * x;
    return { equation: `${num} / x = ${num/x} → x = ?`, answer: x, type: "equation", steps: [`Multiply both sides by x.`, `${num/x} * x = ${num}`, `x = ${x}`] };
  },

  // Grade 12
  derivative_power_rule: () => {
    const coeff = rand(2, 5);
    const pow = rand(2, 4);
    const x = rand(1, 3);
    const ans = coeff * pow * Math.pow(x, pow - 1);
    return { equation: `f(x)=${coeff}x^${pow}. Find f'(${x}).`, answer: ans, type: "equation", steps: [`Power rule: f'(x) = ${coeff * pow}x^${pow - 1}`, `Plug in x=${x}:  ${coeff*pow}(${x})^${pow-1} = ${ans}`] };
  },
  integral_polynomial: () => {
    const coeff = rand(2, 4);
    const top = rand(2, 4); // integral from 0 to top
    // ∫ coeff*x dx = (coeff/2) * x^2
    const ans = (coeff / 2) * top * top;
    return { equation: `Integral of ${coeff}x from 0 to ${top} = ?`, answer: ans, type: "equation", steps: [`Antiderivative of ${coeff}x is ${(coeff/2)}x^2.`, `Evaluate from 0 to ${top}: ${(coeff/2)}(${top})^2 - 0 = ${ans}`] };
  },
  probability_dice: () => {
    // just random sum
    return { equation: `Prob of flipping a coin and getting Heads? (Answer in %)`, answer: 50, type: "equation", steps: [`A coin has 2 sides, Heads is 1 side.`, `1/2 = 50%`] };
  },
  mean_average: () => {
    const a = rand(2, 10);
    const b = rand(2, 10);
    const c = rand(2, 10);
    const sum = a+b+c;
    const ans = parseFloat((sum/3).toFixed(2));
    return { equation: `Average of ${a}, ${b}, ${c} = ?`, answer: ans, type: "equation", steps: [`Average = Sum / Count`, `Sum = ${sum}. Count = 3.`, `Average = ${ans}`] };
  }
};

export function generateProblem(skillTag) {
  const gen = generators[skillTag];
  if (!gen) {
    const a = rand(1,5); const b = rand(1,5);
    return { equation:`${a} + ${b} = ?`, answer:a+b, skillTag, type:"equation", steps:[`${a} + ${b} = ${a+b}`] };
  }
  const result = gen();
  return { ...result, skillTag, steps: result.steps || [] };
}
