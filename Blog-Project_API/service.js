const express = require("express");

const PORT = 2580;

const app = express(); 

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not connected ❌");
        return;
    }
    console.log("Server is connected ✅ Listening on port", PORT);
});
