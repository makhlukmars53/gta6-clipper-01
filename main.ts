// Entry point for the gta6-clipper-01 make.fun bounty.
// The clip itself lives on YouTube; this program just stages the
// VIDEO.json descriptor into the directory the bot reads from.
// Before staging, it validates that VIDEO.json parses as JSON and
// carries a `url` string, so a broken descriptor fails loudly here
// instead of reaching the bot unchecked.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const descriptorPath = join(botDir, "VIDEO.json");

try {
  const raw = await readFile(descriptorPath, "utf8");
  let descriptor: unknown;
  try {
    descriptor = JSON.parse(raw);
  } catch {
    throw new Error(`VIDEO.json is not valid JSON: ${descriptorPath}`);
  }
  if (
    typeof descriptor !== "object" ||
    descriptor === null ||
    typeof (descriptor as { url?: unknown }).url !== "string" ||
    (descriptor as { url: string }).url.length === 0
  ) {
    throw new Error(`VIDEO.json carries no usable "url" string: ${descriptorPath}`);
  }
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "VIDEO.json"), raw);
  console.log(`VIDEO.json staged to ${outDir}`);
} catch (err) {
  console.error("Failed to stage VIDEO.json:", err);
  process.exit(1);
}
