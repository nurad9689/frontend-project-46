import fs from 'fs';
import path from 'node:path';
import parser from './parser.js';
import comparisonRules from './compression.js';
import formatter from './formatters/index.js';

const resolvePath = (filePath) => (
  filePath.includes('__fixtures__')
    ? path.resolve(process.cwd(), filePath)
    : path.resolve(process.cwd(), `__fixtures__/${filePath}`));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const dataFormat1 = path.extname(filepath1).slice(1);
  const data1 = fs.readFileSync(resolvePath(filepath1));
  const dataFormat2 = path.extname(filepath2).slice(1);
  const data2 = fs.readFileSync(resolvePath(filepath2));

  const file1 = parser(data1, dataFormat1);
  const file2 = parser(data2, dataFormat2);

  const comparison = comparisonRules(file1, file2);
  const result = formatter(comparison, formatName);
  return result;
};

export default genDiff;
