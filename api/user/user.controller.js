const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('./user.model');

exports.saveUser = (req, res) => {
    const data = req.body;
    return services.saveUserPromise(data)
      .then(response => res.json(response))
      .catch(err => res.status(400).json(err));
  };
  