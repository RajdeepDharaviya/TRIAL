const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const taskRouter = express.Router();
taskRouter.use(middlewareOrg);
const prisma = new PrismaClient();

//Getting events from database
const fetchEvents = async () => {
  const events = await prisma.organizer.findMany({
    where: {
      id: req.userId,
    },
    include: {
      events: {
        where: {
          e_isAct: true,
        },
        include: {
          Tasks: {
            select: {
              id,
              t_name,
            },
          },
        },
      },
    },
  });
};

// Route for getting tasks of events
/* ************** "http://localhost:3000/organization/tasks" ***************/
taskRouter.get("/", async (req, res) => {
  const events = fetchEvents();

  if (events) {
    res.status(responseCode.Success).json({
      message: "events given below",
      events: events.map((event) => {
        return event;
      }),
    });
  }
});

// Route for adding tasks into events
/* ************** "http://localhost:3000/organization/tasks/add" ***************/
taskRouter.post("/add", async (req, res) => {
  const body = req.body;

  if (typeof body == "object") {
    //you can add multiple tasks at time
    //   for (let i = 0; i < body.length; i++) {
    const eventTasks = await prisma.eventManager.create({
      data: {
        Tasks: {
          createMany: {
            data: body.map((obj) => {
              return { event_id: obj.event_id, t_name: obj.t_name };
            }),
          },
        },
      },
      include: {
        Tasks: true,
      },
    });
    //   }
    if (eventTasks) {
      res.status(responseCode.Success).json({
        message: "Task added to event successfully!",
        eventTasks: eventTasks.map((eventTask) => {
          return eventTask;
        }),
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

  const eventTask = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      Tasks: {
        update: {
          where: {
            id: body.task_id,
          },
          data: {
            t_name: body.t_name,
          },
        },
      },
    },
  });
  //   }
  if (eventTask) {
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

// Route for delete tasks into events
/* ************** "http://localhost:3000/organization/tasks/delete" ***************/
taskRouter.delete("/delete", async (req, res) => {
  const body = req.body;

  // you can delete multiple task at time
  const eventTask = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      Tasks: {
        deleteMany: body.map((task_id) => {
          return task_id;
        }),
      },
    },
  });
  //   }
  if (eventTasks) {
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
