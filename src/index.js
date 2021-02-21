require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');



const { database } = require('./keys');

// Intializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars').default
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'mysqlnode',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/asignaturas', require('./routes/asignaturas'));


// Public
app.use(express.static(path.join(__dirname, 'public')));

app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

var hbs = exphbs.create({});

hbs.handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

  var operators, result;
  
  if (arguments.length < 3) {
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }
  
  if (options === undefined) {
      options = rvalue;
      rvalue = operator;
      operator = "===";
  }
  
  operators = {
      '==': function (l, r) { return l == r; },
      '===': function (l, r) { return l === r; },
      '!=': function (l, r) { return l != r; },
      '!==': function (l, r) { return l !== r; },
      '<': function (l, r) { return l < r; },
      '>': function (l, r) { return l > r; },
      '<=': function (l, r) { return l <= r; },
      '>=': function (l, r) { return l >= r; },
      'typeof': function (l, r) { return typeof l == r; }
  };
  
  if (!operators[operator]) {
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }
  
  result = operators[operator](lvalue, rvalue);
  
  if (result) {
      return options.fn(this);
  } else {
      return options.inverse(this);
  }

});

hbs.handlebars.registerHelper('Promedio', function(arr){
   let average = arr[0].grade*(arr[0].percentage/100);

   for(  i = 1; i < arr.length; i++ )
   {
      average += arr[i].grade*(arr[i].percentage/100);
   }

  

   average = average.toString();
    return parseFloat(average).toFixed(2);

});

hbs.handlebars.registerHelper('PromedioGanado', function(arr,options){
  let average = arr[0].grade*(arr[0].percentage/100);

  for(  i = 1; i < arr.length; i++ )
  {
     average += arr[i].grade*(arr[i].percentage/100);
  }

  if( average >=3 )
     return options.fn(this);
  else
     return options.inverse(this);
  

});

hbs.handlebars.registerHelper('PromedioPerdido', function(arr, options){
  let average = arr[0].grade*(arr[0].percentage/100);

  for(  i = 1; i < arr.length; i++ )
  {
     average += arr[i].grade*(arr[i].percentage/100);
  }

 

  if( average < 3 )
     return options.fn(this);
  else
    return options.inverse(this);

});


const validatorOptions = {
  customValidators: {
    greaterThanOrEqual:(inputParam, minValue) =>{
      return inputParam >= minValue;
    },
     lessThanOrEqual: (inputParam, maxValue) =>{
       return inputParam <= mamxValue;
     }
  }
};

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});
