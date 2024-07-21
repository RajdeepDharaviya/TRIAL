const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const prfRouter = express.Router();
const prisma = new PrismaClient();
prfRouter.use(middlewareOrg);

module.exports = { prfRouter };
