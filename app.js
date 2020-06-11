const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');

const app = express();

require('./config/passport')(passport);

// Database
const db = require('./config/keys').MongoURI;
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected.'))
.catch(err => console.log(err));

// Views
app.use(expressLayouts);
app.set('view engine', 'ejs')

// Parser
app.use(express.urlencoded({
    extended: false 
}));

// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
})

// Routes
const router = express.Router();
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
