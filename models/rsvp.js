const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    rsvp: {type:String, required:[true, 'RSVP is required']},
    user: {type:Schema.Types.ObjectId, ref:'User', required:[true, 'User is required']},
    showtime: {type:Schema.Types.ObjectId, ref:'Showtime', required:[true, 'Showtime is required']}
}, 
{timestamps:true}
);

module.exports = mongoose.model('Rsvp', rsvpSchema);