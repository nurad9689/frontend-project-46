import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);

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

export default genDiff;
