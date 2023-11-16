import _ from 'lodash';

const comparisonRules = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));

  return unionKeys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { name: key, value: comparisonRules(file1[key], file2[key]), status: 'object' };
    }
    if (_.has(file1, key) && _.has(file2, key) && file1[key] === file2[key]) {
      return { name: key, value: file1[key], status: 'unchanged' };
    } if (_.has(file1, key) && _.has(file2, key) && file1[key] !== file2[key]) {
      return {
        name: key, value1: file1[key], value2: file2[key], status: 'different values',
      };
    } if (!_.has(file1, key)) {
      return { name: key, value: file2[key], status: 'added' };
    } if (!_.has(file2, key)) {
      return { name: key, value: file1[key], status: 'deleted' };
    }
    throw new Error('Invalid type of comparassion');
  });
};

export default comparisonRules;
