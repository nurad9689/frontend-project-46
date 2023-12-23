import yaml from 'js-yaml';

const parser = (data, dataFormat) => {
  if (dataFormat === 'yaml' || dataFormat === 'yml') {
    return yaml.load(data);
  }
  if (dataFormat === 'json' || dataFormat === 'txt') {
    return JSON.parse(data);
  }
  throw new Error(`${dataFormat} is invalid file type`);
};

export default parser;
