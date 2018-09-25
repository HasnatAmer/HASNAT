var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema
({

    title:{type: String},
    description:{type: String},


});

var blog = module.exports=mongoose.model('softtarmodel', blogSchema);