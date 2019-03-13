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

exports.updateUserPromise = (id, body) => new Promise((resolve, reject) => {
  User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  }, (err, userDB) => {
    if (err) {
      const error = {
        ok: false,
        err,
        status: 400,
      };
      return reject(error);
    }
    return resolve(userDB);
  });
});

// exports.getUsersPromise = (sky, lim) => new Promise((resolve, reject) => {
exports.getUsersPromise = () => new Promise((resolve, reject) => {
  User.find({
      state: true
    })
    .exec((err, users) => {
      if (err) {
        const error = {
          ok: false,
          err,
          status: 400,
        };
        return reject(error);
      }
      return resolve(users, {
        ok: true
      });
    });
});

exports.deleteUSerPromise = id => new Promise((resolve, reject) => {
  User.findByIdAndUpdate(id, {
    state: false
  }, {
    new: true
  }, (err, userDB) => {
    if (err) {
      const error = {
        ok: false,
        err,
        status: 400,
      };
      return reject(error);
    }
    if (!userDB) {
      let err = {
        status: 400,
        ok: false,
        err: {
          message: 'El usuario no existe padre',
        },
      }
      return reject(err)
    }
    return resolve.json({
      ok: true,
      delete: userDB,
    });
  });
});