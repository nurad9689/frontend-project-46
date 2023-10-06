import fs from 'fs';
import _ from 'lodash';
import path from 'node:path';

const resolvePath = (filePath) => (
  filePath.includes('__fixtures__')
    ? path.resolve(process.cwd(), filePath)
    : path.resolve(process.cwd(), `__fixtures__/${filePath}`));

const getParsedObj = (filePath) => {
  const pathname = resolvePath(filePath);
  const data = fs.readFileSync(pathname);
  return JSON.parse(data);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = getParsedObj(filepath1);
  const obj2 = getParsedObj(filepath2);

  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const result = keys.reduce((acc, key) => {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        return [...acc, `  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
      }
      return [...acc, `    ${key}: ${obj1[key]}`];
    }

    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    return [...acc, `  + ${key}: ${obj2[key]}`];
  }, []);

  return `{\n${result.join('\n')}\n}`;
};

genDiff('file1.json', 'file2.json');

export default genDiff;
