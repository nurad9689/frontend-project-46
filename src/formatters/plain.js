const stylizator = (val) => {
  if (typeof val === 'string') {
    return `'${val}'`;
  } if (typeof val === 'object' && val !== null) {
    return '[complex value]';
  } return val;
};

const plain = (tree) => {
  const iter = (node, depth) => node.flatMap((obj) => {
    const fullPath = (depth === '') ? `${obj.name}` : `${depth}.${obj.name}`;
    switch (obj.status) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${stylizator(obj.value)}`;
      case 'deleted':
        return `Property '${fullPath}' was removed`;
      case 'different values':
        return `Property '${fullPath}' was updated. From ${stylizator(obj.value1)} to ${stylizator(obj.value2)}`;
      case 'object':
        return iter(obj.value, fullPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Invalid type of status: ${obj.status}`);
    }
  });
  return iter(tree, '').join('\n');
};

export default plain;
