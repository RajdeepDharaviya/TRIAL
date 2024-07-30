const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middleware } = require("../../middlewares/middleware");
const { responseCode } = require("../../config");
const md5 = require("md5");
const prfRouter = express.Router();
const prisma = new PrismaClient();
prfRouter.use(middleware);

// Fetching user data from database
const userData = async (id) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      firstname: true,
      lastname: true,
      email: true,
      contact: true,
      age: true,
      profession: true,
    },
  });

  return user;
};

// Route for getting profile
/* ************** "http://localhost:3000/user/" ***************/
prfRouter.get("/", async (req, res) => {
  const user = await userData(req.userId);

  res.status(responseCode.Success).json({
    message: "Your profile",
    user: user,
  });
});

// Route for updating profile
/* ************** "http://localhost:3000/user/profile/update" ***************/
prfRouter.put("/update", async (req, res) => {
  const body = req.body;

  const userUpdate = await prisma.user.update({
    where: {
      id: req.userId,
    },
    data: {
      age: body.age,
      profession: body.profession,
      password: md5(body.password),
      firstname: body.firstname,
      lastname: body.lastname,
      contact: body.contact,
    },
  });

  if (userUpdate != []) {
    res.status(responseCode.Success).json({
      message: "Your profile was updated successfully!",
      user: userUpdate,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

module.exports = { prfRouter };
