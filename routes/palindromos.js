const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/palindromos', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'palindromos.html'));
});

router.get('/determina-palindromos', (req, res, next) => {
    let listaPalindromos = [];
    let inicio = +req.query.inicio;
    let fim = +req.query.fim + 1;

    for (i = inicio; i < fim; i++) {
        if (testaPalindromo(i) == true) {
            listaPalindromos.push(i);
        }        
    }
    res.json(listaPalindromos);
});

function testaPalindromo(numero) {
    str = numero.toString();
    var reverseStr = str.split('').reverse().join(''); 
    
    return (reverseStr === str);
  }

module.exports = router;

