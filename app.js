const express = require('express');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

let port = 5050;
let host = 'localhost';
app.set('view engine', 'ejs');

app.listen(port, host, () => {
    console.log('Server is running on port ', port);
});


app.use('/', mainRoutes);