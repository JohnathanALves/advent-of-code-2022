import fs from "fs";

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).split("\n");

const partOne = input
  .map((rucksack) => {
    const items = rucksack.split("");
    const firstCompartment = items.slice(0, items.length / 2);
    for (let j = items.length / 2; j < items.length; j++) {
      if (firstCompartment.includes(items[j])) {
        return charCodeToPriority(rucksack.charCodeAt(j));
      }
    }
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(partOne);

// assemble groups
const groups = [];
while (input.length) {
  groups.push(input.splice(0, 3));
}

const partTwo = groups
  .map((group) => {
    const sorted = group.sort((a, b) => {
      if (a.length > b.length) return 1;
      if (b.length > a.length) return -1;
    });
    const biggest = sorted[2];
    const searchGroup = sorted.slice(0, 2);
    for (let i = 0; i < biggest.length; i++) {
      const badge = biggest[i];
      if (searchGroup.map((sack) => sack.includes(badge)).every(Boolean)) {
        return badge.charCodeAt();
      }
    }
  })
  .map(charCodeToPriority)
  .reduce((acc, curr) => acc + curr, 0);

console.log(partTwo);

function charCodeToPriority(charCode) {
  if (charCode >= 97) return charCode - 96;
  if (charCode >= 65) return charCode - 38;
}
