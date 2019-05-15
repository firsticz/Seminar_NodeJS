const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    courseid: {
        type: String,
        required: 'กรุณากรอกข้อมูล'
    },
    coursename: {
        type: String,
        required: 'กรุณากรอกข้อมูล'
    }
});

mongoose.model('Course', courseSchema);