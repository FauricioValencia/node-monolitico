const bcrypt = require("bcrypt");

// sirve para filtrar los datos que quiero y por ende elimina los que noq uiero del objeto
// const _ = require('underscore');

const userStudy = require("./studys.model");

// se le pasa como parametros en el data : el id del inquilino, el id del autor que hace la busqueda, y dataUSer se pasa el id de la busqueda, el token
exports.tenantStudyPromise = (data, dataUser) =>
  new Promise((resolve, reject) => {
    // console.log("datos que le llegan al servicio: ", data, dataUser);
    let bodyStudy = {
      tenant: data.tenant,
      author: dataUser._id,
      createDate: new Date()
    };
    // La hora de creacion la debe mandar el front
    const UserStudy = new userStudy(bodyStudy);
    console.log(
      "parametros: ",
      `tenant: ${data.tenant}, author: ${dataUser._id}`
    );
    // servicio que se ejecuta cuando rectifica que el usuario no exista
    userStudy
      .find({ tenant: data.tenant, author: dataUser._id })
      .exec((err, solicitudEncontrada) => {
        if (err) {
          UserStudy.save((err, userStudy) => {
            if (err) {
              const error = {
                ok: false,
                err,
                status: 400,
                message: "Bad request"
              };
              return reject(error);
            }
            return resolve({
              status: 200,
              ok: true,
              usuarioGuardado: userStudy
            });
          });
        }
        console.log("se lo salto");
        return resolve({
          ok: true,
          message:
            "Se encontro la solicitud de estudio, no puedes volver a realizar el estudio a esta persona :c"
        });
      });
  });

exports.updateUserPromise = (id, body) =>
  new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      body,
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
exports.getStudyStenantPromise = (author) =>
  new Promise((resolve, reject) => {
    userStudy.find({
      author
    }).populate('tenant')
    .exec((err, users) => {
      if (err) {
        const error = {
          ok: false,
          err,
          status: 400
        };
        return reject(error);
      }
      return resolve(users, {
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
          const error = {
            ok: false,
            err,
            status: 400
          };
          return reject(error);
        }
        if (!userDB) {
          let err = {
            status: 400,
            ok: false,
            err: {
              message: "El usuario no existe padre"
            }
          };
          return reject(err);
        }
        return resolve.json({
          ok: true,
          delete: userDB
        });
      }
    );
  });
