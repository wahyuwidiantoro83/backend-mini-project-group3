require("dotenv").config();
const PORT = process.env.PORT || 2066;
const express = require("express");
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token");
app.use(cors());
app.use(express.json());
app.use(bearerToken());

const { authRouter, accountDetailRouter } = require("./Router");
app.use("/auth", authRouter);
app.use("/accountDetail", accountDetailRouter);
app.use("/public", express.static("public"));

app.listen(PORT, () => {
  console.log("API IS ACTIVE PORT:", PORT);
});
