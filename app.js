const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('useCreateIndex', true);


const donorsRoutes = require('./api/routes/donors');
const postsRoutes = require('./api/routes/posts');
const commentRoutes = require('./api/routes/comments');
const feedbackRoutes = require('./api/routes/feedback');
const bloodRequestRoutes = require('./api/routes/blood_requests');
const campRoute = require('./api/routes/donation_camps');
const donationConfirm = require('./api/routes/donation_confirm');
const articles = require('./api/routes/articles');
const hospitels = require('./api/routes/users');
const donatioRecord = require('./api/routes/donationrecords');
const answers = require('./api/routes/answers');
const tasks = require('./api/routes/todo');
const group = require('./api/routes/group');
const admin = require('./api/routes/admin');




/* atlas database connection

mongoose.connect('mongodb+srv://manojkasun:' + process.env.MONGO_ATLAS_PW + '@blooddonation-ktp6o.mongodb.net/bloodDonation?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); */


mongoose.connect("mongodb://localhost:27017/AirlineDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: true,
    credentials: true
}
app.options('*', cors(corsOptions));
//set access to all  connect to this api
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        Response.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/users', donorsRoutes);
app.use('/posts', postsRoutes);
app.use('/comment', commentRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/bloodrequest', bloodRequestRoutes);
app.use('/donationcamps', campRoute);
app.use('/donationconfirm', donationConfirm);
app.use('/articles', articles);
app.use('/hospitels', hospitels);
app.use('/donationrecords', donatioRecord);
app.use('/solutions', answers);
app.use('/task', tasks);
app.use('/group', group);
app.use('/admin', admin);




app.use((req, res, next) => {
    const error = new error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;