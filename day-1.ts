import fs from "fs";

function readFile(filePath: string) {
  try {
    const leftArray: number[] = [];
    const rightArray: number[] = [];

    const data = fs.readFileSync(filePath, "utf8");

    data.split("\n").forEach((line) => {
      if (line.trim()) {
        const [left, right] = line.split(/\s+/).map(Number);
        if (!isNaN(left) && !isNaN(right)) {
          leftArray.push(left);
          rightArray.push(right);
        }
      }
    });

    console.log("Left Array:", leftArray);
    console.log("Right Array:", rightArray);
    return { leftArray, rightArray };
  } catch (error: any) {
    console.error(`Error reading file: ${error.message}`);
    return { leftArray: [], rightArray: [] };
  }
}

function sortArray(arr: number[]): number[] {
  return arr.slice().sort((a, b) => a - b);
}

function calculateTotalDistance(
  leftArray: number[],
  rightArray: number[]
): number {
  const totalDistance = leftArray.reduce((sum, left, i) => {
    const right = rightArray[i];
    return sum + Math.abs(left - right);
  }, 0);

  console.log("Total Distance:", totalDistance);
  return totalDistance;
}

function calculateSimilarityScore(leftArray: number[], rightArray: number[]) {
  let similarityScore = 0;
  const count: Record<number, number> = {};

  for (const num of leftArray) {
    count[num] = 0;
  }

  for (const num2 of rightArray) {
    if (count[num2] !== undefined) {
      count[num2] += 1;
    }
  }

  for (const num of leftArray) {
    similarityScore += num * count[num];
  }

  console.log("Similarity Score:", similarityScore);
  return similarityScore;
}

async function runCode() {
  const filePath = "day-1.txt";

  const { leftArray, rightArray } = readFile(filePath);

  if (!leftArray.length || !rightArray.length) {
    console.error("Error: No valid data found in the file.");
    return;
  }

  const sortedLeftArray = sortArray(leftArray);
  const sortedRightArray = sortArray(rightArray);

  const totalDistance = calculateTotalDistance(
    sortedLeftArray,
    sortedRightArray
  );

  const similarityScore = calculateSimilarityScore(
    sortedLeftArray,
    sortedRightArray
  );

  return `the total distance is ${totalDistance} and the similarity score is ${similarityScore}`;
}

runCode();
