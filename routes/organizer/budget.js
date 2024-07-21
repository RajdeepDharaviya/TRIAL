const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const budRouter = express.Router();
const prisma = new PrismaClient();

budRouter.use(middlewareOrg);

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
          Budgets: {
            select: {
              id,
              total_budget,
            },
          },
        },
      },
    },
  });
};

// Route for getting tasks of events
/* ************** "http://localhost:3000/organization/eligiblities" ***************/
budRouter.get("/", async (req, res) => {
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

// Route for adding eligiblities into events
/* ************** "http://localhost:3000/organization/eligiblities/add" ***************/
budRouter.post("/add", async (req, res) => {
  const body = req.body;

  const eventeligiblities = await prisma.eventManager.create({
    where: {
      id: body.event_id,
    },
    data: {
      Budgets: {
        create: {
          total_budget: body.total_budget,
        },
      },
    },
    include: {
      Budgets: true,
    },
  });

  if (eventeligiblities) {
    res.status(responseCode.Success).json({
      message: "Task added to event successfully!",
      eventeligiblities: eventeligiblities.map((eventTask) => {
        return eventTask;
      }),
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for updating eligiblities into events
/* ************** "http://localhost:3000/organization/eligiblities/update" ***************/
budRouter.put("/update", async (req, res) => {
  const body = req.body;

  const eventTask = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      Budgets: {
        update: {
          where: {
            id: body.budget_id,
          },
          data: {
            total_budget: body.total_budget,
          },
        },
      },
    },
  });

  if (eventTask) {
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

// Route for delete eligiblities into events
/* ************** "http://localhost:3000/organization/eligiblities/delete" ***************/
budRouter.delete("/delete", async (req, res) => {
  const body = req.body;

  // you can delete multiple task at time
  const eventTask = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      Budgets: {
        deleteMany: { id: body.budget_id },
      },
    },
  });

  if (eventTask) {
    res.status(responseCode.Success).json({
      message: "Schedule deleted successfully!",
      eventTask: eventTask,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

module.exports = { budRouter };
