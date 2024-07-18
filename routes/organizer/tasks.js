const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const taskRouter = express.Router();
taskRouter.use(middlewareOrg);

module.exports = { taskRouter };
