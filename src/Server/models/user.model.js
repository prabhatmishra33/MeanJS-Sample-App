var mongo = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
var Schema = mongo.Schema;  
//var groups = require('./groups.model')

/*
* User Schema
*/
  
var UsersSchema = new Schema({      
    name: { type: String },       
    address: { type: String },
    memberOfGroups : 
        [
            // { groupId : Schema.ObjectId }   
            { type :  Schema.Types.ObjectId , ref: 'groups' }
        ]
   },{ versionKey: false });  
     
var users = mongo.model('users', UsersSchema); 

module.exports = users