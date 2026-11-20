// Entry point for the gta6-clipper-01 make.fun bounty.
// The clip itself lives on YouTube; this program just stages the
// VIDEO.json descriptor into the directory the bot reads from.
import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  await mkdir(outDir, { recursive: true });
  await copyFile(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
  console.log(`VIDEO.json copied to ${outDir}`);
} catch (err) {
  console.error("Failed to stage VIDEO.json:", err);
  process.exit(1);
}
