var express = require("express")
var PORT = process.env.PORT || 8088;
var app = express()

app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");
app.use(routes)

app.listen(PORT, function () {
    console.log("App is listening on: http://localhost:" + PORT)
})