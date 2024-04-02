console.log("Welcome tos server");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(port, () => console.log(`Server listening on ${port}`));
