var mongoose  = require("mongoose");

module.exports = function() {
    var schema =  mongoose.Schema({
        nome: {
            type: String
        },
        mae_nome: {
            type: String
        },
        pai_nome:{
            type: String
        },
        telefone: {
            type: String
        },
        email: {
            type: String
        },
        data_nascimento: {
           type: Date
        },
        endereco: {
            type: String
        }
        
    });
    
    return mongoose.model('Aluno',schema);
}