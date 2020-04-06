var path = require('path');
var express = require('express');
var rootDir = require('../util/path');
var router = express.Router();
var Veiculo = /** @class */ (function () {
    function Veiculo(modelo, anoFabricacao, quantidadePortas, marca, passageiros) {
        this.quantidadePortas = 4;
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.marca = marca;
    }
    Veiculo.prototype.texto = function () {
        return this.modelo + ', ' + this.anoFabricacao + ', ' + this.marca;
    };
    return Veiculo;
}());
var Passeio = /** @class */ (function () {
    function Passeio(modelo, anoFabricacao, marca) {
        this.quantidadePortas = 4;
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.marca = marca;
    }
    Passeio.prototype.texto = function () {
        return this.modelo + ', ' + this.anoFabricacao + ', ' + this.marca;
    };
    return Passeio;
}());
var Moto = /** @class */ (function () {
    function Moto(modelo, anoFabricacao, marca, passageiros) {
        this.quantidadePortas = 4;
        this.rodas = 2;
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.marca = marca;
        this.passageiros = passageiros;
    }
    Moto.prototype.texto = function () {
        return this.modelo + ', ' + this.anoFabricacao + ', ' + this.marca;
    };
    return Moto;
}());
router.get('/veiculo', function (req, res, next) {
    res.sendFile(path.join(rootDir, 'views', 'veiculo.html'));
});
router.get('/grava-veiculo', function (req, res, next) {
    var fs = require('fs');
    var dadosVeiculo = req.query;
    var veiculo;
    switch (dadosVeiculo.tipo) {
        case 'M':
            veiculo = new Moto(dadosVeiculo.modelo, dadosVeiculo.anoFabricacao, dadosVeiculo.marca, dadosVeiculo.passageiros);
            break;
        case 'P':
            veiculo = new Passeio(dadosVeiculo.modelo, dadosVeiculo.anoFabricacao, dadosVeiculo.marca);
        default:
            veiculo = new Veiculo(dadosVeiculo.modelo, dadosVeiculo.anoFabricacao, dadosVeiculo.marca.quantidadePortas, dadosVeiculo.marca, dadosVeiculo.passageiros);
    }
    fs.appendFile('veiculos.txt', JSON.stringify(veiculo), function (err, data) {
        if (err) {
            return console.log(err);
        }
        fs.readFile('veiculos.txt', function (err, data) {
        });
    });
});
// let x = new Passeio('Livina', '2013', 'Nissan');
// console.log(x.texto());
module.exports = router;
