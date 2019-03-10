/**
 * Main application routes
 */
// const errors = require('../components/errors');

// Import Endpoints

const user = require('../api/user');
const login = require('../api/login');



module.exports = (app) => {
  // Insert routes below
  app.use('/user', user);
  app.use('/login', login);


};