const saveUser = require('../actionHandler/handleUser').saveUser;
const allUsers = require('../actionHandler/handleUser').allUsers;
const addExercise = require('../actionHandler/handleExercise').addExercise;
const searchExercise = require('../actionHandler/handleExercise').searchExercise;

module.exports = {
  
  routes: function(app){
    
    app.route('/api/exercise/new-user')
    .post(saveUser);
    
    app.route('/api/exercise/add')
    .post(addExercise);
    
    app.route('/api/exercise/log')
    .get(searchExercise);

    app.route('/api/exercise/users')
      .get(allUsers);
    
  }
  
}