const stingify = (val) => {
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
        return `Property '${fullPath}' was added with value: ${stingify(obj.value)}`;
      case 'deleted':
        return `Property '${fullPath}' was removed`;
      case 'different values':
        return `Property '${fullPath}' was updated. From ${stingify(obj.value1)} to ${stingify(obj.value2)}`;
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
