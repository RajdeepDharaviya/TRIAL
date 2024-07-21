const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const venRouter = express.Router();
const prisma = new PrismaClient();

venRouter.use(middlewareOrg);

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
          Venues: {
            select: {
              v_name,
              id,
              capacity,
            },
          },
        },
      },
    },
  });
};

// Route for getting tasks of events
/* ************** "http://localhost:3000/organization/venues" ***************/
venRouter.get("/", async (req, res) => {
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

// Route for adding venues into events
/* ************** "http://localhost:3000/organization/venues/add" ***************/
venRouter.post("/add", async (req, res) => {
  const body = req.body;

  const eventvenues = await prisma.eventManager.create({
    where: {
      id: body.event_id,
    },
    data: {
      Venues: {
        create: {
          v_name: body.v_name,
          capacity: body.capacity,
        },
      },
    },
    include: {
      venues: true,
    },
  });

  if (eventvenues) {
    res.status(responseCode.Success).json({
      message: "Task added to event successfully!",
      eventvenues: eventvenues.map((eventTask) => {
        return eventTask;
      }),
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for updating venues into events
/* ************** "http://localhost:3000/organization/venues/update" ***************/
venRouter.put("/update", async (req, res) => {
  const body = req.body;

  const eventTask = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      Venues: {
        update: {
          where: {
            id: body.veneu_id,
          },
          data: {
            v_name: body.v_name,
            capacity: body.capacity,
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

// Route for delete venues into events
/* ************** "http://localhost:3000/organization/venues/delete" ***************/
venRouter.delete("/delete", async (req, res) => {
  const body = req.body;

  // you can delete multiple task at time
  const eventTask = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      venues: {
        deleteMany: { id: body.veneu_id },
      },
    },
  });

  if (eventvenues) {
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

module.exports = { venRouter };
