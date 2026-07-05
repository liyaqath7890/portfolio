const puppeteer = require('puppeteer');
const path = require('path');

const outDir = 'C:\\Users\\liyaq\\.gemini\\antigravity-ide\\brain\\006b493d-7502-462a-b5e3-c14308b3b5c4\\scratch\\screenshots';

const routes = [
  { name: '01_hero', path: '/' },
  { name: '02_about', path: '/about' },
  { name: '03_projects', path: '/projects' },
  { name: '04_skills', path: '/skills' },
  { name: '05_experience', path: '/experience' },
  { name: '06_project_detail', path: '/project/1' },
  { name: '07_blog', path: '/blog' },
  { name: '08_contact', path: '/contact' },
  { name: '09_admin', path: '/admin' }
];

async function capture() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  
  for (const route of routes) {
    try {
      await page.goto(`http://localhost:5173${route.path}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1000)); // allow animations
      await page.screenshot({ path: path.join(outDir, `${route.name}.png`) });
      console.log(`Captured ${route.name}`);
    } catch(e) {
      console.log(`Failed ${route.name}`, e);
    }
  }
  
  await browser.close();
}

capture();
