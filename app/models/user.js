var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    login: { 
      type: String, 
      required: true
    }, 
    email: {
      type: String, 
      required: true, 
      index: {
        unique: true
      }
    },
    senha: {
      type:   String,
    },
    aluno: {
      type:   Boolean,
    },
    professor: {
      type:   Boolean,
      
    },
    coordenador: {
      type: Boolean
    },
    
    admin: {
      type: Boolean
    }
    
    
  });

  return mongoose.model('User', schema);
};