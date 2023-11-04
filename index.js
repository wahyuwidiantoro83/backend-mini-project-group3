const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 2066;
const app = express();
const cors = require("cors");
const bearer = require("express-bearer-token");
app.use(cors());
app.use(express.json());
app.use(bearer());

app.listen(PORT, () => {
  console.log("API IS ACTIVE PORT:", PORT);
});
