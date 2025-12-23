import sharp from 'sharp';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// Dimensiones estándar para Open Graph
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOgImage() {
  const inputPath = resolve(projectRoot, 'src/assets/botanico/images/hero-3.avif');
  const outputPath = resolve(projectRoot, 'public/og-image.jpg');

  try {
    await sharp(inputPath)
      .resize(OG_WIDTH, OG_HEIGHT, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(outputPath);
  } catch (error) {
    console.error('❌ Error al generar og-image:', error);
  }
}

async function generateFavicon() {
  const icon96Path = resolve(projectRoot, 'public/icons/icon-96x96.png');
  const outputIcoPath = resolve(projectRoot, 'public/favicon.ico');
  const output48Path = resolve(projectRoot, 'public/icons/favicon-48x48.png');

  try {
    // Generar favicon-48x48.png (mínimo requerido por Google)
    await sharp(icon96Path).resize(48, 48).png().toFile(output48Path);

    // Generar múltiples tamaños para ICO
    const sizes = [16, 32, 48];
    const buffers = await Promise.all(
      sizes.map((size) => sharp(icon96Path).resize(size, size).png().toBuffer())
    );

    // Crear ICO manualmente (formato simple)
    const icoBuffer = createIco(buffers, sizes);
    writeFileSync(outputIcoPath, icoBuffer);
  } catch (error) {
    console.error('❌ Error al generar favicons:', error);
  }
}

// Función para crear archivo ICO
function createIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;

  // ICO header: 6 bytes
  const headerSize = 6;
  // Directory entry: 16 bytes per image
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;

  // Calculate offsets
  let offset = headerSize + dirSize;
  const offsets = [];
  for (const buffer of pngBuffers) {
    offsets.push(offset);
    offset += buffer.length;
  }

  // Total size
  const totalSize = offset;
  const ico = Buffer.alloc(totalSize);

  // Write header
  ico.writeUInt16LE(0, 0); // Reserved
  ico.writeUInt16LE(1, 2); // Type: 1 = ICO
  ico.writeUInt16LE(numImages, 4); // Number of images

  // Write directory entries
  for (let i = 0; i < numImages; i++) {
    const entryOffset = headerSize + i * dirEntrySize;
    const size = sizes[i];
    const buffer = pngBuffers[i];

    ico.writeUInt8(size === 256 ? 0 : size, entryOffset); // Width
    ico.writeUInt8(size === 256 ? 0 : size, entryOffset + 1); // Height
    ico.writeUInt8(0, entryOffset + 2); // Color palette
    ico.writeUInt8(0, entryOffset + 3); // Reserved
    ico.writeUInt16LE(1, entryOffset + 4); // Color planes
    ico.writeUInt16LE(32, entryOffset + 6); // Bits per pixel
    ico.writeUInt32LE(buffer.length, entryOffset + 8); // Size of image data
    ico.writeUInt32LE(offsets[i], entryOffset + 12); // Offset to image data
  }

  // Write image data
  for (let i = 0; i < numImages; i++) {
    pngBuffers[i].copy(ico, offsets[i]);
  }

  return ico;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--favicon') || args.includes('-f')) {
    await generateFavicon();
  } else if (args.includes('--og') || args.includes('-o')) {
    await generateOgImage();
  } else {
    // Por defecto, generar ambos
    await generateOgImage();
    await generateFavicon();
  }
}

main();
