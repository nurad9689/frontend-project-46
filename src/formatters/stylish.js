import _ from 'lodash';

const indent = (depth, spaceCount = 4, leftIndentation = 0) => ' '.repeat(spaceCount * depth - leftIndentation);

const stringify = (node, depth) => {
  if (!_.isObject(node)) {
    return `${node}`;
  }

  const lines = Object
    .entries(node)
    .map(([key, value]) => `${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${indent(depth)}}`,
  ].join('\n');
};

const stylish = (innerTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    const getValue = (value, sign) => `${indent(depth, 4, 2)}${sign} ${node.name}: ${stringify(value, depth)}\n`;
    switch (node.status) {
      case 'added':
        return getValue(node.value, '+');
      case 'deleted':
        return getValue(node.value, '-');
      case 'unchanged':
        return getValue(node.value, ' ');
      case 'different values':
        return `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`;
      case 'object':
        return `${indent(depth, 4, 2)}  ${node.name}: {\n${iter(node.value, depth + 1).join('')}${indent(depth)}}\n`;
      default:
        throw new Error(`Invalid type of status: ${node.status}`);
    }
  });
  return `{\n${iter(innerTree, 1).join('')}}`;
};

export default stylish;
