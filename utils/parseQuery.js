const normalizeString = str => str.trim().toLowerCase();

module.exports = query => query.split(',').map(normalizeString).map(str => `${str}.css`);
