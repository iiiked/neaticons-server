const snakeCase = str => str.replace(/_/g, '-');

module.exports = (styles, config) => {
  let response = styles;
  Object.keys(config).forEach((key) => {
    const re = new RegExp(`var\\(--${snakeCase(key)}\\)`, 'g');
    response = response.replace(re, config[key]);
  });

  return response;
};
