import * as readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

let totalScore = 0;
let secondTotalScore = 0;
// Total Score is:  17189

rl.on("line", (line) => {
  const plays = line.split(" ");

  const player = decrypt(plays[1]);
  const opponent = decrypt(plays[0]);

  const result = rockPaperScissors(player, opponent);

  const score = points[result] + pointsHand[player];
  totalScore += score;

  // part 2
  const bestPlay = computeBestPlay(opponent, plays[1]);
  const secondResult = rockPaperScissors(bestPlay, opponent);

  const newScore = points[secondResult] + pointsHand[bestPlay];
  secondTotalScore += newScore;
  console.log({ opponent, desired: plays[1], bestPlay, newScore });
});

rl.on("close", () => {
  console.log("Total Score is: ", totalScore);
  console.log("Second Total Score is: ", secondTotalScore);
});

function rockPaperScissors(player, opponent) {
  if (player === opponent) return "DRAW";

  if (gameVictoryMap[player] === opponent) return "WIN";

  return "LOSE";
}

const points = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
};

const gameVictoryMap = {
  ROCK: "SCISSORS",
  PAPER: "ROCK",
  SCISSORS: "PAPER",
};

const pointsHand = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const encryptionMap = {
  ROCK: "X",
  PAPER: "Y",
  SCISSORS: "Z",
};

function decrypt(symbol) {
  if (["A", "X"].includes(symbol)) return "ROCK";
  if (["B", "Y"].includes(symbol)) return "PAPER";
  if (["C", "Z"].includes(symbol)) return "SCISSORS";
}

function encrypt(play) {
  return encryptionMap[play];
}

function swapObject(obj) {
  const swapped = Object.entries(obj).map(([key, value]) => [value, key]);

  return Object.fromEntries(swapped);
}

function computeBestPlay(opponent, desired) {
  if (desired === "Y") return opponent;
  // Wants to Loose
  if (desired === "X") {
    return gameVictoryMap[opponent];
  }
  if (desired === "Z") {
    return swapObject(gameVictoryMap)[opponent];
  }
}
