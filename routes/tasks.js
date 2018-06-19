module.exports = app => {
	const Tasks = app.db.models.Tasks;

	app.route("/tasks")
		.all(app.auth.authenticate())
		.get((req, res) => {
			// "/tasks": Lista tarefas
			Tasks.findAll({
				where: { user_id: req.user.id }
			})
				.then(result => res.json(result)) // O resultado da consulta ocorre por meio da função then()
				.catch(error => { // caso exista algum problema nela, você pode tratar os erros através da função catch()
					res.status(412).json({msg: error.message}); 
					// vamos usar o status 412 - Precondition Failed para retornar os demais erros de validação de campo, ou erros de acesso na base de dados.
				});

		})
		.post((req, res) => {
			// "/tasks": Cadastrar uma nova tarefa
			req.body.user_id = req.user.id;
			Tasks.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.route("/tasks/:id")
		.all(app.auth.authenticate())
		.get((req, res) => {
			// "/tasks/1": Consulta uma tarefa
			Tasks.findOne({where: {
				id: req.params.id,
				user_id: req.user.id
			}})
				.then(result => {
					if (result) {
						res.json(result);
					} else {
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.put((req, res) => {
			// "/tasks/1: Atualiza uma tarefa"
			/**
			 * função para atualizar uma tarefa na base de dados
			 * vamos utilizar a função Task.update()
			 */
			Tasks.update(req.body, {where: {
				id: req.params.id,
				user_id: req.user.id
			}})
			/**
			 * Vamos forçar uma resposta de status 204 - No Content, por meio da função 
			 * res.sendStatus(204), que signifca que a requisição teve sucesso, porém 
			 * não retornou conteúdo como resposta.
			 */
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			// "/tasks/1": Exclui uma tarefa
			/**
			 * Iremos utilizar a função Tasks.destroy() e passar em seu argumento um objeto com dados para 
			 * consultar qual tarefa será excluída.
			 */
			Tasks.destroy({where: {
				id: req.params.id,
				user_id: req.user.id
			}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		});
};