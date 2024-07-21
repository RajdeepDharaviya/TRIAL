const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const eveRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();
eveRouter.use(middlewareOrg);

// For fetching data from database
const fetchData = async () => {
  const event = await prisma.eventManagerventManager.findMany({
    where: {
      orgId: req.userId,
    },
  });
  return event;
};

eveRouter.get("/", async (req, res) => {
  const events = fetchData();
  if (events) {
    res.status(responseCode.Success).json({
      message: "Event created succesffully!",
      event: events.map((event) => {
        return event;
      }),
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

eveRouter.post("/create", async (req, res) => {
  const body = req.body;

  const event = await prisma.eventManager.create({
    data: {
      e_name: body.e_name,
      e_date: body.e_date,
      e_description: body.e_description,
      e_mode: body.e_mode,
      e_rounds: body.e_rounds,
      e_type: body.e_type,
      orgId: req.userId,
    },
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

eveRouter.put("/update", async (req, res) => {
  const body = req.body;
  const events = fetchData();

  const event = await prisma.eventManager.update({
    where: {
      id: body.eventId,
    },
  });

  if (event) {
    res.status(responseCode.Success).json({
      message: "Event updated succesffully!",
      event: event,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

module.exports = { eveRouter };
