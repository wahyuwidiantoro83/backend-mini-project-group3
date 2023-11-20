const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 2066;
const app = express();
const cors = require("cors");
const bearer = require("express-bearer-token");
app.use(cors());
app.use(express.json());
app.use(bearer());

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
