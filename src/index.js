import parser from './parser.js';
import comparisonRules from './compression.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const comparison = comparisonRules(file1, file2);
  const result = formatter(comparison, formatName);
  return result;
};

export default genDiff;
