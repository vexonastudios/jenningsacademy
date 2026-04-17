export function generateProblem(skillTag) {
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  let equation = "";
  let answer = 0;
  let type = "equation"; // Could be equation or word_problem

  switch (skillTag) {
    case "addition_1_to_5": {
      const a = rand(1, 4);
      const b = rand(1, 5 - a);
      equation = `${a} + ${b} = ?`;
      answer = a + b;
      break;
    }
    case "addition_1_to_9": {
      const a = rand(1, 8);
      const b = rand(1, 9 - a);
      equation = `${a} + ${b} = ?`;
      answer = a + b;
      break;
    }
    case "addition_doubles": {
      const a = rand(1, 9);
      equation = `${a} + ${a} = ?`;
      answer = a + a;
      break;
    }
    case "addition_plus_1": {
      const a = rand(1, 9);
      equation = `${a} + 1 = ?`;
      answer = a + 1;
      break;
    }
    case "addition_plus_0": {
      const a = rand(1, 9);
      equation = `${a} + 0 = ?`;
      answer = a;
      break;
    }
    case "subtraction_1_to_5": {
      const a = rand(2, 5);
      const b = rand(1, a - 1);
      equation = `${a} - ${b} = ?`;
      answer = a - b;
      break;
    }
    case "subtraction_1_to_9": {
      const a = rand(2, 9);
      const b = rand(1, a - 1);
      equation = `${a} - ${b} = ?`;
      answer = a - b;
      break;
    }
    case "number_before": {
      const a = rand(2, 20);
      equation = `What number comes before ${a}?`;
      answer = a - 1;
      break;
    }
    case "number_after": {
      const a = rand(1, 19);
      equation = `What number comes after ${a}?`;
      answer = a + 1;
      break;
    }
    default: {
      // Fallback
      const a = rand(1, 5);
      const b = rand(1, 5);
      equation = `${a} + ${b} = ?`;
      answer = a + b;
    }
  }

  return { equation, answer, skillTag, type };
}
