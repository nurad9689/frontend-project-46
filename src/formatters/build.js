import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js'

const formatter = (tree, style) => {
  const normalize = style.toLowerCase();
  if (normalize === 'stylish') {
    return stylish(tree);
  } if (normalize === 'plain') {
    return plain(tree);
  } if (normalize == 'json') {
    return json(tree);
  }
  throw new Error(`Invalid type format: ${style}`);
};

export default formatter;
