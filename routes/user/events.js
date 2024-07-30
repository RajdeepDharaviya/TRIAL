const express = require("express");
const { middleware } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();
const eveRouter = express.Router();

eveRouter.use(middleware);

// Route for getting all events data
/* ************** "http://localhost:3000/user/events" ***************/
eveRouter.get("/:params", async (req, res) => {
  const params = req.params.params;
  let events;
  if (params == "new") {
    events = await prisma.eventManager.findMany({
      where: {
        e_isAct: true,
      },
    });
  } else if (params == "closed") {
    events = await prisma.eventManager.findMany({
      where: { e_isAct: false },
    });
  } else if (params == "participate") {
    events = await prisma.eventManager.findMany({
      where: {
        e_isAct: true,
      },
      select: {
        e_date: true,
        e_name: true,
        e_description: true,
        e_mode: true,
        e_rounds: true,
        e_fees: true,
        Registers: {
          where: {
            user_id: req.userId,
          },
        },
      },
    });
  }

  if (events != []) {
    res.status(responseCode.Success).json({
      message: "Events!",
      events: events,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

// Route for getting all events data
/* ************** "http://localhost:3000/user/events/participate" ***************/
eveRouter.get("/participate", async (req, res) => {
  console.log("Hi tehre");
  const event = await prisma.eventManager.findMany({
    where: {
      e_isAct: true,
    },
    select: {
      Registers: {
        where: {
          user_id: req.userId,
        },
      },
    },
  });
  console.log("hi " + event);
  if (event != []) {
    res.status(responseCode.Success).json({
      message: "Events",
      event: event,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

module.exports = { eveRouter };
