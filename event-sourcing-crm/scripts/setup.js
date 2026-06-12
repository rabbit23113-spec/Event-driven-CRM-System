const fs = require('fs');
const path = require('path');

function copyIfMissing(from, to) {
  if (!fs.existsSync(to)) {
    fs.copyFileSync(from, to);
    console.log(`Created: ${to}`);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist'].includes(entry.name)) continue;
      walk(fullPath);
      continue;
    }

    if (entry.name === 'constants.example.ts') {
      const target = fullPath.replace('.example.ts', '.ts');
      copyIfMissing(fullPath, target);
    }
  }
}

const rootEnvExample = path.join(process.cwd(), '.env.example');
const rootEnv = path.join(process.cwd(), '.env');

if (fs.existsSync(rootEnvExample)) {
  copyIfMissing(rootEnvExample, rootEnv);
}

walk(process.cwd());
