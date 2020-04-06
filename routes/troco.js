const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/troco', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'troco.html'));
});

router.get('/calcula-troco', (req, res, next) => {

    let listaPalindromos = [];
    const valorCompra = +req.query.valorCompra;
    const valorPago = +req.query.valorPago;
    const valorTroco = valorPago - valorCompra;
    
    res.json(gerarTroco(valorTroco));
});

function gerarTroco(valor) {

    const notas = [100, 10, 1];
    let troco = {'100': 0, '10': 0, '1': 0};
    
    for (var nota of notas) {
      while (valor >= nota) {
        troco[nota] += 1
        valor -= nota
      }
    }
  
    return troco
  }

module.exports = router;

