const bcrypt = require('bcrypt');

// sirve para filtrar los datos que quiero y por ende elimina los que noq uiero del objeto
// const _ = require('underscore');

const User = require('./user.model');
exports.saveUserPromise = data => new Promise((resolve, reject) => {
    const temp = {
      ...data,
      password: bcrypt.hashSync(data.password, 10),
    };
    const user = new User(temp);
    user.save((err, userDB) => {
      if (err) {
        const error = {
          ok: false,
          err,
          status: 400,
        };
        return reject(error);
      }
      const ok = {
        userDB,
        ok: true,
      };
      return resolve(ok);
    });
  });