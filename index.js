const express = require("express");
const { userRouter } = require("./routes/user");
const { orgRouter } = require("./routes/organizer");
const bodyParser = require("body-parser");
const app = express();
// const cors = require("cors");
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/organization", orgRouter);

app.listen(3000, () => {
  console.log("Server started at 3000");
});
