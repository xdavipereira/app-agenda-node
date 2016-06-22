var sanitize = require('mongo-sanitize');

module.exports = function (app) {

  var User = app.models.user;

  var controller = {}

  controller.listaUsers = function(req, res) {
    
    User.find().exec()
    .then(
      function(users) {
         res.json(users); 
       },
       function(erro) {
         console.error(erro)
         res.status(500).json(erro);
       } 
    );    
  };
  
  controller.obtemUser = function(req, res) {

    var _id = req.params.id;
    User.findById(_id).exec()
    .then(
      function(user) {
        if (!user) throw new Error("User não encontrado");
        res.json(user)     
      }, 
      function(erro) {
        console.log(erro);
        res.status(404).json(erro)
      }
    );    
  };
  
  
  controller.obtemLogin = function(req, res) {
  
    var logins = req.params.login;
  
    User.findOne({login: logins}).exec()
    .then(
      function(login) {
        if (!login) throw new Error("User não encontrado");
        res.json(login)     
      }, 
      function(erro) {
        console.log(erro);
        res.status(404).json(erro)
      }
    );    
  };
  

  controller.removeUser = function(req, res) { 

    var _id = sanitize(req.params.id);

    User.remove({"_id" : _id}).exec()
    .then(
      function() {
        res.end();  
      }, 
      function(erro) {
        return console.error(erro);
      }
    );
  };

  controller.salvaUser = function(req, res) {

    var _id = req.body._id;

    var dados = { 
      "login" : req.body.login, 
      "email" : req.body.email,
      "senha" : req.body.senha,
      "aluno" : req.body.aluno,
      "professor" : req.body.professor,
      "coordenador" : req.body.coordenador,
      "admin" : req.body.admin
    };

    if(_id) {
     User.findByIdAndUpdate(_id, dados).exec()
     .then(
      function(user) {
        res.json(user);
      }, 
      function(erro) {
        console.error(erro)
        res.status(500).json(erro);
      }
     );
    } else {
      User.create(dados)
      .then(
        function(user) {
          res.status(201).json(user);
        }, 
        function(erro) {
          console.log(erro);
          res.status(500).json(erro);
        }
      );
    }
  };

  return controller;
};