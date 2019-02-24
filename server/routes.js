/**
 * Main application routes
 */
// const errors = require('../components/errors');

// Import Endpoints

const user = require('../api/user');


module.exports = (app) => {
  // Insert routes below
  app.use('/user', user);
};