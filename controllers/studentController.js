const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student = mongoose.model('Student')

router.get('/', (req, res) =>{
    res.render("student/addOrEdit", {
        viewTitle : "Insert Student",
        next: 'student/list'
    });
});

router.post('/', (req, res) =>{
    if(req.body._id == '')
        insertstudent(req, res);
    else
        updatestudent(req, res);
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
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle : "Insert Student",
                    student: req.body,
                    next: 'student/list'
                });
            }
            else{
                console.log('Error during record insertion: ' +err);
            }
            
        }
    });
    
}

function updatestudent(req, res){
    Student.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc)=>{
        if(!err){
            res.redirect('student/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle : "Insert Student",
                    student: req.body
                });
            }
            else{
                console.log('Error during record insertion: ' +err);
            }
        }
    });
}

router.get('/list', (req, res)=> {
    Student.find((err, docs)=>{
        if(!err){
            res.render("student/list", {
                list: docs
            });
        }
        else{
            console.log('Error in retrieving student list :'+ err);
        }
    });
});

function handleValidationError(err, body){
    for(field in err.errors){
        switch (err.errors[field].path) {
            case 'historyid':
                body['historyidError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) =>{
   Student.findById(req.params.id, (err, doc)=>{
       if(!err){
           res.render("student/addOrEdit", {
               viewTitle: "Update Student",
               student: doc,
               next: "list"
           });
       }
   });
});

router.get('/delete/:id', (req, res)=>{
    Student.findByIdAndDelete(req.params.id, (err, doc)=>{
        if(!err){
            res.redirect('/student/list');
        }
        else{
            console.log('Error in student delete :'+ err);
        }
    });
})

module.exports = router;