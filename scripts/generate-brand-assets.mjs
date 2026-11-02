import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { create } from "fontkit";
import sharp from "sharp";
import wawoff2 from "wawoff2";
import { SITE } from "../src/lib/site.ts";

const publicDirectory = new URL("../public/", import.meta.url);
const monogram = await readFile(new URL("brand/monogram-white.svg", publicDirectory));
const fontSource = await readFile(
  new URL("../src/assets/manrope-latin-wght-normal.woff2", import.meta.url),
);
// Fontkit's variable-font clone needs SFNT tables rather than a WOFF2 stream.
const font = create(Buffer.from(await wawoff2.decompress(fontSource)));

if (!font.variationAxes?.wght || typeof font.getVariation !== "function") {
  throw new Error("The brand assets require the bundled variable Manrope font.");
}

function vectorText(text, { x, baseline, size, weight = 400, fill = "#242424" }) {
  const face = font.getVariation({ wght: weight });
  const run = face.layout(text);
  const scale = size / face.unitsPerEm;
  let cursor = x;
  const paths = run.glyphs.map((glyph, index) => {
    if (glyph.id === 0) {
      throw new Error(`The bundled font cannot render the share-preview text: ${text}`);
    }
    const position = run.positions[index];
    const transform = `translate(${cursor + position.xOffset * scale} ${baseline - position.yOffset * scale}) scale(${scale} ${-scale})`;
    cursor += position.xAdvance * scale;
    return `<path d="${glyph.path.toSVG()}" transform="${transform}" fill="${fill}"/>`;
  });
  if (cursor > 1120) {
    throw new Error(`Share-preview text exceeds the safe right margin: ${text}`);
  }
  return { svg: paths.join(""), end: cursor };
}

async function iconPng(size) {
  const mark = await sharp(monogram, { density: 288 })
    .resize(size, size)
    .png()
    .toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: SITE.iconBackground,
    },
  })
    .composite([{ input: mark }])
    .png()
    .toBuffer();
}

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, buffer }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += buffer.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map(({ buffer }) => buffer)]);
}

await mkdir(publicDirectory, { recursive: true });
const [small, favicon, touch, shareIcon] = await Promise.all(
  [16, 32, 180, 144].map(iconPng),
);

const wordmarkStart = vectorText("sargam", {
  x: 266, baseline: 156, size: 34, weight: 700,
});
const dot = vectorText(".", {
  x: wordmarkStart.end, baseline: 156, size: 34, weight: 700, fill: SITE.iconBackground,
});
const wordmarkEnd = vectorText("design", {
  x: dot.end, baseline: 156, size: 34, weight: 700,
});
const heading = vectorText(SITE.heading, {
  x: 88, baseline: 355, size: 76, weight: 650,
});
const description = vectorText(SITE.description, {
  x: 91, baseline: 425, size: 32, fill: "#666666",
});
const shareSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#FFFFFF"/>
${wordmarkStart.svg}${dot.svg}${wordmarkEnd.svg}${heading.svg}${description.svg}
</svg>`;
const roundedMask = Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="144" height="144"><rect width="144" height="144" rx="36" fill="white"/></svg>',
);
const roundedShareIcon = await sharp(shareIcon)
  .composite([{ input: roundedMask, blend: "dest-in" }])
  .png()
  .toBuffer();
const share = await sharp(Buffer.from(shareSvg))
  .composite([{ input: roundedShareIcon, left: 88, top: 68 }])
  .png()
  .toBuffer();

await Promise.all([
  writeFile(new URL("favicon.ico", publicDirectory), ico([
    { size: 16, buffer: small },
    { size: 32, buffer: favicon },
  ])),
  writeFile(new URL("favicon-32.png", publicDirectory), favicon),
  writeFile(new URL("apple-touch-icon.png", publicDirectory), touch),
  writeFile(new URL("social-preview.png", publicDirectory), share),
]);

console.log(`Generated brand icons and share preview in ${fileURLToPath(publicDirectory)}`);
