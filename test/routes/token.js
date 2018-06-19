describe("Routes: Token", () => {
    const Users = app.db.models.Users;
    describe("POST /token", () => {
        beforeEach(done => {
            // Código de pré-teste
            Users
                .destroy({where: {}})
                .then(() => Users.create({
                    name: "John",
                    email: "john@mail.net",
                    password: "12345"
                }))
                .then(done());
        });
        describe("status 200", () => {
            it("returns authenticated user token", done => {
                // Código do teste ...
                request.post("/token")
                    .send({
                        email: "john@mail.net",
                        password: "12345"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token");
                        done(err);
                    });
            });
        });
        describe("status 401", () => {
            it("throws error when password is incorrect", done => {
                // Código do teste ...
                request.post("/token")
                    .send({
                        email: "john@mail.net",
                        password: "SENHA_ERRADA"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });
            it("throws error when email not exist", done => {
                // Código do teste ...
                request.post("/token")
                    .send({
                        email: "EMAIL_ERRADO",
                        password: "SENHA_ERRADA"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });
            it("throws error when email and password are blank", done => {
                // Código do teste ...
                request.post("/token")
                    .expect(401)
                    .end((err, res) => {                        
                        done(err);
                    });
            });
        });
    });
});