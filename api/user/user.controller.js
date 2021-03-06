const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('./user.model');
const services = require('./user.services');

exports.saveUser = (req, res) => {
  const data = req.body;
  return services
    .saveUserPromise(data)
    .then(response => res.json(response))
    .catch(err => res.json(err));
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  // const { body } = _.pick(req.body, ['email', 'password']);
  return services
    .updateUserPromise(id, req.body)
    .then(response =>
      res.json({
        ...response,
        ok: true
      })
    )
    .catch(err => res.status(400).json(err));
};

exports.getUsers = (req, res) => {
  return services
    .getUsersPromise()
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(err => res.status(400).json(err));
};
exports.getUSerByCedulaUpdateSearchHistory = (req, res) => {
  let cedula = req.params.cedula;
  let dataUser = req.user;
  return services
    .getUSerByCedulaUpdateSearchHistoryPromise(cedula, dataUser)
    .then(response => {
      return res.json({
        ...response,
        ok: true
      });
    })
    .catch(e => res.status(400).json(e));
};
exports.getUSerByCedula = (req, res) => {
  let cedula = req.params.cedula;
  return services
    .getUSerByCedulaPromise(cedula)
    .then(response => {
      return res.json({
        ...response,
        ok: true
      });
    })
    .catch(e => res.status(400).json(e));
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  return services
    .deleteUSerPromise(id)
    .then(response =>
      res.json({
        ...response,
        ok: true
      })
    )
    .catch(err => res.status(400).json(err));
};
