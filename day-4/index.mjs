import fs from "fs";

const pairs = fs.readFileSync("./input.txt", { encoding: "utf-8" }).split("\n");

const mock = ["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"];

const numOfParisWithCompleteOverlap = pairs
  .map((raw) => raw.split(","))
  .map((pair) => pair.map((el) => el.split("-").map(Number)))
  .reduce(
    (acc, curr) => acc + compareRangesOverlapsCompletely(curr[0], curr[1]),
    0
  );

function compareRangesOverlapsCompletely(a, b) {
  const [p, s] = [a, b].sort((a, b) => a[0] - b[0]);

  // s is contained in p
  if (p[0] <= s[0] && p[1] >= s[1]) return true;

  // p is contained in s
  if (p[0] === s[0] && s[1] > p[1]) return true;
  return false;
}

const numOfParisWithOverlap = pairs
  .map((raw) => raw.split(","))
  .map((pair) => pair.map((el) => el.split("-").map(Number)))
  .reduce((acc, curr) => acc + compareRangesHasOverlaps(curr[0], curr[1]), 0);

function compareRangesHasOverlaps(a, b) {
  const [p, s] = [a, b].sort((a, b) => a[0] - b[0]);

  if (s[0] <= p[1]) return true;
  console.log([p, s]);
  return false;
}

console.log(numOfParisWithCompleteOverlap);
console.log(numOfParisWithOverlap);
