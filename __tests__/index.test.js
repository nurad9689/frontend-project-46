import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { describe, test } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const cases = [
  ['json', 'json'],
  ['json', 'yml'],
  ['yml', 'json'],
  ['yml', 'yml'],
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe.each(cases)('"%s" and "%s" extentions:', (extent1, extent2) => {
  test('Stylish (default)', () => {
    const resultPath = getFixturePath('Stylish.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    const path1 = getFixturePath(`file1.${extent1}`);
    const path2 = getFixturePath(`file2.${extent2}`);
    expect(genDiff(path1, path2)).toEqual(result);
  });

  test('Plain', () => {
    const resultPath = getFixturePath('Plain.txt');
    const result = fs.readFileSync(resultPath, 'utf-8');
    const path1 = getFixturePath(`file1.${extent1}`);
    const path2 = getFixturePath(`file2.${extent2}`);
    expect(genDiff(path1, path2, 'plain')).toEqual(result);
  });
});
