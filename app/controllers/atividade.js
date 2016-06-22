var sanitize = require('mongo-sanitize');

module.exports = function (app) {

  var Atividade = app.models.atividade;

  var controller = {}

  controller.listaAtividades = function(req, res) {
    
    Atividade.find().exec()
    .then(
      function(atividades) {
         res.json(atividades); 
       },
       function(erro) {
         console.error(erro)
         res.status(500).json(erro);
       } 
    );    
  };
  
  controller.obtemAtividade = function(req, res) {

    var _id = req.params.id;
    Atividade.findById(_id).exec()
    .then(
      function(atividade) {
        if (!atividade) throw new Error("Atividade não encontrado");
        res.json(atividade)     
      }, 
      function(erro) {
        console.log(erro);
        res.status(404).json(erro)
      }
    );    
  };

  controller.removeAtividade = function(req, res) { 

    var _id = sanitize(req.params.id);

    Atividade.remove({"_id" : _id}).exec()
    .then(
      function() {
        res.end();  
      }, 
      function(erro) {
        return console.error(erro);
      }
    );
  };

  controller.salvaAtividade = function(req, res) {

    var _id = req.body._id;

    var dados = { 
      "atividade_classe" : req.body.atividade_classe, 
      "resumo" : req.body.resumo,
      "atividade_casa" : req.body.atividade_casa,
      "data" : req.body.data,
      "titulo" : req.body.titulo
    };

    if(_id) {
     Atividade.findByIdAndUpdate(_id, dados).exec()
     .then(
      function(atividade) {
        res.json(atividade);
      }, 
      function(erro) {
        console.error(erro)
        res.status(500).json(erro);
      }
     );
    } else {
      Atividade.create(dados)
      .then(
        function(atividade) {
          res.status(201).json(atividade);
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