const express = require("express");
const { middleware } = require("../../middlewares/middleware");
const eveRouter = express.Router();
eveRouter.use(middleware);

module.exports = { eveRouter };
