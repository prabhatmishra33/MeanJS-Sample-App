const express = require('express');
const router = express.Router();
var mongo = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
var users = require('../models/user.model');
var groups = require('../models/groups.model');
var todo = require('../models/usersDataSetup');
//const axios = require('axios');


/*
* MongoDB Connection
*/
var db = mongo.connect("mongodb://localhost:27017/sampleDB", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to MongoDB'); 
  }  
});  

//Setup data
todo(router);

/**
 * add user to the user collection
 */

router.post("/api/SaveUser",function(req,res){   
  //console.log(req.body);
    let usrName = req.body.name;
    let usrAddr = req.body.address;
    var newUsr = users({
      name : usrName,
      address : usrAddr,
      groups :  []
    });
    newUsr.save(function(err,data){  
       if(err){  
          res.send(err);                
       }  
       else{        
           res.send({data:"Record has been Inserted..!!"});  
       }  
  });
});


/**
 *  Create Group 
*/
router.post("/api/createGroup",function(req,res){
  //console.log(req.body)   
  let grpName = req.body.groupName;
  var group = groups({
     groupName : grpName ,
     members :  []
    });
  group.save(function(err,data){  
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send(data.id);  
      }  
  });
});


/**
 *  Add user to the group collection
*/

router.post("/api/addUser",function(req,res){   
  //console.log(req.body)
  var grpId = mongo.Types.ObjectId(req.body.grpId);
  var usrCollId = mongo.Types.ObjectId(req.body.usrID);
  var usrSrNo = req.body.seqNo;
  var member ={
    "usrId" : usrCollId,
    "seqNo": usrSrNo
  }
  groups.update(
    { _id : grpId }, 
    { $push: { members : member } },function(err,data){
      if(err){  
        res.send(err);                
     }  
     else{     
        console.log("success");   
         res.send({data:"Record has been Inserted..!!"});  
     }
    }
);
});



router.post("/api/addGrpToUsr",function(req,res){   

  //console.log(req.body)
  var usrName = req.body.name;
  var grpId = mongo.Types.ObjectId(req.body.grpId);
  users.update(
    { name : usrName }, 
    { $push: { memberOfGroups:grpId } },function(err,data){
      if(err){  
        res.send(err);                
     }  
     else{     
        console.log("success");   
         res.send({data:"grp id pushed to usr details !!"});  
     }
    }
);
});

/*
* delete user from the group collections
*/
router.post("/api/remUsrFrmGrp",function(req,res){  
  groups.update(
    { _id: ObjectId('5b6f485b4806f645502b098d') },
    { $pull: { 'members': { user : ObjectId('5b6f28e7a01859456c0a7151') } } },function(err,data){
      if(err){  
        res.send(err);                
    }  
    else{        
        res.send({data:"User removed from group..!!"});  
    }
    }
  );
});

// app.delete('/api/deleteUser',function(req,res){
//   Todos.findByIdAndRemove(req.body.id,function(err){
//       if(err) throw err
//       res.send('Data deleted Successfully');
//       console.log('Data deleted Successfully');
//   })
// })

/*
* get user from the group collections
*/


router.get("/api/getUsrGrps",function(req,res){
  //console.log(req.query);
  var userName=req.query.userName;
 // console.log(userName+ '== userName ==')
  users.findOne({'name':userName})
    .populate({
      path:'memberOfGroups'
    })
    .exec(function(err,docs){
        if(err){
          console.log('error');
          throw err;
        } else{
          console.log('success');
          res.send(JSON.stringify(docs));
        }
    })
});


// app.get('/api/getUsrFrmGrps',function(req,res){
//   groups.find({ 'groupName' : 'Mystic 1106' },function(err,result){
//       if(err) throw err;
//       res.send(result).toJSON();
//   });
// });



/*
* Get the count of member present in the group
*/

router.get('/api/memCountGRp/:crtgroupId',function(req,res){

  var grpId = mongo.Types.ObjectId(req.params.crtgroupId)
  groups.findById({ _id : grpId },function(err,result){
      if(err) throw err;
      res.send(JSON.stringify(result));
  });
});


/*
* get all users of db
*/

router.get('/api/allUsers',function(req,res){
    
    users.find({ },function(err,result){
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
  });




module.exports = router;