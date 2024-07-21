const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const prfRouter = express.Router();
const prisma = new PrismaClient();
prfRouter.use(middlewareOrg);

// Fetching user data from database
const userData = async (id) => {
  const user = await prisma.organizer.findFirst({
    where: {
      id: id,
    },
    select: {
      company_name,
      contact,
      email,
      password,
    },
  });

  return user;
};

// Route for getting profile
/* ************** "http://localhost:3000/organization/profile" ***************/
prfRouter.get("/", async (req, res) => {
  const user = userData(req.userId);

  res.status(responseCode.Success).json({
    message: "Your profile",
    user: user,
  });
});

// Route for updating profile
/* ************** "http://localhost:3000/organization/profile/update" ***************/
prfRouter.put("/update", async (req, res) => {
  const body = req.body;

  const userUpdate = await prisma.organizer.update({
    where: {
      id: req.userId,
    },
    data: {
      company_name: body.company_name,
      password: body.password,
      contact: body.contact,
      email: body.email,
    },
  });

  if (userUpdate) {
    res.status(responseCode.Success).json({
      message: "Your profile was updated successfully!",
      user: user,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

module.exports = { prfRouter };
