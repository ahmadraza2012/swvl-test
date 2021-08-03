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

// show logs
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}

// Swagger-Doc congigurations & path.
const swaggerUi = require("swagger-ui-express"),
	swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


var users = [
	{ id: "1", name: "ahmad", companies: ["Company1", "Company2"] },
	{ id: "2", name: "raza", companies: ["Company1", "Company2"] },
	{ id: "3", name: "zain", companies: ["Company1", "Company2"] },
];

async function getResponses(req, res, next) {
	try {
		res.send({ users: users });
	} catch (err) {
		console.error(err);
		res.status(500);
	}
}

async function getResponse(req, res, next) {
	try {
		const { id } = req.params;
		console.log(`start finding id = ${id}`);
		const user = users.find((u) => u.id == id) || {};
		res.status(200).send(user);
	} catch (err) {
		console.error(err);
		res.status(500);
	}
}

async function saveResponse(req, res, next) {
	try {
		const { id, name, age } = req.body;
		users.push({ id, name, age });
		res.status(201).send({ id, name, age });
	} catch (err) {
		console.error(err);
		res.status(500);
	}
}

async function updateResponse(req, res, next) {
	try {
		res.status(200).send({ test: "swvl" });
	} catch (err) {
		console.error(err);
		res.status(500);
	}
}

async function deleteResponse(req, res, next) {
	try {
		res.status(204).send({ test: "swvl" });
	} catch (err) {
		console.error(err);
		res.status(500);
	}
}

app.get("/user", getResponses);
app.get("/user/:id", getResponse);
app.post("/user", saveResponse);
app.put("/user/:id", updateResponse);
app.delete("/user/:id", deleteResponse);


// throw 404 if URL not found
app.all("*", function(req, res) {
	return res.status(404).send("Page not found");
});

app.listen(PORT, () => {
	console.log(`app is listening on ${PORT}`);
});
