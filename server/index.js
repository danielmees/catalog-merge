const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors());

const fs = require("fs");

app.use(express.json());

app.post('/api/send-catalog', (req, res) => {
    if (req.body && req.body.csvData) {
      fs.writeFile("src/output/result_output.csv", req.body.csvData, (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(400);
    }
});

app.listen(3000, () => console.log("Server is Listening on port 3000")); 