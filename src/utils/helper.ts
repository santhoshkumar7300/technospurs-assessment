export const presence = (
  str: string | null | undefined,
  symbol: string = "N/A"
): string => {
  if (!str || !str?.trim()) {
    return symbol;
  }
  return str ? str : symbol ? symbol : "N/A";
};

export function generateUniqueString(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random()
    .toString(36)
    .slice(2, 20 - timestamp.length);
  const combined = timestamp + randomPart;

  const obfuscated = combined
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + 2))
    .reverse()
    .join("");

  return obfuscated.slice(0, 20);
}
