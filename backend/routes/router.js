let express = require('express');
let router = express.Router();
 
const filmes = require('../controllers/controller.js');

router.post('/api/filme', filmes.createFilme);
router.get('/api/filme/:id', filmes.getFilme);
router.get('/api/filmes', filmes.filmes);
router.put('/api/filme', filmes.updateFilme);
router.delete('/api/filme/:id', filmes.deleteFilme);

module.exports = router;