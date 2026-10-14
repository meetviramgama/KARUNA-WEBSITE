const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHash(content) {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

function minifyCss(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace & linebreaks
    .replace(/\r?\n/g, '')
    .replace(/\s+/g, ' ')
    // Remove space around delimiters
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons before closing brace
    .replace(/;}/g, '}')
    // Clean space around parenthesis where safe
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim();
}

function build() {
  const rootDir = __dirname;

  // 1. Source files
  const cssSource = path.join(rootDir, 'style.css');
  const jsSource = path.join(rootDir, 'script.js');

  if (!fs.existsSync(cssSource)) {
    console.error(`Error: ${cssSource} does not exist`);
    process.exit(1);
  }
  if (!fs.existsSync(jsSource)) {
    console.error(`Error: ${jsSource} does not exist`);
    process.exit(1);
  }

  // 2. Minify CSS
  const rawCss = fs.readFileSync(cssSource, 'utf8');
  const minifiedCss = minifyCss(rawCss);
  const minCssPath = path.join(rootDir, 'style.min.css');
  fs.writeFileSync(minCssPath, minifiedCss, 'utf8');
  console.log(`Minified CSS: ${rawCss.length} B -> ${minifiedCss.length} B (-${((1 - minifiedCss.length / rawCss.length) * 100).toFixed(1)}%)`);

  // 3. Hashes
  const cssHash = getHash(minifiedCss);
  const jsHash = getHash(fs.readFileSync(jsSource));

  const versionedCssName = `style.min.${cssHash}.css`;
  const versionedJsName = `script.${jsHash}.js`;

  console.log('Building versioned static assets...');
  console.log(`CSS: style.css -> ${versionedCssName}`);
  console.log(`JS: script.js -> ${versionedJsName}`);

  // 4. Clean up old hashed assets in root
  const files = fs.readdirSync(rootDir);
  files.forEach(f => {
    if (f.match(/^(?:style|style-2)(?:\.min)?\.[a-f0-9]{8}\.css$/) && f !== versionedCssName) {
      fs.unlinkSync(path.join(rootDir, f));
      console.log(`Removed previous hashed asset: ${f}`);
    }
    if (f.match(/^script\.[a-f0-9]{8}\.js$/) && f !== versionedJsName) {
      fs.unlinkSync(path.join(rootDir, f));
      console.log(`Removed previous hashed asset: ${f}`);
    }
  });

  // 5. Write versioned content-hashed files
  fs.writeFileSync(path.join(rootDir, versionedCssName), minifiedCss, 'utf8');
  fs.copyFileSync(jsSource, path.join(rootDir, versionedJsName));

  // 6. Update index.html references
  const htmlPath = path.join(rootDir, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Replace CSS link
  html = html.replace(
    /<link\s+rel="stylesheet"\s+href="[^"]*style[^"]*\.css">/i,
    `<link rel="stylesheet" href="${versionedCssName}">`
  );

  // Replace script tag
  html = html.replace(
    /<script\s+src="script(?:\s+\(1\))?(?:\.[a-f0-9]{8})?\.js"><\/script>/i,
    `<script src="${versionedJsName}"></script>`
  );

  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Updated index.html asset references.');

  // 7. Sync to karuna-deploy
  const deployDir = path.join(rootDir, 'karuna-deploy');
  if (fs.existsSync(deployDir)) {
    const deployFiles = fs.readdirSync(deployDir);
    deployFiles.forEach(f => {
      if (f.match(/^(?:style|style-2)(?:\.min)?\.[a-f0-9]{8}\.css$/) && f !== versionedCssName) {
        fs.unlinkSync(path.join(deployDir, f));
        console.log(`Removed previous hashed asset from karuna-deploy: ${f}`);
      }
      if (f.match(/^script\.[a-f0-9]{8}\.js$/) && f !== versionedJsName) {
        fs.unlinkSync(path.join(deployDir, f));
        console.log(`Removed previous hashed asset from karuna-deploy: ${f}`);
      }
    });

    fs.writeFileSync(path.join(deployDir, versionedCssName), minifiedCss, 'utf8');
    fs.copyFileSync(path.join(rootDir, versionedJsName), path.join(deployDir, versionedJsName));
    fs.copyFileSync(htmlPath, path.join(deployDir, 'index.html'));
    console.log('Synced versioned assets to karuna-deploy directory.');
  }

  console.log('Build completed successfully!');
}

build();
