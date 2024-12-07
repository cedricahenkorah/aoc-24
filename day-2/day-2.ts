import fs from "fs";

function readFile(filePath: string): number[][] {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    const reports = data
      .trim()
      .split("\n")
      .map((line) => line.split(" ").map(Number));

    return reports;
  } catch (error: any) {
    console.error(`Error reading file: ${error.message}`);
    return [];
  }
}

const checkIfReportsMatchConditions = (reports: number[][]) => {
  const safeReports: number[][] = [];
  const unsafeReports: number[][] = [];

  reports.forEach((report) => {
    let isIncreasing: boolean;
    let isDecreasing: boolean;

    isIncreasing = report.every(
      (num, i) =>
        i === 0 ||
        (num >= report[i - 1] &&
          num - report[i - 1] >= 1 &&
          num - report[i - 1] <= 3)
    );

    isDecreasing = report.every(
      (num, i) =>
        i === 0 ||
        (num <= report[i - 1] &&
          report[i - 1] - num >= 1 &&
          report[i - 1] - num <= 3)
    );

    if (isIncreasing || isDecreasing) {
      safeReports.push(report);
    } else {
      unsafeReports.push(report);
    }
  });

  return { safeReports, unsafeReports };
};

function checkSafeReports(reports: number[][]) {
  let numberOfSafeReports = 0;

  // check if the elements in each report are increasing or decreasing and match the conditions ( >= 1 && <= 3)
  const { safeReports } = checkIfReportsMatchConditions(reports);

  numberOfSafeReports = safeReports.length;

  return numberOfSafeReports;
}

function checkSafeReportsWithOneLevelRemoved(
  reports: number[][],
  numberOfSafeReports: number
) {
  let finalSafeReports = numberOfSafeReports;

  const { unsafeReports } = checkIfReportsMatchConditions(reports);

  unsafeReports.forEach((report) => {
    for (let i = 0; i < report.length; i++) {
      // Create a new report by removing the i-th element
      const filteredReport = [...report.slice(0, i), ...report.slice(i + 1)];

      const { safeReports } = checkIfReportsMatchConditions([filteredReport]);

      if (safeReports.length > 0) {
        finalSafeReports++;
        break;
      }
    }
  });

  return finalSafeReports;
}

function runCode() {
  const filePath = "day-2.txt";

  const reports = readFile(filePath);

  const safeReports = checkSafeReports(reports);
  console.log("safeReports: ", safeReports);

  const safeReportsWithOneLevelRemoved = checkSafeReportsWithOneLevelRemoved(
    reports,
    safeReports
  );
  console.log(
    "safeReportsWithOneLevelRemoved: ",
    safeReportsWithOneLevelRemoved
  );
}

runCode();
