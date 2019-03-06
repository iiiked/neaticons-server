module.exports = async (array, handler, startingValue) => {
  let acc = startingValue;

  // eslint-disable-next-line
  for (let item of array) {
    // eslint-disable-next-line
    acc = await handler(acc, item);
  }

  return acc;
};
