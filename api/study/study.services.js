const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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"
    }
  })
);
// sirve para filtrar los datos que quiero y por ende elimina los que noq uiero del objeto
// const _ = require('underscore');

const UserStudy = require("./studys.model");

// se le pasa como parametros en el data : el id del inquilino, el id del autor que hace la busqueda, y dataUSer se pasa el id de la busqueda, el token
exports.tenantStudyPromise = (data, dataUser) =>
  new Promise((resolve, reject) => {
    // console.log("datos que le llegan al servicio: ", data, dataUser);
    let bodyStudy = {
      tenant: data.tenant,
      author: dataUser._id,
      phoneTenant: data.phoneTenant,
      emailTenant: data.emailTenant,
      createDate: new Date()
    };
    // La hora de creacion la debe mandar el front
    const userStudy = new UserStudy(bodyStudy);
    // servicio que se ejecuta cuando rectifica que el usuario no exista
    UserStudy.find({ tenant: data.tenant, author: dataUser._id }, function(
      err,
      estudio
    ) {
      if (err === null && !Boolean(estudio.length)) {
        userStudy.save((err, saveStudy) => {
          if (err) {
            const error = {
              ok: false,
              message: "Error al solicitar el estudio del inquilino",
              err,
              status: 400
            };
            return reject(error);
          }
          transporter
            .sendMail({
              to: "julian.fau.valencia@gmail.com",
              from: "julian.f.valencia@hotmail.com",
              subject: "Nueva solicitud de estudio",
              html: "<h1>Hay una nueva solicitud de estudio</h1>"
            })
            .catch(e =>
              console.log("Error al enviar el email de notifcacion: ", e)
            )
            .then(() => {
              const ok = {
                ok: true,
                message:
                  "Se ha hecho la solicitud de estudio satisfactoriamente",
                solicitudEstudio: saveStudy
              };
              return resolve(ok);
            });
        });
      } else {
        let ok = {
          ok: false,
          message:
            "El author de esta busqueda, previamente ya le ha hecho un estudio a este inquilino",
          estudio
        };
        return reject(ok);
      }
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
exports.getStudyStenantPromise = author =>
  new Promise((resolve, reject) => {
    userStudy
      .find({
        author
      })
      .populate("tenant")
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
