var mongo = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
var Schema = mongo.Schema;  

/*
* Group Schema
*/
  
var GroupsSchema = new Schema({

    groupName : { type : String },
    members : [
      {
        usrId : Schema.ObjectId,
        seqNo:  Number
      }
   ]
  },
  { versionKey: false });  
     
var groups = mongo.model('groups', GroupsSchema); 

module.exports = groups


  