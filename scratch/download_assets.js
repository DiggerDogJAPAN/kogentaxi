import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define download list based on exact URLs from HTML crawl
const assets = [
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/20200912_101220.jpg',
    dest: '../src/assets/images/office.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('会社＆車両-2.jpg'),
    dest: '../src/assets/images/fleet.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/cars.jpg',
    dest: '../src/assets/images/cars.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/ride-share.jpg',
    dest: '../src/assets/images/ride-share.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('運転士募集jpeg.jpg'),
    dest: '../src/assets/images/recruit-driver.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('戸隠-鏡池（夏）.jpg'),
    dest: '../src/assets/images/togakushi.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('笹ヶ峰牧場春.jpg'),
    dest: '../src/assets/images/sasagamine.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('苗名滝夏.jpg'),
    dest: '../src/assets/images/naenataki.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('いもり池_春.jpg'),
    dest: '../src/assets/images/imori.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('黄金の湯紅葉４.jpg'),
    dest: '../src/assets/images/tsubame.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('不動滝.jpg'),
    dest: '../src/assets/images/seki.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('スカイケーブル夏.jpg'),
    dest: '../src/assets/images/sky-cable.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/monkey2.jpg',
    dest: '../src/assets/images/monkey.jpg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/kogentaxi-logo.svg',
    dest: '../src/assets/images/logo.svg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/Kogen-Taxi-Logo-1.svg',
    dest: '../src/assets/images/logo-alt.svg',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('高原駅25年12月〜通常料金.pdf'),
    dest: '../public/documents/standard-fares-2025.pdf',
  },
  {
    url: 'https://myokokogentaxi.com/wp-content/uploads/' + encodeURIComponent('高原駅26年1月〜冬期割増期間料金.pdf'),
    dest: '../public/documents/winter-fares-2026.pdf',
  },
];

async function downloadFile(url, destPath) {
  const absoluteDest = path.resolve(__dirname, destPath);
  const destDir = path.dirname(absoluteDest);

  // Ensure target folder exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  console.log(`Downloading ${url} -> ${destPath}...`);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(absoluteDest, buffer);
    console.log(`Successfully saved ${destPath}`);
  } catch (err) {
    console.error(`Failed to download ${url}:`, err.message);
  }
}

async function run() {
  console.log('Starting assets download...');
  for (const asset of assets) {
    await downloadFile(asset.url, asset.dest);
    // Add small delay to be polite
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.log('All downloads processed!');
}

run();
