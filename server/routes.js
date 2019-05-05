/**
 * Main application routes
 */
// const errors = require('../components/errors');

// Import Endpoints

const user = require("../api/user");
const login = require("../api/login");
const study = require("../api/study");
const comments = require("../api/comments");
const myTenants = require("../api/my_tenants");

module.exports = app => {
  // Insert routes below
  app.use("/user", user);
  app.use("/login", login);
  app.use("/study", study);
  app.use("/comment", comments);
  app.use("/myTenants", myTenants);
};
