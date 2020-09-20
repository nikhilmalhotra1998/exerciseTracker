const mongoose = require('mongoose');

const Exercise = require('../models/exerciseModel').Exercise;
const User = require('../models/userModel').User;

const addExercise = (req,res) => {
  
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  let date = Date.now()

  if(req.body.date){
   
    date=new Date(req.body.date).getTime();
  }
  User.findById((userId), (err, user) => {
    if(err){
      console.log(err);
      res.send("No User found");
    } else if(user===null){
      res.send("No User found");
    }else{
      try{
        const exercise = {
        user: user.id,
        description: description,
        duration: duration,
        date: date,
      }
      
      Exercise.create(exercise, (err, data) => {
        
        if(err){
          res.send(err);
        } else {
          
          res.json({
          "username": user.username,
          "description": data.description,
        
        "duration": data.duration,
        "date": new Date(data.date).toDateString(),
        "_id": data.user
        });
        }
      })
    } catch(err){
      console.log(err)
      res.status(500).json({"reason":"Server Error"})
    }
    }
  })            
}

const searchExercise = (req,res) => {
  
  const user = req.query.userId;
  let fromDate = (new Date(req.query.from).getTime())-1 || 0;
  let toDate = (new Date(req.query.to).getTime())+1 || (new Date()).getTime()+1;
  let limit = parseInt(req.query.limit);
   let username="";
   User.findById((user), (err, data) => {
    if(err){
      console.log(err);
      res.send("No User found");
    } else if(user===null){
      res.send("No User found");
    }else{
      username=data.username;
    }
   });
  
  Exercise.find({user: user, date: { $gt: fromDate, $lt: toDate}}).limit(limit).exec( (err, data) => {
  
    if(!data.length){
      res.send("No Data Present!");
    }
    else if(err){
      res.send(err);
    } else {
      let arr=data.map(item=>{
        return(
          {
  "description": item.description,
  "duration": item.duration,
  "date": new Date(item.date).toDateString()}
        )
      })

      res.json({
        "_id": user,
        "username": username,
        "count":data.length,
        "log":arr
      });
    }
  });
  

}

module.exports = {

  addExercise: addExercise,
  searchExercise: searchExercise

}