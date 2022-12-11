import fs from "fs";
import { processLine } from "./aux.mjs";

const crates = {
  1: ["B", "W", "N"],
  2: ["L", "Z", "S", "P", "T", "D", "M", "B"],
  3: ["Q", "H", "Z", "W", "R"],
  4: ["W", "D", "V", "J", "Z", "R"],
  5: ["S", "H", "M", "B"],
  6: ["L", "G", "N", "J", "H", "V", "P", "B"],
  7: ["J", "Q", "Z", "F", "H", "D", "L", "S"],
  8: ["W", "S", "F", "J", "G", "Q", "B"],
  9: ["Z", "W", "M", "S", "C", "D", "J"],
};

// deep copy :/
const partOne = JSON.parse(JSON.stringify(crates));
const partTwo = JSON.parse(JSON.stringify(crates));

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).split("\n");
const movements = input.map(processLine);

function executePartOne(command) {
  for (let i = 0; i < command.amount; i++) {
    const val = partOne[command.from].pop();
    partOne[command.to].push(val);
  }
}

console.table(partOne);

movements.map(executePartOne);

console.table(partOne);

console.log(
  "part One:",
  Object.keys(partOne)
    .map((key) => partOne[key].pop())
    .join("")
);

function executePartTwo(command) {
  const val = partTwo[command.from].splice(-Number(command.amount));
  partTwo[command.to].push(...val);
}

console.log(partTwo);
movements.map(executePartTwo);

console.log(partTwo);

console.log(
  "part Two:",
  Object.keys(partTwo)
    .map((key) => partTwo[key].pop())
    .join("")
);
