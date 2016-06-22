var mongoose  = require("mongoose");

module.exports = function() {
    var schema =  mongoose.Schema({
        atividade_classe: {
            type: String
        },
        resumo: {
          type: String  
        },
        atividade_casa: {
            type: String
        },
        data:{
            type: Date
        },
        titulo:{
            type: String
        }
        
    });
    
    return mongoose.model('Atividade',schema);
}