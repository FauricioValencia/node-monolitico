const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
// var sgTransport = require('nodemailer-sendgrid-transport');

const options = {
  auth: {
    api_user: "6P_8pOxdT7CS71lJ2xdayg",
    api_key:
      "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"
  }
};
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_user: "FauricioValencia",
      api_key:
        "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"
    }
  })
);
const client = nodemailer.createTransport(sendgridTransport(options));

// sirve para filtrar los datos que quiero y por ende elimina los que noq uiero del objeto
// const _ = require('underscore');

const UserStudy = require("./studys.model");
var email = {
  from: "julian.fau.valencia@gmail.com",
  to: "julian.f.valencia@hotmail.com",
  subject: "Hello",
  text: "Hello world",
  html: "<b>Hello world</b>"
};
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
          // transporter
          //   .sendMail({
          //     to: "julian.f.valencia@hotmail.com",
          //     from: "julian.fau.valencia@gmail.com",
          //     subject: "Nueva solicitud de estudio",
          //     html: `<h1>Hay una nueva solicitud de estudio</h1>`
          //   })
          //   .catch(e =>
          //     console.log("Error al enviar el email de notifcacion: ", e)
          //   )
          //   .then(e => {
          //     console.log(e);
          //     const ok = {
          //       sendEmail: e,
          //       ok: true,
          //       message:
          //         "Se ha hecho la solicitud de estudio satisfactoriamente",
          //       solicitudEstudio: saveStudy
          //     };
          //     return resolve(ok);
          //   });
          // client.sendMail(email, (err, info) => {
          //   if (err) {
          //     console.log(err);
          //     resolve(err);
          //   } else {
          //     console.log("Message sent: " + info.response);
          //     resolve(info.response);
          //   }
          // });
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
