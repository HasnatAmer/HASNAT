var express = require('express');
var router = express.Router();
var path = require ('path');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
// check connection

db.once('open',function () {
    console.log('Conected to database');

});

//check for db errors
db.on('error',function (err) {
    console.log(err);

});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Softtar Blog' });
});


router.get('/add', function(req, res, next) {
    res.render('add');
});


// SCHEMA For Blog
var blog = require('../model/blogmodel');


router.post('/post', function(req, res, next) {

    var v = new blog;
    v.title = req.body.title;
    v.description = req.body.description;

    v.save();
    res.redirect('/bloglists');
});

router.get('/bloglists', function(req, res, next) {
    blog.find().then(function (blogs) {
        res.render('bloglists', {go: blogs});
    });
});


router.get('/delete/:id',function(req,res,next)
{
    var id = req.params.id;
    blog.findOneAndRemove({_id:id}).then(function(doc){
        if(doc){
            console.log('Congratulations this object is removed:   ' +doc);
            res.redirect('/bloglists');
        }
    })
});


router.get('/editblog/:id', function(req, res, next) {
    var id = req.params.id;
    blog.findOne({_id: id}).then(function (doc, err) {

        if (err) {
            console.log('We canT match id with database to edit');
            console.log(err);
            res.redirect('/');
        }
        else {
            // console.log(doc);
            res.render('edited',{s:doc});
        }
    })


    router.post('/donewithediting/:id', function (req, res, next) {

        blog.findOne({_id: req.params.id}).then(function (doc) {
            // new values
            doc.title = req.body.title;
            doc.description = req.body.description;

            doc.save().then(function (idea) {

                res.redirect('/bloglists');
            })
        });
    });

})

    module.exports = router;
