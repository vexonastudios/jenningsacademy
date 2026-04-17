// Grade 9-10: Algebra & Geometry (Uses JSXGraph canvas for visual problems)
export const GRADE_9_CURRICULUM = [
  { day:1, isTestDay:false, newSkills:["algebra_linear"], teachingScript:"Welcome to Grade 9 Math! We begin with linear equations. Y equals M X plus B is the slope-intercept form of a line. M is the slope, B is the y-intercept. Plug in x to find y.", teachingVisual:"y = 2x + 3  →  when x=4, y=11" },
  { day:2, isTestDay:false, newSkills:["geometry_angle_sum"], teachingScript:"Geometry begins today! All three angles in a triangle always add up to 180 degrees. If you know two angles, subtract them from 180 to find the third.", teachingVisual:"40° + 70° + ? = 180°  →  70°" },
  { day:3, isTestDay:false, newSkills:["geometry_area_rectangle"], teachingScript:"Area of a rectangle is length times width. If the rectangle is 8 units wide and 5 units tall, the area is 40 square units.", teachingVisual:"Area = 8 × 5 = 40" },
  { day:4, isTestDay:false, newSkills:["geometry_area_triangle"], teachingScript:"Area of a triangle is one half times base times height. Picture the triangle as half of a rectangle — that's exactly where the formula comes from!", teachingVisual:"Area = ½ × 6 × 4 = 12" },
  { day:5, isTestDay:true,  newSkills:[], teachingScript:null, teachingVisual:null },
  { day:6, isTestDay:false, newSkills:["algebra_linear"], teachingScript:"Graphing linear equations — each (x, y) pair is a point on the line. Two points define the whole line. Let's plot some!", teachingVisual:"y = -x + 5" },
  { day:7, isTestDay:false, newSkills:["geometry_angle_sum"], teachingScript:"Triangle angle problems with algebra — when one angle is expressed as 2x, we can write an equation and solve for x.", teachingVisual:"x + 2x + 60° = 180°" },
  { day:8, isTestDay:false, newSkills:["geometry_area_rectangle","geometry_area_triangle"], teachingScript:"Mixed shape area day! Sometimes you need to find the area of composite shapes by adding rectangle and triangle areas together.", teachingVisual:"Rectangle + Triangle = Total Area" },
  { day:9, isTestDay:false, newSkills:[], teachingScript:"Algebra and geometry review day. Linear equations, angle sums, and shape areas.", teachingVisual:"Review Day" },
  { day:10, isTestDay:true, newSkills:[], teachingScript:null, teachingVisual:null }
];

// Grade 10-11: Advanced Algebra
export const GRADE_10_CURRICULUM = [
  { day:1, isTestDay:false, newSkills:["quadratic_evaluate"], teachingScript:"Welcome to Grade 10 Math! Today we explore quadratic equations — equations with x squared. Y equals ax squared plus bx plus c. Plug in x to evaluate.", teachingVisual:"y = x² - 2x + 1  →  when x=3, y=4" },
  { day:2, isTestDay:false, newSkills:["algebra_systems"], teachingScript:"Systems of equations — two equations, two unknowns. Add them or subtract them to eliminate one variable. Then solve for the other.", teachingVisual:"x+y=10, x-y=4  →  x=7, y=3" },
  { day:3, isTestDay:false, newSkills:["geometry_area_triangle"], teachingScript:"Advanced area problems today using the triangle formula in more complex configurations.", teachingVisual:"½ × base × height" },
  { day:4, isTestDay:false, newSkills:["quadratic_evaluate","algebra_systems"], teachingScript:"Mixed advanced algebra — quadratics and systems. Take your time on each step.", teachingVisual:"Systems + Quadratics" },
  { day:5, isTestDay:true,  newSkills:[], teachingScript:null, teachingVisual:null },
  { day:6, isTestDay:false, newSkills:["quadratic_evaluate"], teachingScript:"More quadratic evaluation — try negative values of x to see how the function behaves below zero.", teachingVisual:"y = 2x² + 3x - 5  →  when x=-2" },
  { day:7, isTestDay:false, newSkills:["algebra_systems"], teachingScript:"Systems of equations using substitution method — solve for one variable, substitute into the other equation.", teachingVisual:"y = x + 2; x + y = 8" },
  { day:8, isTestDay:false, newSkills:["algebra_linear","quadratic_evaluate"], teachingScript:"Comparing linear and quadratic functions — linear grows steadily, quadratic grows faster and faster.", teachingVisual:"Linear vs Quadratic" },
  { day:9, isTestDay:false, newSkills:[], teachingScript:"Full advanced algebra review before the test. Quadratics, systems, and linear functions.", teachingVisual:"Review Day" },
  { day:10, isTestDay:true, newSkills:[], teachingScript:null, teachingVisual:null }
];
