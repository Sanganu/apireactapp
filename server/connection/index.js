const dbORM = require('mongoose')
dbORM.connect(process.env.MONGO_URI || "mongodb://localhost/graphqldemoapp",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
},(err,status) => {
    if (err) {
         console.log("Error in connecting to Mongodb")
    }
    else{
        console.log("MongoDB connection --",status)
    }

});

module.exports = dbORM.connection;
