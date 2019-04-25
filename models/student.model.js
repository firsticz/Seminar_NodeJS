const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    historyid: {
        type: String
    },
    term: {
        type: String
    },
    year: {
        type: String
    },
    grade:{
        type: String
    },
    studentid: {
        type: String
    },
    courseid: {
        type: String
    }
});

mongoose.model('Student', studentSchema);