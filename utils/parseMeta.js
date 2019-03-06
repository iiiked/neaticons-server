const normalizeString = str => str.trim().toLowerCase().replace(/,/g, '');

module.exports = (data) => {
  const re = new RegExp('\\/\\*\\s*@(.+?)\\s*\\*\\/', 'g');
  const meta = {};

  let match;
  while (match !== null) {
    match = re.exec(data);
    let [key, value] = match !== null ? match[1].split(':') : ['type', 'icon'];
    key = normalizeString(key);
    value = value.match(/((?:\w+\s?)+),?/g) === null ? value : value.match(/((?:\w+\s?)+),?/g).map(normalizeString);
    meta[key] = value.length < 2 ? value[0] : value;
  }

  return meta;
};
