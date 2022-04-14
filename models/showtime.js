const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showtimeSchema = new Schema({
    genre: {type: String, required: [true, 'text is required']},
    eventName: {type: String, required: [true, 'title is required']},
    author: {type: Schema.Types.ObjectId, ref:'User'},
    hostName: {type: String, required: [true, 'host is required']},
    details: {type: String, required: [true, 'details are required'], 
              minLength: [10, 'Details should have at least 10 characters']},
    location: {type: String, required: [true, 'location is required']},
    date: {type: String, required: [true, 'date is required']},
    startTime: {type: String, required: [true, 'start-time is required']},
    endTime: {type: String, required: [true, 'end-time is required']},
    image: {type: String, required: [true, 'url is required']},

},
{timestamps: true}
);


module.exports = mongoose.model('Showtime', showtimeSchema);