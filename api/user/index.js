const { Router } = require('express');
const controller = require('./user.controller');

const router = new Router();

router.get('/', controller.getUsers);