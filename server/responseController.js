const fs = require('fs');
const path = require('path');

const readStyle = require('../utils/readStyle');
const parseQuery = require('../utils/parseQuery');
const replaceCSSVariables = require('../utils/replaceVariables');
const asyncReduce = require('../utils/asyncReduce');
const normalizeCSSConfig = require('../utils/normalizeCSSConfig');
const parseMeta = require('../utils/parseMeta');

const pathToMainCSS = path.resolve(__dirname, '../css/main.css');
const pathToIconsDir = path.resolve(__dirname, '../css/icons');

const getIconFileNames = () => new Promise((resolve, reject) => {
  fs.readdir(pathToIconsDir, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

module.exports.getIconStyle = async (query, body) => {
  const cssVars = normalizeCSSConfig(body, {
    icon_size: '48px',
    icon_transition_time: '.2s',
    color_primary: 'black',
    color_secondary: 'silver',
    color_background: 'white',
  });
  const iconList = query ? parseQuery(query) : await getIconFileNames();
  const mainCSS = await readStyle(pathToMainCSS);

  const response = await asyncReduce(iconList, async (acc, filename) => {
    const pathToIcon = path.resolve(pathToIconsDir, filename);
    const iconCSS = await readStyle(pathToIcon);
    return acc + '\n'.repeat(2) + replaceCSSVariables(iconCSS, cssVars);
  }, replaceCSSVariables(mainCSS, cssVars));

  return response;
};

module.exports.getIconList = async () => {
  const filenames = await getIconFileNames();
  const response = await Promise.all(filenames.map(async (filename) => {
    const pathToIcon = path.resolve(pathToIconsDir, filename);
    const iconCSS = await readStyle(pathToIcon);
    return {
      file: filename,
      meta: parseMeta(iconCSS),
    };
  }));

  return response;
};
