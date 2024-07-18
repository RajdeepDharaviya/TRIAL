const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const middleware = async (req, res, next) => {
  const authorize = req.headers.authorization;
  const data = authorize.split(" ");
  if (authorize && data[0] == "Bearer") {
    const info = jwt.verify(data[1], "mySecret");
    const verified = await prisma.User.findFirst({
      where: {
        email: info.email,
      },
    });

    if (verified != []) {
      req.userId = info.id;
      next();
    }
  } else {
    res.send("Not authorized!");
  }
};

const middlewareOrg = async (req, res, next) => {
  const authorize = req.headers.authorization;
  const data = authorize.split(" ");
  if (authorize && data[0] == "Bearer") {
    const info = jwt.verify(data[1], "mySecret");
    const verified = await prisma.organizer.findFirst({
      where: {
        email: info.email,
      },
    });

    if (verified != []) {
      req.userId = info.id;
      next();
    }
  } else {
    res.send("Not authorized!");
  }
};

module.exports = { middleware, middlewareOrg };
