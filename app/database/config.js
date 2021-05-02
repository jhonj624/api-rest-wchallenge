require('dotenv').config();
const mongoose = require('mongoose');

const dbConnector = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    // eslint-disable-next-line no-console
    console.log('DB online');
  } catch (error) {
    throw new Error('Error launching DB');
  }
};

module.exports = {
  dbConnector,
};
