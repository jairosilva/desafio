const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

interface IfVeiculo {
    modelo: string;
    anoFabricacao: string;
    quantidadePortas: number;
    marca: string;
    passageiros:number;

    texto(): string;
}

class Veiculo implements IfVeiculo {
    modelo: string;
    anoFabricacao: string;
    quantidadePortas: number = 4;
    marca: string;
    passageiros:number;

    constructor(modelo:string, anoFabricacao:string, quantidadePortas:number, marca:string, passageiros:number) {
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.marca = marca;
    }

    texto(): string {
        return this.modelo + ', ' + this.anoFabricacao + ', ' + this.marca;
    }

}

class Passeio implements IfVeiculo {
    modelo: string;
    anoFabricacao: string;
    quantidadePortas: number = 4;
    marca: string;
    passageiros:number;

    constructor(modelo:string, anoFabricacao:string, marca:string) {
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.marca = marca;
    }

    texto(): string {
        return this.modelo + ', ' + this.anoFabricacao + ', ' + this.marca;
    }

}

class Moto implements IfVeiculo {
    modelo: string;
    anoFabricacao: string;
    quantidadePortas: number = 4;
    marca: string;
    rodas: number = 2;
    passageiros: number;

    constructor(modelo:string, anoFabricacao:string, marca:string, passageiros:number) {
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.marca = marca;
        this.passageiros = passageiros;
    }

    texto(): string {
        return this.modelo + ', ' + this.anoFabricacao + ', ' + this.marca;
    }

}

router.get('/veiculo', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'veiculo.html'));
});

router.get('/grava-veiculo', function (req, res, next) {
    const fs = require('fs');
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