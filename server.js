const express = require('express');
const app = express();

// Enable CORS so freeCodeCamp's test suite can test your API remotely
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Helper function to process dates
const processDate = (dateString, res) => {
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    // Check if the input is a pure numeric Unix timestamp
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Check if date is invalid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
};

// 1. Route for empty date parameter (/api)
app.get("/api", (req, res) => {
  processDate(null, res);
});

// 2. Route for provided date parameter (/api/:date)
app.get("/api/:date", (req, res) => {
  processDate(req.params.date, res);
});

// Listen for requests
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});