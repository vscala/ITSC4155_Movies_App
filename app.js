const express = require('express');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

let port = 5050;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use('/', mainRoutes);

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    //console.log(error.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});

app.listen(port, host, () => {
    console.log('Server is running on port ', port);
});