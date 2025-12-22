import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const iconsDir = join(rootDir, 'public', 'icons');

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

async function generateIcons() {
  console.log('🎨 Generando iconos PWA para Hotel Botánico...\n');

  for (const size of sizes) {
    const svgBuffer = Buffer.from(createSvg(size, 0.15));
    const outputPath = join(iconsDir, `icon-${size}x${size}.png`);

    await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);

    console.log(`✅ icon-${size}x${size}.png`);
  }

  for (const size of maskableSizes) {
    const svgBuffer = Buffer.from(createMaskableSvg(size));
    const outputPath = join(iconsDir, `icon-maskable-${size}x${size}.png`);

    await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);

    console.log(`✅ icon-maskable-${size}x${size}.png`);
  }

  const appleSvg = Buffer.from(createSvg(180, 0.1));
  await sharp(appleSvg).resize(180, 180).png().toFile(join(iconsDir, 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png');

  const favicon32Svg = Buffer.from(createSvg(32, 0.05));
  await sharp(favicon32Svg).resize(32, 32).png().toFile(join(iconsDir, 'favicon-32x32.png'));
  console.log('✅ favicon-32x32.png');

  const favicon16Svg = Buffer.from(createSvg(16, 0.05));
  await sharp(favicon16Svg).resize(16, 16).png().toFile(join(iconsDir, 'favicon-16x16.png'));
  console.log('✅ favicon-16x16.png');

  console.log('\n🎉 ¡Todos los iconos han sido generados exitosamente!');
}

generateIcons().catch(console.error);
