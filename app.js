const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./router/user');

app.use(cors());

mongoose.connect('mongodb+srv://your_username:password@npm-p0czx.gcp.mongodb.net/test?retryWrites=true&w=majority',
    { 
      useNewUrlParser:true,
      useFindAndModify:false,
      useCreateIndex:true,
      useUnifiedTopology: true 
    }
);

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/user', userRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err,req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error:{
            message:err.message
        }
    });
});

module.exports = app;