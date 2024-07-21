const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const attRouter = express.Router();
const prisma = new PrismaClient();

attRouter.use(middlewareOrg);

// Route for getting counts of participants
/* ************** "http://localhost:3000/organization/attendee" ***************/
attRouter.get("/", async (req, res) => {
  const body = req.body;
  const attendee = await prisma.eventManager.findMany({
    where: {
      id: body.event_id,
    },
    include: {
      _count: {
        select: {
          Attendance: true,
        },
      },
    },
  });
});

// Route for getting particular count
/* ************** "http://localhost:3000/organization/attendee/participants" ***************/
attRouter.get("/participants", async (req, res) => {
  const body = req.body;
  const attendee = await prisma.eventManager.findMany({
    where: {
      id: body.event_id,
    },
    include: {
      Attendance: {
        select: {
          id,
          user: {
            select: {
              firstname,
              lastname,
              contact,
              email,
              age,
              profession,
            },
          },
        },
      },
    },
  });
});

module.exports = { attRouter };
