const {DateTime} = require('luxon');
const {v4:uuidv4} = require('uuid');

// id, title, genre, location, details, date, startTime, endTime, hostName, image

const showtimes = [
    {
        id: '1',
        eventName: 'Space Jam: A New Legacy',
        genre: 'Comedy',
        location: 'Popp Martin Student Union',
        details: 'A rogue artificial intelligence kidnaps the son of famed basketball player LeBron James, who then has to work with Bugs Bunny to win a basketball game.',
        date: 'April 1',
        startTime: '8:00 pm',
        endTime: '10:30 pm',
        hostName: 'Popp Martin Student Union',
        image: 'https://localist-images.azureedge.net/photos/39325038062560/big_square/26d29df776dff74618c22c7f4e201a839d06559f.jpg'
    },
    {
        id: '2',
        eventName: 'A sad movie',
        genre: 'Studying',
        location: 'This is where the event will be',
        details: 'Here are the event details',
        date: 'This is the date',
        startTime: 'This the start time',
        endTime: 'This the end time',
        hostName: 'Host Name',
        image: 'Here goes an image'
    },
    {
        id: '3',
        eventName: 'A big movie',
        genre: 'Studying',
        location: 'This is where the event will be',
        details: 'Here are the event details',
        date: 'This is the date',
        startTime: 'This the start time',
        endTime: 'This the end time',
        hostName: 'Host Name',
        image: 'Here goes an image'
    },
    {
        id: '4',
        eventName: 'A short movie',
        genre: 'Recreation',
        location: 'This is where the event will be',
        details: 'Here are the event details',
        date: 'This is the date',
        startTime: 'This the start time',
        endTime: 'This the end time',
        hostName: 'Host Name',
        image: 'Here goes an image'
    },
    {
        id: '5',
        eventName: 'A huge movie',
        genre: 'Recreation',
        location: 'This is where the event will be',
        details: 'Here are the event details',
        date: 'This is the date',
        startTime: 'This the start time',
        endTime: 'This the end time',
        hostName: 'Host Name',
        image: 'Here goes an image'
    },
    {
        id: '6',
        eventName: 'A dark movie',
        genre: 'Recreation',
        location: 'This is where the event will be',
        details: 'Here are the event details',
        date: 'This is the date',
        startTime: 'This the start time',
        endTime: 'This the end time',
        hostName: 'Host Name',
        image: 'Here goes an image'
    }
];



exports.find = () => showtimes;

exports.findByID = id => showtimes.find(showtime=>showtime.id === id);

exports.save = function(showtime) {
    showtime.id = uuidv4();
    showtimes.push(showtime); 
    console.log(showtime);
};

exports.updateByID = function(id, newShowtime) {
    let showtime = showtimes.find(showtime => showtime.id === id);

    if (showtime) {
        showtime.eventName = newShowtime.eventName;
        showtime.genre = newShowtime.genre;
        showtime.location = newShowtime.location;
        showtime.details = newShowtime.details;
        showtime.date = newShowtime.date;
        showtime.startTime = newShowtime.startTime;
        showtime.endTime = newShowtime.endTime;
        showtime.hostName = newShowtime.hostName;
        showtime.image = newShowtime.image;
        return true;
    } else {
        return false;
    }
};

exports.deleteByID = function(id) {
    let index = showtimes.findIndex(showtime => showtime.id == id);
    if (index != -1) {
        showtimes.splice(index, 1);
        return true;
    } else {
        return false;
    }
};

exports.getGenres = () => {
    let genres = new Set();

    for (i = 0; i < showtimes.length; i++) {
        genres.add(showtimes[i].genre);
    }

    return [...genres]
};