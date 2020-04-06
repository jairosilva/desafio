const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/cep', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'cep.html'));
});

router.get('/determina-cep', (req, res, next) => {

    const cep = req.query.cep;
    const request = require('sync-request');
    const resposta = request('GET', 'https://viacep.com.br/ws/' + cep + '/json/');

    res.json(resposta.body.toString('utf-8'));
});

function testaPalindromo(numero) { 
    str = numero.toString();
    var reverseStr = str.split('').reverse().join(''); 
    
    return (reverseStr === str);
  }

module.exports = router;

