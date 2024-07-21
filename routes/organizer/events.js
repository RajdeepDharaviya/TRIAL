const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const eveRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();
eveRouter.use(middlewareOrg);

// For fetching data from database
const fetchData = async () => {
  const event = await prisma.organizer.findUnique({
    where: {
      orgId: req.userId,
    },
    include: {
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

// Route for creating events
/* ************** "http://localhost:3000/organization/events/create" ***************/
eveRouter.post("/create", async (req, res) => {
  const body = req.body;

  const event = await prisma.organizer.create({
    data: {
      events: {
        create: {
          e_name: body.e_name,
          e_date: body.e_date,
          e_description: body.e_description,
          e_mode: body.e_mode,
          e_rounds: body.e_rounds,
          e_type: body.e_type,
        },
      },
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

// Route for updating events data
/* ************** "http://localhost:3000/organization/events/update" ***************/
eveRouter.put("/update", async (req, res) => {
  const body = req.body;

  //getting an events details first for any updates to the events
  const events = fetchData();

  const event = await prisma.user.update({
    where: {
      orgId: req.userId,
      id: body.eventId,
    },
    // Here all the data put but update as you want to update
    // For example , u can update only name or all the above data
    data: {
      e_name: body.e_name,
      e_date: body.e_date,
      e_description: body.e_description,
      e_mode: body.e_mode,
      e_rounds: body.e_rounds,
      e_type: body.e_type,
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
