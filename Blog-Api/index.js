const express = require('express');
const db = require("./config/db");

const port = 2580;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/", require("./routes/indexRoute"));

app.listen(port, (err) => {
    if (err) {
        console.log("Server failed to connect:", err);
        return;
    }
    console.log(`Server is connected successfully on port ${port} ✅`);
});
