var path = require("path");

module.exports = function(app) {
      
      app.get("/reserve", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/reserve.html"));
      });
      
      app.get("/tables", function(req, res) {
          res.sendFile(path.join(__dirname + "/../public/tables.html"));
      });
      
      // Displays all reservations
      app.get("/api/reservations", function(req, res) {
        return res.json(reservations);
      });

      app.use(function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
      });

}