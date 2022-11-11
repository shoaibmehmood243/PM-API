const express = require("express");
const app = express();
const dotenv = require("dotenv");
const Db = require("./src/Utilities/dbConn");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/Routes/auth.routes");

dotenv.config({path: './.env'});
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
Db();

app.get("/", (req, res)=> {
    res.send("Portfolio Maker Api working!");
});

app.use("/auth", authRoutes);

app.use((req, res, next)=>{
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    if(err.isJoi) err.status = 422;
    return res
    .status(err.status || 500)
    .send({
        error: {
            status : err.status || 500,
            message : err.message
        }
    });
})

const port = process.env.PORT || 5005;

app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`);
});