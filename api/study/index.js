const { Router } = require("express");
const controller = require("./study.controller");
const { verifyToken } = require("../../server/middlewares/autenticacion");

const router = new Router();

router.get("/",  controller.getStudiesByAuthor);
router.post("/", verifyToken, controller.tenantStudy);
router.put("/:id", controller.updateUser);

module.exports = router;
