# Express.js | Aula 01

> Trata-se de um 'mini framework' para nos auxiliar a gerenciar nosso servidor node.js. Apesar de simples, traz muita facilidade na configuração de nossas aplicações web.

## Getting Started

### 01 | Iniciando projeto node.js

Basta rodarmos `npm init` e configurarmos nosso arquivo package.json (pode dar 'Enter' para tudo ou, se preferir, definir cada propriedade solicitada).

## 02 | Instalando o Express.js

Simplesmente rodamos `npm install express --save` (onde `--save` irá indicar o Express como uma dependência do projeto).

## 03 | Configurando o Express

**Passo 01 - Require**

No nosso arquivo `app.js` , vamos requisitar o Express com `const express = require('express')` . Como é uma dependência, podemos 'chamá-lo' simplesmente por 'express'.

**Passo 02 - Instanciando**

Agora precisamos instanciar o `express` , para isso declaramos `let app = express()` .

**Passo 03 - Listen**

Lembra da aula de `node.js` , onde precisávamos informar a porta que o node deveria 'ouvir'? Pois faremos a mesma coisa, mas usando o Express. Então nosso código ficará assim:

``` js
const express = require('express')

let app = express()

app.listen(3000, () => console.info('Servidor rodando! Booooa!'))
```

**Passo 04 - Rota Inicial**

Agora vamos definir uma rota inicial, como fizemos na aula de `node.js` :

``` js
app.get('/', (req, res) => {
    res.send('Página Inicial')
})
```

**Passo 05 - Nodemon**

Como já sabemos, podemos usar o `nodemon` para não precisarmos ficar atualizando nosso servidor. Para isso, rode `npm install nodemon --save` . No arquivo `package.json` , inclua dentro de `scripts` nosso 'atalho':

``` js
"scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

E então, basta rodar `npm start` no terminal. Beeem tranquilo. ; )

## 04 | Roteamento

De forma geral, basicamente temos a seguinte estrutura:

``` js
app.METHOD(PATH, HANDLER)
```

Sendo:

* app => a instância do Express

* METHOD => o método que deverá ser utilizado (get, post, delete, etc.)

* PATH => o caminho em si (URL)

* HANDLER => define como lidaremos com o acesso à rota

Assim como já vimos, nosso HANDLER é um callback, que recebe os argumentos `req` e `res` .

**Rotas simples com o método GET**

Vamos criar algumas rotas! Vale pontuar que, além de `strings` (que comportam HTML), podemos passar `arrays` , `objetos` e `JSON` como resposta. Veja alguns exemplos simples:

``` js
app.get('/', (req, res) => {
    res.send('<h1>Você está na Página Inicial</h1>')
})

app.get('/sobre', (req, res) => {
    res.send('Você está na Página Sobre')
})

app.get('/produtos', (req, res) => {
    res.send('Você está na Página Produtos')
})

app.get('/contato', (req, res) => {
    res.send('Você está na Página Contato')
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
```

Perceba que com o Express, não precisamos mais 'setar' o Header como fizemos antes (ele faz isso por nós, por debaixo dos panos).

**Rotas parametrizadas**

Sabe quando clicamos em um produto e somos direcionados para um link como `https://site.com/produtos/123` ? Já deve imaginar que `123` é um identificador único, como uma `PRIMARY KEY` que é específica para aquele produto. E conforme mudamos esse código, o site vai trocando o produto exibido.

Bom, esse número (no exemplo) é o que chamamos de **parâmetro** (igual vimos no módulo de **React.js**). E a forma de declará-lo também é igual ( `/produtos/:id` ). Ou seja, o símbolo `:` é o que indica que aquele termo é um parâmetro. Ao lidar com parâmetros, conseguimos tornar nossas rotas dinâmicas. Vejamos um exemplo com a rota de produtos sem e com parâmetros:

``` js
app.get('/produtos', (req, res) => {
    res.send('Você está na Página Produtos')
})

app.get('/produtos/:id', (req, res) => {
    res.send(`Você está na Página do Produto ${req.params.id}`)
})
```

Como o `id` é um **parâmetro** que faz parte da **requisição**, nada mais intuitivo do que acessar o valor através de `req.params.id` , sendo `id` justamente o nome do parâmetro. :)

**Rotas com parâmetos opcionais**

Podemos ainda tratar ambos os casos (com ou sem parâmetro) numa mesma rota. Para isso basta adicionarmos uma interrogação após o nome do parâmetro, indicando que o mesmo é opcional:

``` js
app.get('/produtos/:id?', (req, res) => {
    let {
        id
    } = req.params
    id
        ?
        res.send(`Você está na Página do Produto ${req.params.id}`) :
        res.send(`Você está na Página de Produtos`)
})
```

De forma geral, nós salvamos o valor do id através da desestruturação e utilizamos um **if ternário** para tratarmos os dois possíveis cenários: a presença ou a ausência do parâmetro id.