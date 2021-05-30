module.exports = (sequelize, Sequelize) => {
	const Filme = sequelize.define('filme', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
	    titulo: {
			type: Sequelize.STRING
	    },
	    duracao: {
			type: Sequelize.STRING
	    }
	});
	
	return Filme;
}