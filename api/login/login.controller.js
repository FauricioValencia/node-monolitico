const services = require('./login.services');

exports.login = (req, res) => {
  const { email, password } = req.body;
  services.loginUserPromise(email, password)
    .then((response)=>res.json(response))
    .catch(err=>res.status(400).json(err))
};
