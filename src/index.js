import fs from 'fs';
import _ from 'lodash';
import path from 'node:path';

const resolvePath = (filePath) => (
  filePath.includes('__fixtures__')
    ? path.resolve(process.cwd(), filePath)
    : path.resolve(process.cwd(), `__fixtures__/${filePath}`));

const genDiff = (filepath1, filepath2) => {
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  const data1 = fs.readFileSync(path1);
  const data2 = fs.readFileSync(path2);

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const result = keys.reduce((acc, key) => {
    if(Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        return [...acc, ` - ${key}: ${obj1[key]}`, ` + ${key}: ${obj2[key]}`]
      }
      return [...acc, `   ${key}: ${obj1[key]}`]
    } else if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return [...acc, ` - ${key}: ${obj1[key]}`]
    }
    return [...acc, ` + ${key}: ${obj2[key]}`]
  }, [])
  
  return `{\n${result.join('\n')}\n}`;
};

genDiff('file1.json', 'file2.json');

export default genDiff;
