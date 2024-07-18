const express = require("express");
const { middleware } = require("../../middlewares/middleware");
const schRouter = express.Router();

schRouter.use(middleware);
module.exports = { schRouter };
