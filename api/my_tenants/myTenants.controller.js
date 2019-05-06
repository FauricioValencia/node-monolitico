const services = require("./myTenants.services");
const myTenants = require("./myTenants.model");

exports.addTenantMyTenantsAuthor = (req, res) => {
  const data = req.body;
  let dataUser = req.user;
  return services
    .addTenantMyTenantsAuthorPromise(data, dataUser)
    .then(response => res.json(response))
    .catch(err => res.status(400).json(err));
};

exports.getMy_tenantsByAuthor = (req, res) => {
  let dataAuthor = req.user;
  // return services
  //   .getMy_tenantsByAuthorPromise(dataAuthor)
  //   .then( (response) => {
  //     console.log(response);
  //     return res.json({
  //       ok: true,
  //       data: response
  //     });
  //   })
  //   .catch(err => res.status(400).json(err));
  myTenants.find({ author: dataAuthor._id }, (err, tenants) => {
    console.log("err: ", err);
    console.log("tenants: ", tenants);
    if (err) {
      const error = {
        ok: false,
        message: "Error al traer todos mis inquilinos",
        err,
        status: 400
      };
      return res.status(400).json(error);
    }
    return res.json({
      ok: true,
      tenants
    });
  });
};
