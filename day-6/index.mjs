import fs from "fs";
const hasRepeated = (str) => /(.).*\1/.test(str);

function findMarker(buffer, bufferSize = 4) {
  let count = bufferSize;
  for (let i = 0; i + bufferSize < buffer.length; i++) {
    const group = buffer.slice(i, i + bufferSize);
    if (!hasRepeated(group)) {
      return count;
    } else {
      count++;
    }
  }
}

const startOfPacket = (input) => findMarker(input, 4);
const startOfMessage = (input) => findMarker(input, 14);

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();

const startOfPacketMarker = startOfPacket(input);
const startOfMessageMarker = startOfMessage(input);

console.log({
  startOfPacketMarker,
  startOfMessageMarker,
});
