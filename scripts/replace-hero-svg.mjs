import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
const chartPath = path.join(root, "assets", "svg", "hero-usage-chart.svg");

let html = fs.readFileSync(indexPath, "utf8");
const chart = fs.readFileSync(chartPath, "utf8");
const indent = "                                                                        ";
const lines = chart.split("\n").map((l) => indent + l).join("\n");

const re = /(<div class="hero-ubb-visual" role="img"\s+aria-label="[^"]*">)\s*<svg[\s\S]*?<\/svg>/;
if (!re.test(html)) {
  console.error("Pattern not found");
  process.exit(1);
}
html = html.replace(re, `$1\n${lines}\n`);
fs.writeFileSync(indexPath, html);
console.log("Hero SVG restored from", path.basename(chartPath));
