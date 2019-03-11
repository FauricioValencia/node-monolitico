const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('./user.model');
const services = require('./user.services');

exports.saveUser = (req, res) => {
  console.log('entro perros');
  const data = req.body;
  return services.saveUserPromise(data)
    .then(response => res.json(response))
    .catch(err => res.status(400).json(err));
};

exports.updateUser = (req, res) => {
  const {
    id
  } = req.params;
  const {
    body
  } = _.pick(req.body, ['email', 'password']);
  return services.updateUserPromise(id, body)
    .then(response => res.json({
      ...response,
      ok: true
    }))
    .catch(err => res.status(400).json(err));
};

exports.getUsers = (req, res) => {
  // const { sky } = req.query || 0;
  // const { lim } = req.query || 5;
  // return services.getUsersPromise(sky, lim)
  return services.getUsersPromise()
    .then(response => {
      console.log('respueta al obtener el usuario', response);
      return res.json({
        ...response,
        ok: true
      })
    })
    .catch(err => res.status(400).json(err));
};
exports.getUSerByCedula = (req, res) => {
  let cedula = req.params.cedula;
  return services.getUSerByCedulaPromise(cedula)
    .then((response)=>{
      console.log('lo que imprime al buscar por cedula: ', response);
      return res.json({
        ...response,
        ok: true
      })
    })
    .catch((e)=>res.status(400).json(e))
}

exports.deleteUser = (req, res) => {
  const {
    id
  } = req.params;
  return services.deleteUSerPromise(id)
    .then(response => res.json({
      ...response,
      ok: true
    }))
    .catch(err => res.status(400).json(err));
};