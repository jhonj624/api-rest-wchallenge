const topIsOk = async (top = 10) => {
  top = parseInt(top);
  if (!top || top === 0 || top > 25) throw new Error('top must be an integer between 1 and 25');
};

module.exports = {
  topIsOk,
};
