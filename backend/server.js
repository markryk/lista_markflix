const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./config/db.config.js');

const Filme = db.Filme;

let router = require('./routes/router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create o servidor
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("O App está executando em http://%s:%s", host, port); 
})

db.sequelize.sync({force: true}).then(() => {
  console.log('Reescreve e popula a tabela com { force: true }');
  Filme.sync().then(() => {
    const filmes = [
      {titulo: 'Matrix', duracao: 136, sinopse: 'Um hacker fica sabendo de uma incrível conspiração que envolve a realidade de todos os humanos e se junta a uma rebelião em busca da liberdade.', ano: 1999, classif: 14, nota: 10}, 
      {titulo: 'Em transe', duracao: 101, sinopse: 'Simon, um leiloeiro de arte, une-se a uma quadrilha para roubar uma obra de arte que vale milhões de dólares, mas, depois de sofrer uma pancada na cabeça durante o assalto, ele acorda e descobre que não tem nenhuma lembrança de onde escondeu a pintura. Quando as ameaças físicas e tortura não produzem respostas, o líder da gangue contrata uma hipnoterapeuta para aprofundar os recessos mais sombrios da psique de Simon.', ano: 2013, classif: 16, nota: 10}, 
      {titulo: 'O predestinado', duracao: 97, sinopse: 'Um agente precisa viajar no tempo para impedir a ação de um criminoso responsável por um ataque que mata milhares de pessoas.', ano: 2014, classif: 14, nota: 10}, 
      {titulo: 'Velozes e furiosos', duracao: 107, sinopse: 'Brian O\'Conner é um policial que se infiltra no submundo dos rachas de rua para investigar uma série de furtos. Enquanto tenta ganhar o respeito e a confiança do líder Dom Toretto, ele corre o risco de ser desmascarado.', ano: 2001, classif: 12, nota: 10}, 
      {titulo: 'Tenet', duracao: 150, sinopse: 'Um agente secreto embarca em uma missão perigosa para evitar o início da Terceira Guerra Mundial.', ano: 2020, classif: 14, nota: 10},
      {titulo: 'Durante a tormenta', duracao: 129, sinopse: 'Um defeito no espaço-tempo permite que Vera salve a vida de um garoto, mas isso a leva a perder a própria filha. Agora, seu único objetivo é recuperá-la.', ano: 2018, classif: 16, nota: 10}
      /*{ nome: 'Pedro', email: 'pedro@email.com' ,idade: 23 },
      { nome: 'Sara',  email: 'sara@email.com' , idade: 31 },*/
    ]
    
    for(let i=0; i<filmes.length; i++){
      Filme.create(filmes[i]);
    }
  })
});