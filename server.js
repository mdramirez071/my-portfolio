const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');


dotenv.config();
const app = express();


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//this is for adding in bootstrap. 

app.use(express.static('public'))
//Here we need to setup the views directory for this project
//this is to let the application where to find the actual files for our template
app.set('views', './views');

//Here we're setting the default engine to be ejs
//nnote we don't need to require it,m express will do that
app.set('view engine', 'ejs');

//Now instead of using red.send we can use
//res.render to send the output of the template by using the actual filename called 'index
app.get('/', (req,res) => {
    const data = {
        person: {
            firstName: 'Michael',
            lastName: 'Ramirez',
        }
    }
    //Notice now the data is the second argument passed to the template render method
    res.render('index', data);
});

// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })
//Created this favicon route in order to try and address the deployment issue with Heroku
  app.get('/favicon.ico', (req,res) => {
    //Notice now the data is the second argument passed to the template render method
    res.send('No favicon detected').status(200);
});
  
//Eliminated /contact and /thanks route since all information will be handled by the / route.
//GET method for contact route
  // app.get('/contact', (req, res) => {
  //   res.render('contact');
  // });

  // //TEST GET method for thanks route
  // app.get('/thanks', (req, res) => {
  //   res.render('thanks', { contact: req.body })
  // });


//POST method for thanks route
  app.post('/thanks', (req, res) => {
    res.render('thanks', { contact: req.body })
    const { firstName, lastName, email } = req.body;
  
    //sends form data to Google Sheets
    let formData =
      'firstName=' + encodeURIComponent(firstName) +
      '&lastName=' + encodeURIComponent(lastName) +
      '&email=' + encodeURIComponent(email)
    //   '&subject=' + encodeURIComponent(subject) +
    //   '&message=' + encodeURIComponent(message);
  
    const scriptURL = process.env.SCRIPT_URL.toString();
  
    axios({
        method: 'post',
        url: scriptURL,
        data: formData
      })
      .catch(error => console.error('Error!', error.message));
  
    //thanks the contact by name
    const contact = { firstName, lastName };
    console.log(contact);
  
    res.render('thanks', { contact });
  });

  // Catch and handle everything else
  app.get('*', function (req, res) {
    res.send('Sorry, this page does not exist').status(404);
  })
var port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
    console.log('listening at http://localhost:8080');
});