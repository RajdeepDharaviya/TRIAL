const express = require("express");
const { middleware } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();
const eveRouter = express.Router();

eveRouter.use(middleware);

// Route for getting all events data
/* ************** "http://localhost:3000/organization/events" ***************/
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

// Route for getting all events data
/* ************** "http://localhost:3000/organization/events/participate" ***************/
eveRouter.get("/participate", async (req, res) => {
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

// Route for getting all events data
/* ************** "http://localhost:3000/organization/events/closed" ***************/
eveRouter.get("/closed", async (req, res) => {
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
