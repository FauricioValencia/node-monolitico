const {
    Router
} = require('express');
const controller = require('./user.controller');
const {
    verifyToken
} = require('../../server/middlewares/autenticacion.js');

const router = new Router();

router.get('/', verifyToken, controller.getUsers);
router.get('/:cedula', verifyToken, controller.getUSerByCedulaUpdateSearchHistory);
router.get('/user/:cedula', verifyToken, controller.getUSerByCedula);
router.post('/', controller.saveUser);
router.put('/:id', verifyToken, controller.updateUser);


module.exports = router;