const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    term: {
        type: String,
        required: 'กรุณากรอกข้อมูล'
    },
    year: {
        type: String,
        required: 'กรุณากรอกข้อมูล'
    },
    grade:{
        type: String,
        required: 'กรุณากรอกข้อมูล'
    },
    courseid: {
        type: String,
        required: 'กรุณากรอกข้อมูล'
    }
});

mongoose.model('Student', studentSchema);