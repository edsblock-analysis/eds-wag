#!/usr/bin/env node
/* Orchestrator: run the whole non-interactive pipeline in one command.
   Usage: node tools/site-analysis/run-analysis.js --urls <file> [--out <dir>] [--slug <name>]
   Steps 1-4 run automatically. Interactive Playwright verification (writing
   data/observed-behaviors.json) is a separate agent-driven step — see SKILL.md.
   Re-run step 4 after adding observed-behaviors.json to fold it into the reports. */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const args = L.parseArgs(process.argv);
const here = __dirname;

// Ensure cheerio is available for the toolkit
try { require('cheerio'); }
catch (e) {
  try { require(path.join(here, 'node_modules', 'cheerio')); }
  catch (e2) {
    console.error('[run-analysis] installing cheerio into tools/site-analysis…');
    execFileSync('npm', ['install', '--no-save', 'cheerio@1'], { cwd: here, stdio: 'inherit' });
  }
}

const common = ['--urls', args.urls, '--out', args.out, '--slug', args.slug];
for (const step of ['1-fetch-extract.js', '2-aggregate.js', '3-build-catalog.js', '4-generate.js']) {
  console.error(`\n=== ${step} ===`);
  execFileSync('node', [path.join(here, step), ...common], { stdio: 'inherit' });
}
console.error(`\n[run-analysis] complete → ${args.out}`);
console.error(`  Dashboard : ${path.join(args.out, 'dashboard.html')}`);
console.error(`  Reports   : ${path.join(args.out, 'reports', 'index.html')}`);
console.error(`  Estimate  : ${path.join(args.out, 'estimates.html')}`);
console.error(`\nNext (agent): run Playwright verification, write ${path.join(args.out, 'data', 'observed-behaviors.json')},`);
console.error(`complete any needsReview blocks in ${path.join(args.out, 'data', 'block-catalog.json')}, then re-run 4-generate.js.`);
