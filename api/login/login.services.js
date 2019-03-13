const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../user/user.model');

exports.loginUserPromise = (email, password) => new Promise((resolve, reject) => {

  User.findOne({
    email,
  }, (err, userDB) => {
    if (err) {
      let err ={
        status:500,
        ok:false,
        err
      }
      return reject(err)
      }
    
    if (!userDB || !bcrypt.compareSync(password, userDB.password)) {
      let error ={
          status: 400,
          ok: false,
          err: {
            message: 'Usuario o contraseña incorrectos',
          }
      }
      return reject(error);
    }
    const token = jwt.sign({
      user: userDB,
    }, process.env.SEED_TOKEN, {
      expiresIn: process.env.EXP_TOKEN,
    }); // expira en 30 dias
    return resolve({
      ok: true,
      userDB,
      token,
    });
  });
});
