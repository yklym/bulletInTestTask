const express = require('express');
const mongoose = require("mongoose");

const {port} = require("./config");

app = express();

app.use(express.json());

// For DEPLOY
// const path = require('path');
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });


const apiRouter = require('./routes/index');

app.use('/api/v1/', apiRouter);


const dbUrl = process.env["MONGODB_URI"];
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

mongoose.connect(dbUrl, connectOptions)
    .then(() => console.log('Mongo database connected'))
    .catch((e) => console.log('ERROR: Mongo database not connected\n' + e));

app.listen(port, () => console.log('App is listening on port ' + port));
// app.listen(port);