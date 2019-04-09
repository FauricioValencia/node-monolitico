const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('./studys.model');
const services = require('./study.services');

exports.tenantStudy = (req, res) => {

    const data = req.body;
    let dataUser = req.user;
    // console.log('data:', data);
    // console.log('data usuario: ', dataUser);
    return services.tenantStudyPromise(data, dataUser)
      .then(response => res.json(response))
      .catch(err => res.status(400).json(err));
  };

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { body } = _.pick(req.body, ['email', 'password']);
    return services.updateUserPromise(id, body)
      .then(response => res.json({ ...response, ok: true }))
      .catch(err => res.status(400).json(err));
  };

  exports.getUsers = (req, res) => {
    let author = req.user._id;
    return services.getStudyStenantPromise(author)
      .then(response => {
        return res.json({ ...response, ok: true })}
      )
      .catch(err => res.status(400).json(err));
  };

  exports.deleteUser = (req, res) => {
    const { id } = req.params;
    return services.deleteUSerPromise(id)
      .then(response => res.json({ ...response, ok: true }))
      .catch(err => res.status(400).json(err));
  };