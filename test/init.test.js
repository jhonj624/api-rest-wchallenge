/* eslint-disable no-console */
require('dotenv').config();
const seeder = require('mongoose-seed');
const mongoose = require('mongoose');
const mockdata = require('./mock.json');

const mongodbCnnTest = process.env.MONGODB_TEST;
before(() => {
  it('Database test seed', (done) => {
    seeder.connect(mongodbCnnTest, () => {
      seeder.loadModels(['./app/models/index.js']);
      seeder.clearModels(['User'], () => {
        seeder.populateModels(mockdata, () => {
          done();
          seeder.disconnect();
        });
      });
    });
  });

  it('Connecting to database', (done) => {
    mongoose.connect(mongodbCnnTest, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 4,
    });
    mongoose.connection
      .once('open', () => {
        done();
      })
      .on('error', (error) => { console.log(error); });
  });
});
