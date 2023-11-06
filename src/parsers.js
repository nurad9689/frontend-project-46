import path from 'node:path';
import yaml from 'js-yaml';
import fs from 'fs';

const resolvePath = (filePath) => (
  filePath.includes('__fixtures__')
    ? path.resolve(process.cwd(), filePath)
    : path.resolve(process.cwd(), `__fixtures__/${filePath}`));

const parser = (filepath) => {
  const extention = path.extname(filepath);
  const pathname = resolvePath(filepath);
  const data = fs.readFileSync(pathname);

  if (extention === '.yaml' || extention === '.yml') {
    return yaml.load(data);
  }
  if (extention === '.json') {
    return JSON.parse(data);
  }
  throw new Error(`${extention} is invalid file type`);
};

export default parser;
