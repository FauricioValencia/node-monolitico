const {
    Router
} = require('express');
const controller = require('./user.controller');
const {
    verifyToken
} = require('../../server/middlewares/autenticacion.js');

const router = new Router();

router.get('/',  controller.getUsers);
router.get('/:cedula', controller.getUSerByCedulaUpdateSearchHistory);
router.get('/user/:cedula',  controller.getUSerByCedula);
router.post('/', controller.saveUser);
router.put('/:id',  controller.updateUser);


module.exports = router;