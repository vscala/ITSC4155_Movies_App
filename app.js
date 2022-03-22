const express = require('express');
const mainRoutes = require('./routes/mainRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes');

const app = express();

let port = 5050;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use('/', mainRoutes);
app.use('/showtimes', showtimeRoutes);

app.listen(port, host, () => {
    console.log('Server is running on port ', port);
});