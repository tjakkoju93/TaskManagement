const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5400;

//Middleware
app.use(express.json());

//DB Connection
require("./db/dbConnection");

//model
require("./model/organisationModel.js");
require("./model/taskModel.js");
require("./model/userModel.js");

//required routes

const routes = require("./routes/routes.js");
const orgRouter = require("./routes/organizationRoutes.js");

//routes

app.use("/api/v1/users", routes);
app.use("/api/v1/org", orgRouter);

//listening to port
app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
