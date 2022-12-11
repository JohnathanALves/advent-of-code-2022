export function processLine(line) {
  const command = line.trim().split(" ");

  const amount = command[1];
  const from = command[3];
  const to = command[5];

  return {
    amount,
    from,
    to,
  };
}
