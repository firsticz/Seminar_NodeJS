const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student = mongoose.model('Student')

router.get('/', (req, res) =>{
    res.render("student/addOrEdit", {
        viewTitle : "Insert Student"
    });
});

router.post('/', (req, res) =>{
    insertstudent(req, res);
});

function insertstudent(req, res){
    var student = new Student();
    student.historyid = req.body.historyid;
    student.term = req.body.term;
    student.year = req.body.year;
    student.grade = req.body.grade;
    student.studentid = req.body.studentid;
    student.courseid = req.body.courseid;
    student.save((err, doc)=>{
        if(!err)
            res.redirect('student/list');
        else{
            console.log('Error during record insertion: ' +err);
        }
    });
    
}

router.get('/list', (req, res)=> {
    res.json('form list');
});

module.exports = router;