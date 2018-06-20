module.exports = app => {
    
    const Users = app.db.models.Users;

    /**
     * @api {get} /user Exibe usuário autenticado
     * @apiGroup Usuário
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} name Name 
     * @apiSuccess {String} email Email
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "id": 1,
     *      "name": "John Connor",
     *      "email": john@connor.net
     *  }
     * @apiErrorExample {json} Erro de Consulta
     *  HTTP/1.1 412 Precondition Failed
     */

    app.route("/user")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Users.findById(req.user.id, {
                attributes: ["id", "name", "email"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        /**
         * @api {delete} /user Excluir usuário autenticado
         * @apiGroup Usuário
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *  {"Authorization": JWT xyz.abc.123.hgf}
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 204 No Content
         * @apiErrorExample {json} Erro na exclusão
         *  HTTP/1.1 412 Precondition Failed
         */
        .delete((req, res) => {
            Users.destroy({where: {id: req.user.id} })
                .then(result => res.sendStatus(204))
                .catch(erros => {
                    res.sendStatus(412).json({msg: error.message});
                });
        });

    /**
     * @api {post} /users Cadastra novo usuaŕio
     * @apiGroup Usuário
     * @apiParam {String} name Nome
     * @apiParam {String} email Email
     * @apiParam {String} password Senha
     * @apiParamExample {json} Entrada
     *  {
     *      "name": "John Connor",
     *      "email": "john@connor.net",
     *      "password": "12345"
     *  }
     * @apiSuccess {Number} id ID de registro
     * @apiSuccess {String} name Nome
     * @apiSuccess {String} email Email
     * @apiSuccess {String} password Senha criptografada
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de cadastro
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "id": 1,
     *      "name": "John Connor",
     *      "email": "john@connor.net",
     *      "password": "a$10$SK1B1",
     *      "updated_at": "2018-06-19T23:29:51.778Z",
     *      "created_at": "2018-06-19T23:29:51.778Z"
     *  }
     * @apiErrorExample {json} Erro no cadastro
     */
    app.post("/users", (req, res) => {
        Users.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });
};