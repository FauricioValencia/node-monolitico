const { Router } = require("express");
const { verifyToken } = require("../../server/middlewares/autenticacion");
const controller = require("./myTenants.controller.js");

const router = new Router();

router.post("/",  controller.addTenantMyTenantsAuthor);
// router.get("/",  controller.getMy_tenantsByAuthor);

module.exports = router;