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

  User.findOne({
    email: data.email
  }, (err, userDB) => {
    if (err) {
      const err = {
        ok: false,
        err
      }
      reject(err);
    }
    if (userDB) {
      let body = {
        ok: false,
        message: 'el correo existe nene'
      }
      return resolve(body)
    }
    if (!userDB) {
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

    }
  })
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
        return reject.status(400).json({
          ok: false,
          err,
        });
      }
      return resolve(users, {
        ok: true
      });
    });
});
exports.getUSerByCedulaPromise = (cedula) => new Promise((resolve, reject) => {
  User.find({
      cedula
    })
    .exec((err, usersDB) => {
      if (err) {
        return reject.status(400).json({
          ok: false,
          err,
        });
      }
      if (usersDB.length === 0) {

        const error = {
          ok: false,
          message: 'no existe el usuario mi rey',
          status: 400,
        };
        return reject(error);
      }
      return resolve(usersDB, {
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
      return reject.status(400).json({
        ok: false,
        err,
      });
    }
    if (!userDB) {
      return reject.status(400).json({
        status: 400,
        ok: false,
        err: {
          message: 'El usuario no existe padre',
        },
      });
    }
    return resolve.json({
      ok: true,
      delete: userDB,
    });
  });
});