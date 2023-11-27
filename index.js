const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 2066;
const app = express();
const cors = require("cors");
const bearer = require("express-bearer-token");
app.use(cors());
app.use(express.json());

// const EventRoute = require("./Routes/EventRoute");
const {promotorRouter} = require("./Routes")

// app.use("/event", EventRoute);
app.use(bearer());
app.use("/promotor", promotorRouter);

app.use("/public", express.static("public")); 

app.use((error, req,res, next)=> {
  console.log(error);
  return res.status(error.rc||500).send(error)
})

app.listen(PORT, () => {
  console.log("API IS ACTIVE PORT:", PORT);
});
