const express = require('express');
const data = require('./data');

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));


/**
 * route handlers
 **/
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
    res.render('project');
});


/* GET generated error route - create and throw 500 server error */
app.get('/error', (req, res, next) => {

    // Log out custom error handler indication
    console.log('Custom error route called');
  
    const err = new Error();
    err.message = `Custom 500 error thrown`
    err.status = 500;
    throw err;
  });
  

/**
 * 404 error handler
 **/

app.use((req, res, next) => {
    console.log('404 error handler called');
    res.status(404).render('page-not-found');
});

/**
 * global error handler
 **/
app.use((err, req, res, next) => {
    if (err) {
        console.log('Global error handler called', err);
    }

    if ( err.status === 404 ) {
        res.status(404).render('page-not-found', { err });
      } else {
        err.message = err.message || `Oops! It looks like something went wrong on the server.`;
        res.status(err.status || 500).render('error', { err });
      }});



app.listen(3000, () => {
    console.log('The application is running on localhost:4000!')
});