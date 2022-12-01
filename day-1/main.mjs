import * as readline from "readline";
import fs from "fs";

const elfCaloriesMap = new Map();
let currentElf = 0;
const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

rl.on("line", (line) => {
  if (line) {
    const calories = elfCaloriesMap.get(currentElf) || 0;
    const newTotal = Number(calories) + Number(line);
    elfCaloriesMap.set(currentElf, newTotal);
  } else {
    currentElf++;
  }
});

rl.on("close", () => {
  const sorted = Array.from(elfCaloriesMap.entries()).sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
  });

  const [elf, totalCalories] = sorted[0];
  console.log(`Elf #${elf + 1} has ${totalCalories}`);

  // Total Calories from the Top 3 Elves with most calories

  const top3totalCalories = sorted
    .slice(0, 3)
    .reduce((acc, curr) => (acc += Number(curr[1])), 0);

  console.log(
    `The total Calories from the top #3 Elves is: ${top3totalCalories}`
  );
});
