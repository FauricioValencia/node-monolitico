const bcrypt = require('bcrypt');

// sirve para filtrar los datos que quiero y por ende elimina los que noq uiero del objeto
// const _ = require('underscore');

const User = require('./user.model');
exports.saveUserPromise = data =>
  new Promise((resolve, reject) => {
    const temp = {
      ...data,
      password: bcrypt.hashSync(data.password, 10)
    };
    const user = new User(temp);

    User.findOne(
      {
        email: data.email
      },
      (err, userDB) => {
        if (err) {
          const err = {
            ok: false,
            err
          };
          reject(err);
        }
        if (userDB) {
          let body = {
            ok: false,
            message: 'el correo existe nene'
          };
          return resolve(body);
        }
        if (!userDB) {
          user.save((err, userDB) => {
            if (err) {
              const error = {
                ok: false,
                err,
                status: 400
              };
              return reject(error);
            }
            const ok = {
              userDB,
              ok: true
            };
            return resolve(ok);
          });
        }
      }
    );
  });

exports.updateUserPromise = (id, body) =>
  new Promise((resolve, reject) => {
    console.log('body: ', body);
    let newBody = { ...body };
    if (body.password) {
      newBody = {
        password: bcrypt.hashSync(body.password, 10)
      };
    }
    console.log('newBody: ', newBody);
    User.findByIdAndUpdate(
      id,
      newBody,
      {
        new: true,
        runValidators: true
      },
      (err, userDB) => {
        if (err) {
          const error = {
            ok: false,
            err,
            status: 400
          };
          return reject(error);
        }
        return resolve(userDB);
      }
    );
  });

// exports.getUsersPromise = (sky, lim) => new Promise((resolve, reject) => {
exports.getUsersPromise = () =>
  new Promise((resolve, reject) => {
    User.find({
      state: true
    })
      .populate('searchHistory')
      .exec((err, users) => {
        if (err) {
          const error = {
            ok: false,
            err,
            status: 400
          };
          return reject(error);
        }
        return resolve({
          status: 200,
          ok: true,
          data: users
        });
      });
  });
exports.getUSerByCedulaUpdateSearchHistoryPromise = (cedula, dataUSer) =>
  new Promise((resolve, reject) => {
    User.find({
      cedula
    }).exec((err, usersDB) => {
      if (err) {
        let err = {
          ok: false,
          err
        };
        return reject(err);
      }
      if (usersDB.length === 0) {
        const error = {
          ok: false,
          message: 'no existe el usuario mi rey',
          status: 400
        };
        return reject(error);
      }
      if (usersDB) {
        dataUSer.searchHistory.unshift({
          cedula,
          name: dataUSer.name,
          lastName: dataUSer.lastName
        });
        let newArray = {
          ...dataUSer
        };
        User.findOneAndUpdate(
          {
            email: dataUSer.email
          },
          newArray,
          null,
          (err, doc, any) => {
            return resolve(usersDB, {
              ok: true
            });
          }
        );
      }
    });
  });

exports.getUSerByCedulaPromise = cedula =>
  new Promise((resolve, reject) => {
    User.find({
      cedula
    }).exec((err, usersDB) => {
      if (err) {
        let err = {
          ok: false,
          err
        };
        return reject(err);
      }
      if (usersDB.length === 0) {
        const error = {
          ok: false,
          message: 'no existe el usuario mi rey',
          status: 400
        };
        return reject(error);
      }
      return resolve(usersDB, {
        ok: true
      });
    });
  });

exports.deleteUSerPromise = id =>
  new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      {
        state: false
      },
      {
        new: true
      },
      (err, userDB) => {
        if (err) {
          let err = {
            ok: false,
            err
          };
          return reject(err);
        }
        if (!userDB) {
          let err = {
            status: 400,
            ok: false,
            err: {
              message: 'El usuario no existe padre'
            }
          };
          return reject(err);
        }
        let ok = {
          ok: true,
          delete: userDB
        };
        return resolve(ok);
      }
    );
  });
