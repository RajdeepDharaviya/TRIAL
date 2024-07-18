const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const eveRouter = express.Router();

eveRouter.use(middlewareOrg);

module.exports = { eveRouter };
