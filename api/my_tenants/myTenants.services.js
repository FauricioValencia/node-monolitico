const myTenants = require("./myTenants.model");
const userStudy = require("../study/studys.model.js");

exports.addTenantMyTenantsAuthorPromise = (data, author) =>
  new Promise((resolve, reject) => {
    //  body que se va a gregar en caso de que el estado del estudio se true, es decir que ya hayan realizado el pago.
    console.log("lo que llega a la promesa: ");
    console.log("data: ", data.tenant);
    console.log("author: ", author._id);

    userStudy.find(
      { tenant: data.tenant, author: author._id },
      (err, dataTenantStudy) => {
        if (err) {
          const error = {
            ok: false,
            message:
              "No se ha encontrado la solicitud de estudio del inquilino",
            err
          };
          return reject(error);
        } else {
          console.log(
            "si se encontro la solicitud de estudio: ",
            dataTenantStudy
          );
          if (dataTenantStudy.length === 0) {
            const noData = {
              ok: false,
              message: "No se encontro solicitud de estudio.",
              solicitudStudio: dataTenantStudy
            };
            return reject(noData);
          }
          console.log("dataTenantStudy: ", dataTenantStudy);
          if (!Boolean(dataTenantStudy.state)) {
            const error = {
              ok: false,
              message:
                "Se encontro la solicitud de estudio, pero aparece en falso el estado del pago de la solicitud de estudio"
            };
            return reject(error);
          }
          let bodyMyTenant = {
            author: "",
            tenant: ""
          };
          const MyTenant = new myTenants(bodyMyTenant);
          MyTenant.save((err, myTenantSave) => {
            if (err) {
              const error = {
                ok: false,
                message: "No se pudo guardar en la lista de inquilinos tigre :c"
              };
              return reject(error);
            }
            let ok = {
              ok: true,
              message:
                "Inquilino agregado satisfactoriamente a tu lista de inquilinos",
              tenant: myTenantSave
            };
            return resolve(ok);
          });
        }
      }
    );
  });
exports.getMy_tenantsByAuthorPromise = dataAuthor =>
  new Promise((resolve, reject) => {
    myTenants.find({ author: dataAuthor._id }, (err, myTenants) => {
      if (err) {
        const error = {
          ok: false,
          message: "Error al traer todos mis inquilinos",
          err,
          status: 400
        };
        return reject(error);
      } else {
        let ok = {
          ok: true,
          myTenants
        };
        resolve(ok);
      }
    });
  });
