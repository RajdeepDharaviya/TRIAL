const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const schRouter = express.Router();
const prisma = new PrismaClient();

schRouter.use(middlewareOrg);

//Getting events from database
const fetchEvents = async (id) => {
  const events = await prisma.organizer.findMany({
    where: {
      id: id,
    },
    include: {
      events: {
        where: {
          e_isAct: true,
        },
        include: {
          Schedules: true,
        },
      },
    },
  });

  return events;
};

// Route for getting Schedules of events
/* ************** "http://localhost:3000/organization/schedules" ***************/
schRouter.get("/", async (req, res) => {
  const events = await fetchEvents(req.userId);

  if (events != []) {
    res.status(responseCode.Success).json({
      message: "events given below",
      events: events,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for adding Schedules into events
/* ************** "http://localhost:3000/organization/schedules/add" ***************/
schRouter.post("/add", async (req, res) => {
  const body = req.body;

  const eventSchedules = await prisma.schedule.create({
    data: {
      start_time: body.start_time,
      end_time: body.end_time,
      event_id: body.event_id,
    },
  });

  if (eventSchedules != []) {
    res.status(responseCode.Success).json({
      message: "Task added to event successfully!",
      eventSchedules: eventSchedules,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for updating Schedules into events
/* ************** "http://localhost:3000/organization/schedules/update" ***************/
schRouter.put("/update", async (req, res) => {
  const body = req.body;

  const eventTask = await prisma.schedule.update({
    where: {
      event_id: body.event_id,
      id: body.schedule_id,
    },
    data: {
      start_time: body.start_time,
      end_time: body.end_time,
    },
  });

  if (eventTask != []) {
    res.status(responseCode.Success).json({
      message: "Schedule updated successfully!",
      eventTask: eventTask,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for delete Schedules into events
/* ************** "http://localhost:3000/organization/schedules/delete" ***************/
schRouter.delete("/delete", async (req, res) => {
  const body = req.body;

  // you can delete multiple task at time
  const eventSchedules = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      Schedules: {
        deleteMany: { id: body.schedule_id },
      },
    },
  });

  if (eventSchedules != []) {
    res.status(responseCode.Success).json({
      message: "Schedule deleted successfully!",
      eventSchedules: eventSchedules,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

module.exports = { schRouter };
