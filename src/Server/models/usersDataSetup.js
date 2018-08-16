
var todo = require('../models/user.model');

module.exports = function(app){

    app.get('/api/setupdata',function(req,res){

    dataset = [
        {
            name: "ram",
            address : "mumbai",
            memberOfGroups  : []
        },
        {
            name: "ajay",
            address : "pune",
            memberOfGroups  : [] 
        }
        ,{
            name: "karan",
            address : "hyderabad",
            memberOfGroups  : [] 
        },
        {
            name: "arjun",
            address : "mysore",
            memberOfGroups  : [] 
        }
    ]
    todo.create(dataset,function(err,results){

        if(err) throw err;
        console.log(results);
        res.send("data setup is successfull");

        
    });
});
};



// {
//     "_id" : ObjectId("5b7425733a65fa27e82ce029"),
//     "memberOfGroups" : [],
//     "name" : "prabhat",
//     "address" : "mumbai"
// }