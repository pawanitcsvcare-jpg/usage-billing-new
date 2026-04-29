/**
 * Replace Owl hero carousel with static banner-hero-static (no .slide).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const p = path.join(root, "index.html");

let lines = fs.readFileSync(p, "utf8").split(/\r?\n/);

let startIdx = lines.findIndex((l) => l.includes("single-item-carousel"));
if (startIdx === -1) {
  console.error("No single-item-carousel — hero may already be static.");
  process.exit(0);
}
if (startIdx > 0 && lines[startIdx - 1].trim() === "<div") {
  startIdx--;
}

const commentIdx = lines.findIndex((l) => l.includes("<!-- End Banner Section -->"));
if (commentIdx < 0) {
  console.error("Missing <!-- End Banner Section --> marker.");
  process.exit(1);
}
const endIdx = commentIdx - 2;

const newBlock = [
  '                                            <div class="banner-hero-static">',
  '                                                <div class="auto-container">',
  '                                                    <div class="row clearfix active">',
  '                                                        <!-- Content Column -->',
  '                                                        <div class="content-column col-lg-6 col-md-12 col-sm-12">',
  '                                                            <div class="inner-column">',
  '                                                                <div class="title"><span>Usage-based billing platform</span></div>',
  '                                                                <h1>Simple <span>usage-based billing</span><br> platform for modern revenue teams</h1>',
  '                                                                <div class="text">Meter every event, rate plans your way, and send accurate invoices—<br>so finance, product, and sales share one source of truth from signup to renewal.</div>',
  '                                                                <div class="options-box d-flex align-items-center flex-wrap">',
  '                                                                    <a href="#" class="theme-btn btn-style-four">',
  '                                                                        <span class="btn-wrap">',
  '                                                                            <span class="text-one">View Pricing</span>',
  '                                                                            <span class="text-two">View Pricing</span>',
  '                                                                        </span>',
  '                                                                        <span class="arrow flaticon-035-right-arrow"></span>',
  '                                                                    </a>',
  '                                                                    <a class="demo" href="#">Schedule a demo</a>',
  "                                                                </div>",
  '                                                                <div class="discount">Telgoo5 Usage Billing — flexible meters, clean invoices, fewer surprises.</div>',
  "                                                            </div>",
  "                                                        </div>",
  '                                                        <!-- Image Column -->',
  '                                                        <div class="image-column col-lg-6 col-md-12 col-sm-12">',
  '                                                            <div class="circle-layer" style="background-image: url(assets/images/2022/11/pattern-8.png)"></div>',
  '                                                            <div class="inner-column parallax-scene-1">',
  '                                                                <div class="image" data-depth="0.20">',
  '                                                                    <img decoding="async" src="assets/images/2023/01/illustration.svg" alt="Usage billing illustration">',
  "                                                                </div>",
  "                                                            </div>",
  "                                                        </div>",
  "                                                    </div>",
  "                                                </div>",
  "                                            </div>",
];

const out = lines.slice(0, startIdx).concat(newBlock).concat(lines.slice(endIdx + 1));
fs.writeFileSync(p, out.join("\n"), "utf8");
console.log("Hero flattened (no slide): replaced lines", startIdx + 1, "-", endIdx + 1);
