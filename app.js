const express = require('express')

let app = express()

app.get('/', (req, res) => {
  res.send('Página Incial')
})

app.listen(3030, () => console.info('Servidor rodando! Booooa!'))