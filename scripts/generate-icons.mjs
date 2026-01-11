import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const iconsDir = join(rootDir, 'public', 'icons');
const publicDir = join(rootDir, 'public');

if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const backgroundColor = '#EBE2DB';
const leafColor = '#526952';

const createSvg = (size, padding = 0.2) => {
  const actualSize = Math.round(size * (1 - padding * 2));
  const offset = Math.round(size * padding);

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="${backgroundColor}"/>
    <g transform="translate(${offset}, ${offset})">
      <svg width="${actualSize}" height="${actualSize}" viewBox="0 0 40 40" fill="none">
        <!-- Left leaf -->
        <path fill="${leafColor}" fill-opacity="0.85" d="M15 20C15 14 11 9 6 9C6 9 6 13 6 17C6 23 10 28 15 28C15 28 15 24 15 20Z" />
        <!-- Right leaf -->
        <path fill="${leafColor}" fill-opacity="0.85" d="M25 20C25 14 29 9 34 9C34 9 34 13 34 17C34 23 30 28 25 28C25 28 25 24 25 20Z" />
        <!-- Stem -->
        <line stroke="${leafColor}" x1="20" y1="10" x2="20" y2="30" stroke-width="2.5" stroke-linecap="round" />
        <!-- Small leaves on stem -->
        <line stroke="${leafColor}" stroke-opacity="0.7" x1="20" y1="16" x2="16" y2="14" stroke-width="1.5" stroke-linecap="round" />
        <line stroke="${leafColor}" stroke-opacity="0.7" x1="20" y1="16" x2="24" y2="14" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </g>
  </svg>`;
};

const createMaskableSvg = (size) => {
  const actualSize = Math.round(size * 0.6);
  const offset = Math.round(size * 0.2);

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="${backgroundColor}"/>
    <g transform="translate(${offset}, ${offset})">
      <svg width="${actualSize}" height="${actualSize}" viewBox="0 0 40 40" fill="none">
        <!-- Left leaf -->
        <path fill="${leafColor}" fill-opacity="0.85" d="M15 20C15 14 11 9 6 9C6 9 6 13 6 17C6 23 10 28 15 28C15 28 15 24 15 20Z" />
        <!-- Right leaf -->
        <path fill="${leafColor}" fill-opacity="0.85" d="M25 20C25 14 29 9 34 9C34 9 34 13 34 17C34 23 30 28 25 28C25 28 25 24 25 20Z" />
        <!-- Stem -->
        <line stroke="${leafColor}" x1="20" y1="10" x2="20" y2="30" stroke-width="2.5" stroke-linecap="round" />
        <!-- Small leaves on stem -->
        <line stroke="${leafColor}" stroke-opacity="0.7" x1="20" y1="16" x2="16" y2="14" stroke-width="1.5" stroke-linecap="round" />
        <line stroke="${leafColor}" stroke-opacity="0.7" x1="20" y1="16" x2="24" y2="14" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </g>
  </svg>`;
};

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const maskableSizes = [192, 512];

function createIcoBuffer(pngBuffers) {
  const numImages = pngBuffers.length;

  const headerSize = 6;

  const directorySize = 16 * numImages;

  let currentOffset = headerSize + directorySize;
  const offsets = [];
  for (const png of pngBuffers) {
    offsets.push(currentOffset);
    currentOffset += png.data.length;
  }

  const totalSize = currentOffset;
  const icoBuffer = Buffer.alloc(totalSize);

  icoBuffer.writeUInt16LE(0, 0);
  icoBuffer.writeUInt16LE(1, 2);
  icoBuffer.writeUInt16LE(numImages, 4);

  for (let i = 0; i < numImages; i++) {
    const entry = pngBuffers[i];
    const entryOffset = headerSize + i * 16;

    icoBuffer.writeUInt8(entry.width >= 256 ? 0 : entry.width, entryOffset);

    icoBuffer.writeUInt8(entry.height >= 256 ? 0 : entry.height, entryOffset + 1);

    icoBuffer.writeUInt8(0, entryOffset + 2);

    icoBuffer.writeUInt8(0, entryOffset + 3);

    icoBuffer.writeUInt16LE(1, entryOffset + 4);

    icoBuffer.writeUInt16LE(32, entryOffset + 6);

    icoBuffer.writeUInt32LE(entry.data.length, entryOffset + 8);

    icoBuffer.writeUInt32LE(offsets[i], entryOffset + 12);
  }

  for (let i = 0; i < numImages; i++) {
    pngBuffers[i].data.copy(icoBuffer, offsets[i]);
  }

  return icoBuffer;
}

async function generateIcons() {
  console.log('Generando iconos PWA...');

  for (const size of sizes) {
    const svgBuffer = Buffer.from(createSvg(size, 0.15));
    const outputPath = join(iconsDir, `icon-${size}x${size}.png`);

    await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);
    console.log(`  ✓ icon-${size}x${size}.png`);
  }

  for (const size of maskableSizes) {
    const svgBuffer = Buffer.from(createMaskableSvg(size));
    const outputPath = join(iconsDir, `icon-maskable-${size}x${size}.png`);

    await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);
    console.log(`  ✓ icon-maskable-${size}x${size}.png`);
  }

  const appleSvg = Buffer.from(createSvg(180, 0.1));
  await sharp(appleSvg).resize(180, 180).png().toFile(join(iconsDir, 'apple-touch-icon.png'));
  console.log('  ✓ apple-touch-icon.png');

  const faviconSizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of faviconSizes) {
    const svgBuffer = Buffer.from(createSvg(size, 0.05));
    const pngBuffer = await sharp(svgBuffer).resize(size, size).png().toBuffer();

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(iconsDir, `favicon-${size}x${size}.png`));
    console.log(`  ✓ favicon-${size}x${size}.png`);

    pngBuffers.push({ width: size, height: size, data: pngBuffer });
  }

  const icoBuffer = createIcoBuffer(pngBuffers);
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('  ✓ favicon.ico (16x16, 32x32, 48x48)');

  console.log('\n✅ Todos los iconos generados correctamente');
}

generateIcons().catch(console.error);
