import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const schemaDir = path.join(repoRoot, 'prisma', 'schema');
const outputFile = path.join(repoRoot, 'prisma', 'schema.prisma');

const files = readdirSync(schemaDir)
  .filter((file) => file.endsWith('.prisma'))
  .sort()
  .map((file) => path.join(schemaDir, file));

const combined = files
  .map((file) => readFileSync(file, 'utf8').trim())
  .filter(Boolean)
  .join('\n\n');

writeFileSync(outputFile, `${combined}\n`, 'utf8');
console.log(`Merged ${files.length} Prisma schema files into ${path.relative(repoRoot, outputFile)}`);
