const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const dadosFilePath = path.join(__dirname, 'dados.json');

app.use(express.static(__dirname));

app.post('/salvar-dados', (req, res) => {
    const formData = req.body;
    let dados = [];
    try {
        const data = fs.readFileSync(dadosFilePath, 'utf8');
        dados = JSON.parse(data);
    } catch (error) {
        dados = [];
    }
    dados.push(formData);
    try {
        fs.writeFileSync(dadosFilePath, JSON.stringify(dados), 'utf8');
        res.send('Dados salvos com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao salvar os dados.');
    }
});

app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
});
