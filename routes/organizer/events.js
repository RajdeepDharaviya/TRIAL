const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const eveRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();
eveRouter.use(middlewareOrg);

// For fetching data from database
const fetchData = async (id) => {
  const event = await prisma.organizer.findMany({
    where: {
      id: id,
    },
    select: {
      id,
      events: {
        where: {
          e_isAct: true,
        },
      },
    },
  });
  return event;
};

// Route for getting all events data
/* ************** "http://localhost:3000/organization/events" ***************/

eveRouter.get("/", async (req, res) => {
  const events = await fetchData(req.userId);

  if (events != []) {
    res.status(responseCode.Success).json({
      message: "Events!",
      event: events,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

// Route for creating events
/* ************** "http://localhost:3000/organization/events/create" ***************/
eveRouter.post("/create", async (req, res) => {
  const body = req.body;
  const event = await prisma.eventManager.create({
    data: {
      e_name: body.e_name,
      e_description: body.e_description,
      e_mode: body.e_mode,
      e_rounds: body.e_rounds,
      e_type: body.e_type,
      e_fees: body.e_fees,
      e_isAct: true,
      orgId: req.userId,
    },
  });

  if (event != []) {
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

// Route for updating events data
/* ************** "http://localhost:3000/organization/events/update" ***************/
eveRouter.put("/update", async (req, res) => {
  const body = req.body;

  //getting an events details first for any updates to the events
  const events = fetchData();

  const event = await prisma.eventManager.update({
    where: {
      orgId: req.userId,
      id: body.eventId,
    },
    // Here all the data put but update as you want to update
    // For example , u can update only name or all the above data
    data: {
      e_name: body.e_name,
      e_description: body.e_description,
      e_mode: body.e_mode,
      e_rounds: body.e_rounds,
      e_type: body.e_type,
      e_fees: body.e_fees,
    },
  });

  if (event != []) {
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

// Route for cancel events
/* ************** "http://localhost:3000/organization/events/cancel" ***************/
eveRouter.put("/cancel", async (req, res) => {
  const body = req.body;

  //getting an events details first for any updates to the events
  const events = fetchData();

  const event = await prisma.eventManager.update({
    where: {
      id: body.eventId,
      orgId: req.userId,
    },
    // Here all the data put but update as you want to update
    // For example , u can update only name or all the above data
    data: {
      e_isAct: false,
    },
  });

  if (event != []) {
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
