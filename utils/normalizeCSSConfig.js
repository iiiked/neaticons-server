module.exports = (config, defaults) => {
  const cfg = { ...config };
  Object.keys(defaults).forEach((key) => {
    cfg[key] = cfg[key] || defaults[key];
  });
  return cfg;
};
