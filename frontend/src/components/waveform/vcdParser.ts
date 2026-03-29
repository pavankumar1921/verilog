export function parseVCD(vcdText: string) {
  const lines = vcdText.split("\n");

  const signals: Record<string, string> = {};
  const changes: Record<string, any[]> = {};

  let currentTime = 0;

  for (const line of lines) {
    const l = line.trim();

    if (l.startsWith("$var")) {
      const parts = l.split(" ");
      const symbol = parts[3];
      const name = parts.slice(4).join(" ").replace("$end", "").trim();
      signals[symbol] = name;
      changes[symbol] = [];
    } else if (l.startsWith("#")) {
      currentTime = parseInt(l.substring(1));
    } else if (l.startsWith("b")) {
      const [value, symbol] = l.substring(1).split(" ");
      changes[symbol]?.push({ time: currentTime, value });
    } else if (l.startsWith("0") || l.startsWith("1")) {
      const value = l[0];
      const symbol = l.substring(1);
      changes[symbol]?.push({ time: currentTime, value });
    }
  }

  return { signals, changes };
}
