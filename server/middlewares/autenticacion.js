var jwt = require('jsonwebtoken');


// ====================
//  Verifica token
// ====================

exports.verifyToken = (req, res, next) => {
    const token = req.get('token');
    // console.log('token de verifica token: ', token);
    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido',
                },
            });
        }
        req.user = decoded.user;
        return next();
    });
};

