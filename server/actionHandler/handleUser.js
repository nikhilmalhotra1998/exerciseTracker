const mongoose=require('mongoose');
const User=require('../models/userModel').User;

const allUsers=function(req,res){
  User.find({},(err, data) => {
  
    if(!data.length){
      res.send("No Data Present!");
    }
    else if(err){
      res.send(err);
    } else {
  //     let arr=data.map(item=>{
  //       return(
  //         {"username": item.user,
  // "description": item.description,
  // "duration": item.duration,
  // "_id": item._id,
  // "date": new Date(item.date).toDateString()}
  //       )
  //     })

      res.json(data);
    }
  });
}


const saveUser=function(req,res){
  const username=req.body.username;
  
  User.findOne({"username": username},(err,data)=>{
 
    if(err){
      console.log(err);
      res.json({"Error" :"Server Error"});
    }
    if(data===null){
      let newUser=new User({"username": username})
        newUser.save(function(err, data){
        
   
      res.send({"username": username, "_id": data.id});
    });
    
    }
    else {
      res.json({"status":"user already present", "username": data.username, "_id": data.id});
    }
  })
}

module.exports = { saveUser: saveUser,allUsers:allUsers}