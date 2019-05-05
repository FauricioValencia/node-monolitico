const { Router } = require("express");
const controller = require("./comments.controller.js");
const { verifyToken } = require("../../server/middlewares/autenticacion.js");

const router = new Router();

router.get("/:id", controller.getComments);
router.post("/", controller.createComment);

module.exports = router;
