module.exports = (sequelize, DataType) => {
	/* A função sequelize.define("Tasks") é responsável por criar ou alterar uma tabela no banco de dados.
	   O segundo parâmetro é um objeto e seus atributos representam respectivamente os campos de uma tabela, 
	   e seus valores são subatribuots descritores do tipo de dados desses campos.
	*/
	const Tasks = sequelize.define("Tasks", { 
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true	
			}
		},
		done: {
			type: DataType.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		classMethods: {
			associate: (models) => {
				// O relacionamento foi estabelecido por meio da função Tasks.belongsTo(Models.Users).
				// Esse relacionamento é do tipo Tasks 1 - N Users.
				Tasks.belongsTo(models.Users); 
			}
		}
	});
	return Tasks;
};
