import fs from "fs";

function readFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    const { result, controlResult } = extractMulSequences(data);

    return { result, controlResult };
  } catch (error: any) {
    console.error(`Error reading file: ${error.message}`);
    return { result: [], controlResult: [] };
  }
}

function extractMulSequences(input: string) {
  const mulPattern = /\bmul\((\d+),(\d+)\)/g;
  const mulPattern2 = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;

  const matches = input.matchAll(mulPattern);

  const result: string[] = [];
  for (const match of matches) {
    result.push(match[0]);
  }

  const controlResult: string[] = [];
  const matches2 = input.matchAll(mulPattern2);
  let isSkipping = false;

  for (const match of matches2) {
    if (match[0].includes("do()")) {
      isSkipping = false; // Allow processing after do()
      continue;
    } else if (match[0].includes("don't()")) {
      isSkipping = true; // Disable processing after don't()
      continue;
    }

    if (!isSkipping) {
      controlResult.push(match[0]);
    }
  }

  console.log(controlResult);
  return { result, controlResult };
}

function sumOfAllMultiplicationsInMull(sequences: string[]) {
  let result = 0;

  sequences.forEach((sequence) => {
    const [firstNumber, secondNumber] = sequence
      .replace("mul(", "")
      .replace(")", "")
      .split(",")
      .map(Number);

    result += firstNumber * secondNumber;
  });

  return result;
}

function runCode() {
  const filePath = "day-3.txt";

  const { result, controlResult } = readFile(filePath);

  const sum = sumOfAllMultiplicationsInMull(result);
  const controlSum = sumOfAllMultiplicationsInMull(controlResult);
  console.log("result: ", sum);
  console.log("controlResult: ", controlSum);
}

runCode();
