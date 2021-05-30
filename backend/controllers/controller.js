const db = require('../config/db.config.js');
const Filme = db.Filme;

//adicionar um registro a nossa tabela
exports.createFilme = (req, res) => {
    let filme = {};

    try{
        // Capturando os dados do body e criando a constante filme.
        filme.titulo = req.body.titulo;
        filme.duracao = req.body.duracao;
        filme.sinopse = req.body.sinopse;
        filme.ano = req.body.ano;
        filme.classif = req.body.classif;
        filme.nota = req.body.nota;
    
        // Salvar filme no banco de dados.
        //{attributes: ['id', 'titulo', 'duracao', 'ano', 'sinopse', 'classificacao', 'atores', 'imagem']})

        Filme.create(filme, {attributes: ['id', 'titulo', 'duracao', 'sinopse', 'ano', 'classif', 'nota']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getFilme = (req, res) => {
    Filme.findByPk(req.params.id, 
                        {attributes: ['id', 'titulo', 'duracao', 'sinopse', 'ano', 'classif', 'nota']})
        .then(filme => {
          res.status(200).json(filme);
        }).catch(error => {
          // mostrar no console a mensagem de erro.
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

exports.filmes = (req, res) => {
    // Buscar todos os registros da tabela 
    try{
        Filme.findAll({attributes: ['id', 'titulo', 'duracao', 'sinopse', 'ano', 'classif', 'nota']})
        .then(filmes => {
            res.status(200).json(filmes);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.deleteFilme = async (req, res) => {
    try{
        let filmeId = req.params.id;
        let filme = await Filme.findByPk(filmeId);

        if(!filme){
            res.status(404).json({
                message: "Não existe nenhum filme com o Id: " + filmeId,
                error: "404",
            });
        } else {
            await filme.destroy();
            res.status(200).json('filme deletado com sucesso.');
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Não foi possível deletar o filme com o Id:" + req.params.id,
            error: error.message
        });
    }
}

exports.updateFilme = async (req, res) => {
    try{
        let filme = await Filme.findByPk(req.body.id);
    
        if(!filme){
            
            res.status(404).json({
                message: "Não foi encontrando nenhum filme com id: " + filmeId,
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                titulo: req.body.titulo,
                duracao: req.body.duracao,
                sinopse: req.body.sinopse,
                ano: req.body.ano,
                classif: req.body.classif,
                nota: req.body.nota
            }
            let result = await Filme.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'titulo', 'duracao', 'sinopse', 'ano', 'classif', 'nota']
                              }
                            );

            // return the response to filme
            if(!result) {
                res.status(500).json({
                    message: "Error -> Não houve alteração no filme Id: " + req.params.id,
                    error: "Não pode ser alterado",
                });
            }

            res.status(200).json('Filme alterado com sucesso');
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Não pôde ser alterado o filme com o id: " + req.params.id,
            error: error.message
        });
    }
}