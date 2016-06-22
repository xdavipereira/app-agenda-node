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
    res.header("Access-Control-Allow-Methods","DELETE");
    next();
});
	
  var controller = app.controllers.atividade;

  app.route('/atividades')
  	.get(controller.listaAtividades)
  	.post(controller.salvaAtividade)

  app.route('/atividades/:id')
	.get(controller.obtemAtividade)
	.delete(controller.removeAtividade);
};