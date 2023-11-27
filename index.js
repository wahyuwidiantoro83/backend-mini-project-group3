require("dotenv").config();
const PORT = process.env.PORT || 2066;
const express = require("express");
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token");
app.use(cors());
app.use(express.json());
app.use(bearerToken());

const { authsRouter, accountDetailRouter } = require("./Routes");
app.use("/auths", authRouter);
app.use("/accountDetail", accountDetailRouter);
app.use("/public", express.static("public"));

//Define Route
const { eventRouter, categoryRouter, cityRouter } = require("./Routes");
app.use("/event", eventRouter);

app.use("/category", categoryRouter);

app.use("/city", cityRouter);

app.use("/public", express.static("public"));

app.use((error, req, res, next) => {
  return res.status(error.rc || 500).send(error);
});

app.listen(PORT, () => {
  console.log("API IS ACTIVE PORT:", PORT);
});
