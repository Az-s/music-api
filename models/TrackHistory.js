const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    userId: {
        type: String
    },
    trackId: {
        type: String,
        required: true
    },
    datetime: {
        type: String
    }
});



const History = mongoose.model('History', HistorySchema);

module.exports = History;