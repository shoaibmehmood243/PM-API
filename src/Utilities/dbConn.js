const mongoose = require("mongoose");

const Db = ()=> {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(()=> console.log("Database connected successfully..."))
    .catch((err)=> console.log(err))
}

module.exports = Db;