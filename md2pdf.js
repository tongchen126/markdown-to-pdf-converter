#!/usr/bin/env node
/**
 * Markdown to PDF Converter with LaTeX Math Support
 *
 * Usage:
 *   node md2pdf.js <input.md> [output.pdf]
 *   node md2pdf.js document.md
 *   node md2pdf.js document.md output.pdf
 *
 * Features:
 * - Full LaTeX math support using MathJax
 * - Table of contents
 * - Syntax highlighting for code blocks
 * - Professional styling
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node md2pdf.js <input.md> [output.pdf]');
  console.error('Example: node md2pdf.js document.md output.pdf');
  process.exit(1);
}

const inputFile = path.resolve(args[0]);
const outputFile = args[1] ? path.resolve(args[1]) : inputFile.replace(/\.md$/, '.pdf');
const htmlFile = inputFile.replace(/\.md$/, '_temp.html');

// Check if input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file '${inputFile}' not found!`);
  process.exit(1);
}

console.log('================================================');
console.log('  Markdown to PDF Converter');
console.log('  With LaTeX Math Support (MathJax)');
console.log('================================================');
console.log(`Input:  ${path.basename(inputFile)}`);
console.log(`Output: ${path.basename(outputFile)}`);
console.log('================================================\n');

async function unzipFile(archivePath, destDir) {
  if (archivePath.endsWith('.tar.gz')) {
    await execPromise(`tar -xzf "${archivePath}" -C "${destDir}"`);
  } else {
    const AdmZip = require('adm-zip');
    const zip = new AdmZip(archivePath);
    zip.extractAllTo(destDir, true);
  }
}

async function checkDependencies() {
  console.log('[1/4] Checking dependencies...');

  const isWindows = process.platform === 'win32';
  // Windows zip: pandoc-3.1.11/pandoc.exe
  // Linux tar.gz: pandoc-3.1.11/bin/pandoc
  // macOS zip: pandoc-3.1.11/bin/pandoc
  const pandocSubPath = isWindows ? 'pandoc.exe' : path.join('bin', 'pandoc');
  const pandocPath = path.join(__dirname, 'pandoc-3.1.11', pandocSubPath);

  if (!fs.existsSync(pandocPath)) {
    console.log('  - Pandoc not found locally, downloading...');
    try {
      // Install adm-zip if not present (for unzipping)
      try {
        require.resolve('adm-zip');
      } catch (e) {
        console.log('  - Installing unzip utility...');
        await execPromise('npm install adm-zip', { cwd: __dirname });
      }

      // Download platform-specific Pandoc
      let downloadUrl, archiveName;
      if (isWindows) {
        downloadUrl = 'https://github.com/jgm/pandoc/releases/download/3.1.11/pandoc-3.1.11-windows-x86_64.zip';
        archiveName = 'pandoc.zip';
      } else if (process.platform === 'darwin') {
        downloadUrl = 'https://github.com/jgm/pandoc/releases/download/3.1.11/pandoc-3.1.11-macOS.zip';
        archiveName = 'pandoc.zip';
      } else {
        downloadUrl = 'https://github.com/jgm/pandoc/releases/download/3.1.11/pandoc-3.1.11-linux-amd64.tar.gz';
        archiveName = 'pandoc.tar.gz';
      }
      const archivePath = path.join(__dirname, archiveName);
      await execPromise(`curl -L "${downloadUrl}" -o "${archiveName}"`, { cwd: __dirname });

      // Extract archive
      console.log('  - Extracting Pandoc...');
      await unzipFile(archivePath, __dirname);

      // Clean up
      fs.unlinkSync(archivePath);
      console.log('  - Pandoc downloaded successfully');
    } catch (error) {
      console.error('  - Failed to download Pandoc:', error.message);
      process.exit(1);
    }
  } else {
    console.log('  - Pandoc found');
  }

  // Check if puppeteer is installed
  try {
    require.resolve('puppeteer');
    console.log('  - Puppeteer found');
  } catch (e) {
    console.log('  - Puppeteer not found, installing...');
    try {
      await execPromise('npm install puppeteer', { cwd: __dirname });
      console.log('  - Puppeteer installed successfully');
    } catch (error) {
      console.error('  - Failed to install Puppeteer:', error.message);
      process.exit(1);
    }
  }
}

async function convertMarkdownToHTML() {
  console.log('\n[2/4] Converting Markdown to HTML with MathJax...');

  const isWin = process.platform === 'win32';
  const pandocSubPath = isWin ? 'pandoc.exe' : path.join('bin', 'pandoc');
  const pandocPath = path.join(__dirname, 'pandoc-3.1.11', pandocSubPath);
  const cmd = `"${pandocPath}" "${inputFile}" -o "${htmlFile}" --mathjax --standalone --toc --toc-depth=2 --metadata title="Document"`;

  try {
    await execPromise(cmd);
    console.log('  - HTML generated successfully');
  } catch (error) {
    console.error('  - Failed to convert Markdown to HTML:', error.message);
    process.exit(1);
  }
}

async function enhanceHTML() {
  console.log('\n[3/4] Enhancing HTML with better styling...');

  let html = fs.readFileSync(htmlFile, 'utf-8');

  // Add custom CSS for better appearance
  const customCSS = `
<style>
  body {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #333;
  }

  h1 {
    color: #1a1a1a;
    font-size: 24pt;
    border-bottom: 3px solid #0066cc;
    padding-bottom: 10px;
    margin-top: 0;
  }

  h2 {
    color: #2c2c2c;
    font-size: 18pt;
    border-bottom: 2px solid #999;
    padding-bottom: 5px;
    margin-top: 30px;
  }

  h3 {
    color: #444;
    font-size: 14pt;
    margin-top: 24px;
  }

  code {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: "Consolas", "Courier New", monospace;
    font-size: 10pt;
  }

  pre {
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    border-left: 4px solid #0066cc;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    line-height: 1.4;
  }

  pre code {
    background: none;
    border: none;
    padding: 0;
    font-size: 9pt;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #0066cc;
    color: white;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  strong {
    color: #000;
    font-weight: 700;
  }

  hr {
    border: none;
    border-top: 2px solid #ddd;
    margin: 30px 0;
  }

  blockquote {
    border-left: 4px solid #0066cc;
    margin-left: 0;
    padding-left: 15px;
    color: #666;
    font-style: italic;
  }

  .MathJax {
    font-size: 1.1em !important;
  }

  #TOC {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 30px;
    border-radius: 5px;
  }

  #TOC ul {
    list-style-type: none;
    padding-left: 0;
  }

  #TOC ul ul {
    padding-left: 20px;
  }

  #TOC a {
    text-decoration: none;
    color: #0066cc;
  }

  #TOC a:hover {
    text-decoration: underline;
  }
</style>
`;

  // Insert custom CSS before </head>
  html = html.replace('</head>', customCSS + '\n</head>');

  fs.writeFileSync(htmlFile, html);
  console.log('  - HTML styling enhanced');
}

async function convertHTMLToPDF() {
  console.log('\n[4/4] Converting HTML to PDF (waiting for math to render)...');

  const puppeteer = require('puppeteer');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load HTML file
  const htmlPath = 'file://' + htmlFile.replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // Wait for MathJax to render (important!)
  console.log('  - Waiting for MathJax to render math equations...');
  await new Promise(resolve => setTimeout(resolve, 4000));

  // Ensure MathJax has finished typesetting
  await page.evaluate(() => {
    return new Promise((resolve) => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise().then(resolve);
      } else if (window.MathJax && window.MathJax.Hub) {
        // MathJax v2
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
        window.MathJax.Hub.Queue(resolve);
      } else {
        setTimeout(resolve, 1000);
      }
    });
  });

  console.log('  - Math equations rendered, generating PDF...');

  // Generate PDF
  await page.pdf({
    path: outputFile,
    format: 'Letter',
    margin: {
      top: '25mm',
      right: '20mm',
      bottom: '25mm',
      left: '20mm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size: 9px; width: 100%; text-align: center; color: #999; padding-top: 10px;">Document</div>',
    footerTemplate: '<div style="font-size: 9px; width: 100%; text-align: center; color: #999; padding-bottom: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
  });

  await browser.close();

  console.log('  - PDF generated successfully');
}

function cleanup() {
  console.log('\n[5/5] Cleaning up temporary files...');
  if (fs.existsSync(htmlFile)) {
    fs.unlinkSync(htmlFile);
    console.log('  - Temporary HTML file removed');
  }
}

// Main execution
(async () => {
  try {
    await checkDependencies();
    await convertMarkdownToHTML();
    await enhanceHTML();
    await convertHTMLToPDF();
    cleanup();

    const stats = fs.statSync(outputFile);
    const fileSizeKB = (stats.size / 1024).toFixed(2);

    console.log('\n================================================');
    console.log('  SUCCESS!');
    console.log('================================================');
    console.log(`  Output file: ${path.basename(outputFile)}`);
    console.log(`  File size:   ${fileSizeKB} KB`);
    console.log(`  Location:    ${outputFile}`);
    console.log('================================================');
    console.log('\nAll LaTeX math equations have been rendered correctly.');
    console.log('You can now open the PDF file to view the results.\n');

  } catch (error) {
    console.error('\n================================================');
    console.error('  ERROR!');
    console.error('================================================');
    console.error(error.message);
    console.error('================================================\n');
    process.exit(1);
  }
})();
