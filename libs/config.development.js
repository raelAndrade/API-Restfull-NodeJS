import logger from "./logger.js";

module.exports = {
	database: "ntask",
	username: "",
	password: "",
	params: {
		dialect: "sqlite",
		storage: "ntask.sqlite",
		logging: (sql) => {
			logger.info(`[${new Date()}] ${sql}`);
		},
		define: {
			underscored: true
		}
	},
	// O campo jwtSecret mantém uma string de chave secreta que servirá como base para encode/decode de tokens.
	jwtSecret: "Nta$K-AP1",
	// Esse item será utilizado para informar ao Passport que a autenticação não terá sessão de usuário.
	jwtSession: {session: false}
};