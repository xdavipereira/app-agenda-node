function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
}

module.exports = function (app) {
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
	
  var controller = app.controllers.contato;

  app.route('/contatos')
  	.get(controller.listaContatos)
  	.post(controller.salvaContato)

  app.route('/contatos/:id')
	.get(controller.obtemContato)
	.delete(controller.removeContato);
};
