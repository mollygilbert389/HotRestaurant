
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
  {
    routeName: "Molly G",
    name: "Molly Gilbert",
    phoneNumber: "555-000-0000",
    email: "mollyiscool@gmai.com",
    id: "Molly G"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//shows you where to make reservatios
app.get("/makeReso", function(req, res) {
  res.sendFile(path.join(__dirname, "makeReso.html"));
});

//shows current reservations
app.get("/reso", function(req, res) {
    res.sendFile(path.join(__dirname, "reso.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays a single reservation, or returns false
app.get("/api/reservations/:reservation", function(req, res) {
  var resoMaker = req.params.reservation;

  console.log(resoMaker);

  for (var i = 0; i < reservations.length; i++) {
    if (resoMaker === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newreso = req.body;

  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newreso.routeName = newreso.name.replace(/\s+/g, "").toLowerCase();

  console.log(newreso);

  reservations.push(newreso);

  res.json(newreso);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
