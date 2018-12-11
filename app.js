const express = require('express');
const path = require('path');//to access a public folder
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const ideasroute = require('./routes/ideas');
const usersroute = require('./routes/users');
const indexroute = require('./routes/indexpage');
const aboutroute = require('./routes/aboutpage');
const app = express();

//Map global Promise - remove warning
mongoose.Promise = global.Promise;

// Load Database config
const db = require('./config/database');

//Connect to Mongo Locally
mongoose.connect(db.MongoURI, {
    //useMongoClient:true
})
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch(err => {
        console.log(err);
    });

//epress-Handlebars Middelware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');




//Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//MethodOverride middleware
app.use(methodOverride('_method'));

//Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true//,
    //cookie: { secure: true }
  }));

//passport middleware-should be after session middleware
app.use(passport.initialize());
app.use(passport.session());


  //connect Flash middleware
  app.use(flash());

  //Global variables
  app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

//Routes
//use routes
app.use('/ideas',ideasroute);
app.use('/users',usersroute);
app.use('/',indexroute);
app.use('/about',aboutroute);

// passport config
require('./config/passport')(passport);


const PORT =  5000;
app.listen(PORT, () => {
    console.log(`The Server started on Port ${PORT}`);
});