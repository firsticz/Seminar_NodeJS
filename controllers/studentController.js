const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student = mongoose.model('Student')
var Course = mongoose.model('Course')

router.get('/', (req, res) =>{
    Course.find((err, docs)=>{
        if(!err){
            res.render("student/addOrEdit", {
                viewTitle : "เพิ่มรายวิชาที่ตกค้าง",
                next: 'student/list',
                list: docs
            });
        }
        else{
            console.log('Error in retrieving student list :'+ err);
        }
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
    student.term = req.body.term;
    student.year = req.body.year;
    student.grade = req.body.grade;
    student.courseid = req.body.courseid;
    student.save((err, doc)=>{
        if(!err)
            res.redirect('student/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                Course.find((err, docs)=>{
                    res.render("student/addOrEdit", {
                        viewTitle : "เพิ่มรายวิชาที่ตกค้าง",
                        student: req.body,
                        next: 'student/list',
                        list : docs
                    });
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
                Course.find((err, docs)=>{
                    res.render("student/addOrEdit", {
                        viewTitle : "แก้ไขรายวิชาที่ตกค้าง",
                        student: req.body,
                        list : docs
                    });
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
            case 'term':
                body['termError'] = err.errors[field].message;
                break;
            case 'year':
                body['yearError'] = err.errors[field].message;
                break;
            case 'grade':
                body['gradeError'] = err.errors[field].message;
                break;
            case 'courseid':
                body['courseidError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

function getcourse(err, res) {
    var doc = new Array();
    Course.find((err, docs)=>{
        doc = docs;
    });
    return doc;
    
}

router.get('/:id', (req, res) =>{
   Student.findById(req.params.id, (err, doc)=>{
       if(!err){
            Course.find((err, docs)=>{
                res.render("student/addOrEdit", {
                    viewTitle: "แก้ไขรายวิชาที่ตกค้าง",
                    student: doc,
                    next: "list",
                    list : docs
                });
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