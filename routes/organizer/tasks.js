const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const taskRouter = express.Router();
taskRouter.use(middlewareOrg);
const prisma = new PrismaClient();

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
          Tasks: true,
        },
      },
    },
  });

  return events;
};

// Route for getting tasks of events
/* ************** "http://localhost:3000/organization/tasks" ***************/
taskRouter.get("/", async (req, res) => {
  const events = await fetchEvents(req.userId);

  if (events != null) {
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

// Route for adding tasks into events
/* ************** "http://localhost:3000/organization/tasks/add" ***************/
taskRouter.post("/add", async (req, res) => {
  const body = req.body;

  if (typeof body == "object") {
    //you can add multiple tasks at time
    //   for (let i = 0; i < body.length; i++) {
    const eventTasks = await prisma.task.createMany({
      data: body.map((obj) => {
        return { event_id: obj.event_id, t_name: obj.t_name };
      }),
    });
    //   }
    if (eventTasks != null) {
      res.status(responseCode.Success).json({
        message: "Task added to event successfully!",
        eventTasks: eventTasks,
      });
    } else {
      res
        .status(responseCode.InternalServerError)
        .send("Something wrong with server , Please try again after sometime!");
    }
  } else {
    res
      .status(responseCode.BadRequest)
      .send("Please provide valid form of data!");
  }
});

// Route for updating tasks into events
/* ************** "http://localhost:3000/organization/tasks/update" ***************/
taskRouter.put("/update", async (req, res) => {
  const body = req.body;

  // We can update multiple task at time
  let eventTask = null;
  for (let i = 0; i < body.ids.length; i++) {
    eventTask = await prisma.eventManager.update({
      where: {
        id: body.event_id,
      },
      data: {
        Tasks: {
          update: {
            where: {
              id: body.ids[i],
            },
            data: { t_name: body.tasks[i] },
          },
        },
      },
    });
  }

  if (eventTask != null) {
    res.status(responseCode.Success).json({
      message: "Task updated successfully!",
      eventTask: eventTask,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

module.exports = { taskRouter };
