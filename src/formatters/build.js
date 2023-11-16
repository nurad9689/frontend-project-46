import stylish from './stylish.js';

const formatter = (tree, style) => {
  const normalize = style.toLowerCase();
  if (normalize === 'stylish') {
    return stylish(tree);
  }
  throw new Error(`Invalid type format: ${style}`);
};

export default formatter;
