const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const dadosFilePath = path.join(__dirname, 'dados.json');

// Configuração para servir arquivos estáticos
app.use(express.static(__dirname));

app.post('/salvar-dados', (req, res) => {
    const formData = req.body;

    // Lê os dados do arquivo
    let dados = [];
    try {
        const data = fs.readFileSync(dadosFilePath, 'utf8');
        dados = JSON.parse(data);
    } catch (error) {
        // O arquivo não existe ou ocorreu um erro na leitura, trata como um array vazio
        dados = [];
    }

    // Adiciona os novos dados ao final da lista
    dados.push(formData);

    // Salva os dados no arquivo
    fs.writeFileSync(dadosFilePath, JSON.stringify(dados), 'utf8');

    res.send('Dados salvos com sucesso.');
});

app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
});
