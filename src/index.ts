import fs from 'fs/promises';
import path from 'path';
import { compiler, interpreter } from './compiler';

async function main() {
  let args = process.argv.slice(2);

  let run = false;
  if (args.includes('--run')) {
    run = true;
    args = args.filter(arg => arg !== '--run');
  }

  if (!args.length) {
    throw new Error('No input file provided');
  }

  const fileName = args[0]!;
  let input = '';
  try {
    input = await fs.readFile(fileName, 'utf-8');
  } catch (e) {
    console.error(`Unable to access file: ${fileName}`);
    throw e;
  }

  const output = compiler(input);
  if (run) {
    interpreter(output);
  } else {
    const srcFile = path.parse(fileName);
    const destFile = path.join(srcFile.dir, srcFile.name + '.js');
    await fs.writeFile(destFile, output);
  }
}

main();
