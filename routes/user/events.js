const express = require("express");
const { middleware } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();
const eveRouter = express.Router();

eveRouter.use(middleware);

eveRouter.get("/", async (req, res) => {
  const event = await prisma.eventManager.findMany({
    where: {},
  });

  if (event) {
    res.status(responseCode.Success).json({
      message: "Event created succesffully!",
      event: event,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});
eveRouter.get("/participated", async (req, res) => {
  const event = await prisma.eventManager.findMany({
    where: {},
  });

  if (event) {
    res.status(responseCode.Success).json({
      message: "Event created succesffully!",
      event: event,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

module.exports = { eveRouter };
