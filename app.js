const express = require('express')

let app = express()

app.get('/', (req, res) => {
  res.send('<h1>Você está na página Inicial</h1>')
})

app.get('/sobre', (req, res) => {
  res.send('<h1>Você está na página Sobre</h1>')
})

app.get('/produtos', (req, res) => {
  res.send('<h1>Você está na página Produtos</h1>')
})

app.get('/contato', (req, res) => {
  res.send('<h1>Você está na página Contato</h1>')
})

app.get('/exemplo-array', (req, res) => {
  res.send(['Item 00', 'Item 01', 'Item 02'])
})

app.get('/exemplo-objeto', (req, res) => {
  res.send({
    nome: 'Joselito',
    sobrenome: 'Sem Noção',
    melhoresAmigos: 'Hermes e Renato'
  })
})

app.get('/exemplo-json', (req, res) => {
  res.send([{
    id: 0,
    titulo: 'Supimpa',
    descricao: 'Supimpa à beça',
    preco: 199,
    sku: 'SUP-001'
  },
  {
    id: 1,
    titulo: 'Do Balaco Baco',
    descricao: 'Diversão e entretenimento a valer',
    preco: 149,
    sku: 'DBB-001'
  }
  ])
})

app.listen(3030, () => console.info('Servidor rodando! Booooa!'))