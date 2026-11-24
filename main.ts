import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The word my ex would use to describe me.
// Unread — not a person who left, a message that was never opened:
// the notification that sat there for three days, seen and unanswered.
const ENTRY = "Unread";

const MAX_CHARS = 24;

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`,
    );
  }
  if (/\s/.test(ENTRY)) {
    throw new Error("entry must be a single word (no whitespace)");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and verify what landed on disk is exactly the entry.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error(`read-back mismatch: ${outPath} differs from entry`);
  }
  console.log(ENTRY);
}

main();
