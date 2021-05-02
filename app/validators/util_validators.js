/* eslint-disable radix */
const topIsOk = async (top) => {
  const topValidate = parseInt(top);
  if (!topValidate || topValidate === 0 || top > 25) throw new Error('top must be an integer between 1 and 25');
};

module.exports = {
  topIsOk,
};
