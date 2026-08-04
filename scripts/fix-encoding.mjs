/**
 * Repairs mojibake introduced by a PowerShell read/write round-trip.
 *
 * Get-Content read the UTF-8 bytes as Latin-1 and Set-Content wrote them back
 * out as UTF-8, so "—" became "â€”". Reversing that (encode as Latin-1, decode
 * as UTF-8) restores the original characters.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const files = globSync('src/**/*.{ts,tsx}');
let fixed = 0;

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  if (!raw.includes('â€') && !raw.includes('â†')) continue;

  const repaired = Buffer.from(raw, 'latin1').toString('utf8');
  // Strip any BOM the round-trip added.
  writeFileSync(file, repaired.replace(/^﻿/, ''), 'utf8');
  console.log(`  fixed ${file}`);
  fixed += 1;
}

console.log(fixed ? `\nRepaired ${fixed} file(s).` : 'Nothing to repair.');
