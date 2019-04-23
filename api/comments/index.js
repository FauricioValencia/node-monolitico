const { Router } = require("express");
const controller = require("./comments.controller.js");
const { verifyToken } = require("../../server/middlewares/autenticacion.js");

const router = new Router();

router.get("/:id", verifyToken, controller.getComments);
router.post("/", verifyToken, controller.createComment );

module.exports = router;

