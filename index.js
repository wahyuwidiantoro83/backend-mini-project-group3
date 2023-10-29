const express = require("express");
const app = express();
const PORT = 2023;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const EventRoute = require("./Routes/EventRoute");
app.use("/event", EventRoute);

app.listen(PORT, () => {
  console.log("API IS ACTIVE PORT:", PORT);
});
