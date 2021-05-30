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
			type: Sequelize.INTEGER
	    }, 
		sinopse: {
			type: Sequelize.TEXT
	    }, 
		ano: {
			type: Sequelize.INTEGER
	    }, 
		classif: {
			type: Sequelize.INTEGER
	    }, 
		nota: {
			type: Sequelize.FLOAT
	    }
	});
	
	return Filme;
}