const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { sendResponse } = require('./services/helper');
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const mongoConnect = require('./services/db');
mongoConnect()

const authRouter = require('./src/routes/auth');
const blogRouter = require('./src/routes/blog');
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  sendResponse(res, 404, 'Url not found!', null);
});


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})