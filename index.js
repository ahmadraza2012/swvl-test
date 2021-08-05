/* eslint-disable no-unused-vars */
const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());
require('dotenv').config();
// show logs
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

// Swagger-Doc congigurations & path.
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Dont forget to create router file and move only endpoint into it.
// start
const notifyController = require("./controllers/notifiy.controller");
const { Notify } = require("./validators/notify.validators");

app.post("/notify", Notify, notifyController.sendNotification);

// end

// throw 404 if URL not found
app.all("*", function (req, res) {
  return res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
