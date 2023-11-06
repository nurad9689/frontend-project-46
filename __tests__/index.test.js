import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('1st test', () => {
  const extentions = ['json', 'yml'];
  extentions.forEach((extention1) => extentions.forEach((extention2) => {
    const path1 = getFixturePath(`file1.${extention1}`);
    const path2 = getFixturePath(`file2.${extention2}`);
    expect(genDiff(path1, path2)).toEqual(result);
  }));
});
