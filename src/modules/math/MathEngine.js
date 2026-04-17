const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const choice = (arr) => arr[rand(0, arr.length - 1)];

// ── Generator Helpers ──────────────────────────────────────────────────────────
function makeEquation(a, op, b, answer) {
  return { equation: `${a} ${op} ${b} = ?`, answer, type: "equation" };
}

// ── Skill Tag Generators ───────────────────────────────────────────────────────
const generators = {
  // Grade 1
  addition_plus_1:        () => { const a = rand(1,9); return { equation: `${a} + 1 = ?`, answer: a+1, type:"equation" }; },
  addition_plus_0:        () => { const a = rand(1,9); return { equation: `${a} + 0 = ?`, answer: a, type:"equation" }; },
  addition_doubles:       () => { const a = rand(1,9); return { equation: `${a} + ${a} = ?`, answer: a*2, type:"equation" }; },
  addition_1_to_5:        () => { const a=rand(1,4); const b=rand(1,5-a); return makeEquation(a,"+",b,a+b); },
  addition_1_to_9:        () => { const a=rand(1,8); const b=rand(1,9-a); return makeEquation(a,"+",b,a+b); },
  subtraction_1_to_5:     () => { const a=rand(2,5); const b=rand(1,a-1); return makeEquation(a,"-",b,a-b); },
  subtraction_1_to_9:     () => { const a=rand(2,9); const b=rand(1,a-1); return makeEquation(a,"-",b,a-b); },
  number_before:          () => { const a=rand(2,20); return { equation: `What number comes before ${a}?`, answer:a-1, type:"word" }; },
  number_after:           () => { const a=rand(1,19); return { equation: `What number comes after ${a}?`, answer:a+1, type:"word" }; },

  // Grade 2
  addition_2_digit:       () => { const a=rand(10,89); const b=rand(10,99-a); return makeEquation(a,"+",b,a+b); },
  subtraction_2_digit:    () => { const a=rand(20,99); const b=rand(10,a-1); return makeEquation(a,"-",b,a-b); },
  even_odd:               () => { const a=rand(1,20); return { equation:`Is ${a} even or odd? (type 0 for even or 1 for odd)`, answer: a%2, type:"word" }; },
  skip_count_2:           () => { const a=rand(2,18); return { equation:`${a} + 2 = ?`, answer:a+2, type:"equation" }; },
  skip_count_5:           () => { const a=rand(5,45); const r=a%5===0?a:a+(5-a%5); return { equation:`${r} + 5 = ?`, answer:r+5, type:"equation" }; },
  skip_count_10:          () => { const a=rand(10,90); const r=Math.round(a/10)*10; return { equation:`${r} + 10 = ?`, answer:r+10, type:"equation" }; },

  // Grade 3
  multiplication_1_digit: () => { const a=rand(2,9); const b=rand(2,9); return makeEquation(a,"×",b,a*b); },
  division_basic:         () => { const b=rand(2,9); const a=b*rand(1,9); return makeEquation(a,"÷",b,a/b); },
  addition_3_digit:       () => { const a=rand(100,499); const b=rand(100,999-a); return makeEquation(a,"+",b,a+b); },
  subtraction_3_digit:    () => { const a=rand(200,999); const b=rand(100,a-1); return makeEquation(a,"-",b,a-b); },

  // Grade 4
  multiplication_2_digit: () => { const a=rand(10,49); const b=rand(2,9); return makeEquation(a,"×",b,a*b); },
  long_division:          () => { const b=rand(2,9); const q=rand(10,50); return makeEquation(b*q,"÷",b,q); },
  fraction_simplify:      () => {
    const d=[2,3,4,5,6,8]; const den=choice(d); const num=rand(1,den-1);
    return { equation:`Simplify: ${num*2}/${den*2}`, answer:num, type:"fraction", denominator:den };
  },
  fraction_addition_like_denom: () => {
    const d=rand(2,10); const a=rand(1,d-1); const b=rand(1,d-a);
    return { equation:`${a}/${d} + ${b}/${d} = ?/${d}`, answer:a+b, type:"equation" };
  },

  // Grade 5
  fraction_subtraction_like_denom: () => {
    const d=rand(2,10); const a=rand(2,d); const b=rand(1,a-1);
    return { equation:`${a}/${d} - ${b}/${d} = ?/${d}`, answer:a-b, type:"equation" };
  },
  fraction_multiplication: () => {
    const n1=rand(1,5); const d1=rand(2,6); const n2=rand(1,5); const d2=rand(2,6);
    return { equation:`${n1}/${d1} × ${n2}/${d2} = ? (numerator only)`, answer:n1*n2, type:"equation" };
  },
  decimal_addition:       () => {
    const a=(rand(100,999)/100).toFixed(2); const b=(rand(10,99)/100).toFixed(2);
    return { equation:`${a} + ${b} = ?`, answer:parseFloat((parseFloat(a)+parseFloat(b)).toFixed(2)), type:"equation" };
  },
  percent_of_number:      () => {
    const percents=[10,20,25,50]; const p=choice(percents); const n=rand(2,20)*10;
    return { equation:`${p}% of ${n} = ?`, answer:(p*n/100), type:"equation" };
  },

  // Grade 6
  integers_addition:      () => { const a=rand(-10,10); const b=rand(-10,10); return makeEquation(a,"+",b,a+b); },
  integers_subtraction:   () => { const a=rand(-10,10); const b=rand(-10,10); return makeEquation(a,"-",b,a-b); },
  order_of_operations:    () => {
    const a=rand(1,9); const b=rand(1,9); const c=rand(1,9);
    return { equation:`${a} + ${b} × ${c} = ?`, answer:a+(b*c), type:"equation" };
  },
  ratio_simplify:         () => {
    const f=rand(2,5); const a=rand(1,6)*f; const b=rand(1,6)*f;
    return { equation:`Simplify ${a}:${b}  (answer = ${a/f})`, answer:a/f, type:"equation" };
  },

  // Grade 7
  pre_algebra_1_step:     () => {
    const x=rand(1,20); const b=rand(1,15);
    return { equation:`x + ${b} = ${x+b}  →  x = ?`, answer:x, type:"equation" };
  },
  pre_algebra_multiply:   () => {
    const x=rand(1,12); const a=rand(2,9);
    return { equation:`${a}x = ${a*x}  →  x = ?`, answer:x, type:"equation" };
  },
  integers_multiplication:() => { const a=rand(-9,-1); const b=rand(2,9); return makeEquation(a,"×",b,a*b); },

  // Grade 8
  algebra_2_step:         () => {
    const x=rand(1,10); const a=rand(2,6); const b=rand(1,15);
    return { equation:`${a}x + ${b} = ${a*x+b}  →  x = ?`, answer:x, type:"equation" };
  },
  square_roots:           () => {
    const perf=[1,4,9,16,25,36,49,64,81,100,121,144]; const n=choice(perf);
    return { equation:`√${n} = ?`, answer:Math.sqrt(n), type:"equation" };
  },
  exponents_basic:        () => {
    const b=rand(2,9); const e=rand(2,3);
    return { equation:`${b}^${e} = ?`, answer:Math.pow(b,e), type:"equation" };
  },
  pythagorean_theorem:    () => {
    const pairs=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]];
    const [a,b,c]=choice(pairs);
    return { equation:`Right triangle: a=${a}, b=${b}. Find c using a²+b²=c². c = ?`, answer:c, type:"equation" };
  },

  // Grades 9-12: Geometry (canvas-visual type)
  geometry_angle_sum:     () => {
    const a=rand(30,80); const b=rand(30,80); const c=180-a-b;
    return { equation:`Triangle angles: ${a}° and ${b}°. What is the 3rd angle?`, answer:c, type:"geometry", visualData:{ type:"triangle", angles:[a,b,c] } };
  },
  geometry_area_rectangle:() => {
    const w=rand(3,15); const h=rand(3,15);
    return { equation:`Rectangle: width=${w}, height=${h}. Area = ?`, answer:w*h, type:"geometry", visualData:{ type:"rectangle", w, h } };
  },
  geometry_area_triangle: () => {
    const b=rand(4,20); const h=rand(4,20);
    return { equation:`Triangle: base=${b}, height=${h}. Area = ?`, answer:(b*h)/2, type:"geometry", visualData:{ type:"triangle_area", b, h } };
  },
  algebra_linear:         () => {
    const m=rand(1,5); const b=rand(-5,5); const x=rand(-5,5);
    return { equation:`y = ${m}x + ${b} when x = ${x}. y = ?`, answer:m*x+b, type:"equation" };
  },
  quadratic_evaluate:     () => {
    const x=rand(-3,3); const a=rand(1,3); const b=rand(-3,3); const c=rand(-5,5);
    return { equation:`y = ${a}x² + ${b}x + ${c} when x = ${x}. y = ?`, answer:a*x*x+b*x+c, type:"equation" };
  },
  algebra_systems:        () => {
    const x=rand(1,8); const y=rand(1,8);
    return { equation:`x + y = ${x+y}, x - y = ${x-y}. x = ?`, answer:x, type:"equation" };
  },
};

export function generateProblem(skillTag) {
  const gen = generators[skillTag];
  if (!gen) {
    // Fallback
    const a = rand(1,5); const b = rand(1,5);
    return { equation:`${a} + ${b} = ?`, answer:a+b, skillTag, type:"equation" };
  }
  const result = gen();
  return { ...result, skillTag };
}
