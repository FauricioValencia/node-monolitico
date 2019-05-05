const services = require("./myTenants.services");

exports.addTenantMyTenantsAuthor = (req, res) => {
  const data = req.body;
  let dataUser = req.user;
  // console.log('data body: ', data);
  // console.log('dataUser: ',dataUser );
  return services
    .addTenantMyTenantsAuthorPromise(data, dataUser)
    .then(response => res.json(response))
    .catch(err => res.status(400).json(err));
};

exports.getMy_tenantsByAuthor = (req, res) => {
  let dataAuthor = req.user;
  return services
    .getMy_tenantsByAuthorPromise(dataAuthor)
    .then(res => res.json(res))
    .catch(err => res.status(400).json(err));
};
