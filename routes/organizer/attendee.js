const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const attRouter = express.Router();

attRouter.use(middlewareOrg);

module.exports = { attRouter };
