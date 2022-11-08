const express = require("express");
const app = express();

const port = process.env.PORT || 5005;

app.use("/", (req, res)=> {
    res.send("Portfolio Maker Api working!");
});

app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`);
});