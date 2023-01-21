# Seção 15 - Projeto prático - MMORPG baseado na séria de TV Game Of Thrones:
## Aula 1 - Download de arquivos estáticos (assets) e HTML:
Download de arquivos estáticos (assets) e HTML

Utilize o link disponibilizado como recurso dessa aula para fazer o download dos HTMLs e assets do projeto MMORPG Game Of Thrones.

Bons estudos ;)

## Aula 2 - Ajustando routes e views:
Com o arquivo da aula anterior baixado, vamos configuar o ambiente de modo estático do nosso novo projeto.

- Criar um diretório com o nome do nosso novo projeto, mmorpg_got, no caso, dentro do arquivo baixado, na aula anterior, mmorpg_got_arquivos_do_projeto, dentro dela existem duas pastas, htmls_e_assets e servidor_nodejs_pre_configurado. Vc irá mudar o nome do diretório servidor_nodejs_pre_configurado para o mmorpg_got.

- Vamos verificar primeiro se está tudo funcionando corretamente. No caso, colocando vc como usuário root do projeto novo, basta rodar o comando nodemon app. Se estiver tudo funcionando deverá aparecer a msg "Bem vindo a sua app NodeJS!", que é justamente o que temos no index.js do routes.

- Agora, na pasta htmls_e_assets iremos mandar as configurações estáticas para o nosso novo projeto.

    - Primeiro, todos os arquivos htmls dessa pasta iremos enviar na pasta views.

    - Segundo, na pasta public do nosso projeto dentro dela haverá três pastas css, images e js. Dentro dela iremos os mesmos conteúdos das respectivas mesmas pastas que se encontram no htmls_e_assets.

- Agora, vamos configurar as rotas, no caso, vincularemos os htmls que enviamos para possibilitar a sua exibição pelo index.js. Lembrando que como estamos usando o ejs, então todos os htmls que temos precisamos mudar a sua extensão para ejs.

    module.exports = function(application){
        application.get('/', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            res.render('index');
        });
    }

- Faremos a mesma coisa para outros arquivos ejs que temos. No caso, dentro de routes iremos criar mais arquivos de extensão js, cadastro.js e jogo.js.

    module.exports = function(application){
        application.get('/cadastro', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            res.render('cadastro');
        });
    }
    
    module.exports = function(application){
        application.get('/jogo', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            res.render('jogo');
        });
    }

## Aula 3 - Ajustando routes e controllers:
Nessa aula vamos fazer com que as nossas rotas executem os nossos controllers, como de costume e de boas práticas!

No caso, no diretório controllers, iremos criar os respectivos arquivos que correspondem aos arquivos que estão no routes.

- cadastro.js

- index.js

- jogo.js

No arquivo, cadastro.js do controllers, vamos colocar o seguinte

    module.exports.cadastro = function(application, req, res){
        res.render('cadastro');
    }
    
Em seguida, advinha só, no cadastro.js de routes vamos aplicar a função módulo definido no cadastro.js do controllers

    module.exports = function(application){
        application.get('/cadastro', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('cadastro');
            application.app.controllers.cadastro.cadastro(application, req, res);
        });
    }

Obs: Uma outra coisa que precisaria realizar seria carregar tais módulos pelo server.js usando o consign. Mas isso já está configurado.

    /* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
    consign()
        .include('app/routes')
        .then('app/models')
        .then('app/controllers')
        .into(app);

Agora, analogamente à anterior, no index.js do controllers, vamos realizar o mesmo processo.

    module.exports.index = function(application, req, res) {
        res.render('index');
    }

Enquanto que no index.js do routes precisamos realizar o seguinte:

    module.exports = function(application){
        application.get('/', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('index');
            application.app.controllers.index.index(application, req, res);
        });
    }

Analogamente, realizamos o mesmo processo para jogos.js do controllers e routes, respectivamente.

    module.exports.jogo = function(application, req, res) {
        res.render('jogo');
    }
    
    module.exports = function(application){
        application.get('/jogo', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('jogo');
            application.app.controllers.jogo.jogo(application, req, res);
        });
    }

## Aula 4 - Tela de cadastro de usuários - recebendo e validando dados:
Vamos corrigir alguns dados errados que estão presentes no cadastro.ejs e cadastro.js do controllers.

    <div class="container">
        
        <form class="form-cadastro" action="/cadastrar" method="post">
        
            <div class="row">
                <div class="col-xs-4">
                    <div class="form-group">
                        <label for="nome" class="col-sm-2 col-form-label">Nome</label>
                        <input type="nome" class="form-control" id="nome" name="nome" placeholder="Nome">
                    </div>
                </div>
                
                <div class="col-xs-4">
                    <div class="form-group">
                        <label for="usuario" class="col-sm-2 col-form-label">Usuário</label>
                        <input type="usuario" class="form-control" id="usuario" name="usuario" placeholder="Usuário">
                    </div>
                </div>
                
                <div class="col-xs-4">
                    <div class="form-group">
                        <label for="senha" class="col-sm-2 col-form-label">Senha</label>
                        <input type="password" class="form-control" id="senha" name="senha" placeholder="Password">
                    </div>
                </div>
            </div>
            
            <div class="form-group row">
            
                <div class="col-xs-2">
                    <img src="images/casa_arryn.jpg" class="img-responsive img-radio">
                    <center>
                        <input type="radio" id="left-item" name="casa" value="arryn"> Casa Arryn
                    </center>
                </div>
                
                <div class="col-xs-2">
                    <img src="images/casa_baratheon.jpg" class="img-responsive img-radio">
                    <center>
                        <input type="radio" id="left-item" name="casa" value="baratheon"> Casa Baratheon
                    </center>
                </div>
                
                <div class="col-xs-2">
                    <img src="images/casa_greyjoy.jpg" class="img-responsive img-radio">
                    <center>
                        <input type="radio" id="left-item" name="casa" value="greyjoy"> Casa Greyjoy
                    </center>
                </div>
                
                <div class="col-xs-2">
                    <img src="images/casa_lannister.jpg" class="img-responsive img-radio">
                    <center>
                        <input type="radio" id="left-item" name="casa" value="lannister"> Casa Lannister
                    </center>
                </div>
                
                <div class="col-xs-2">
                    <img src="images/casa_martell.jpg" class="img-responsive img-radio">
                    <center>
                        <input type="radio" id="left-item" name="casa" value="martell"> Casa Martell
                    </center>
                </div>
                
                <div class="col-xs-2">
                    <img src="images/casa_stark.jpg" class="img-responsive img-radio">
                    <center>
                        <input type="radio" id="left-item" name="casa" value="stark"> Casa Stark
                    </center>
                </div>
            </div>
            
            <div class="form-group row">
            
                <div class="col-xs-3"></div>
            
                <div class="col-xs-2">
                    <img src="images/casa_targaryen.jpg" class="img-responsive img-radio">
                    <center>
                        <input type="radio" id="left-item" name="casa" value="targaryen"> Casa Targaryen
                    </center>
                </div>
                
                <div class="col-xs-2">
                    <img src="images/casa_tully.jpg" class="img-responsive img-radio">
                    <center>
                        <input type="radio" id="left-item" name="casa" value="tully"> Casa Tully
                    </center>
                </div>
                
                <div class="col-xs-2">
                    <img src="images/casa_tyrell.jpg" class="img-responsive img-radio">
                    <center>
                        <input type="radio" id="left-item" name="casa" value="tyrell"> Casa Tyrell
                    </center>
                </div>
                
                <div class="col-xs-3"></div>
            </div>		
            
        
            <div class="form-group row">
                <button type="submit" class="btn btn-primary">Confirmar cadastro</button>
            </div>
            

        </form>
                
    </div>

Agora, no cadastro.js de routes vamos precisar configurar a aba cadastrar para receber a submissão.

    module.exports = function(application){
        application.get('/cadastro', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('cadastro');
            application.app.controllers.cadastro.cadastro(application, req, res);
        });

        application.post('/cadastrar', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('cadastro');
            application.app.controllers.cadastro.cadastrar(application, req, res);
        });
    }

Agora, no cadastro.js do controllers vamos precisar definir a função para isso.
    module.exports.cadastro = function(application, req, res){
        res.render('cadastro');
    }

    module.exports.cadastrar = function(application, req, res) {
        res.send('Teste - vamos cadastrar!');
    }

Podemos testar isso agora no localhost/cadastro colocando os nomes, usuário e senha.

Se apareceu a mensagem "Teste - vamos cadastrar!", significa que está funcionando corretamente.

Agora, vamos precisar recuperar tais dados preechidos no cadastro.js do controllers.

    module.exports.cadastro = function(application, req, res){
        res.render('cadastro');
    }

    module.exports.cadastrar = function(application, req, res) {
        // res.send('Teste - vamos cadastrar!');
        var dadosForm = req.body;
        req.assert('nome', 'Nome não pode ser vazio!').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio!').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio!').notEmpty();
        req.assert('casa', 'Casa não pode ser vazio!').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            res.send('Existem erros no formulário!');
            return;
        }

        res.send('Podemos cadastrar!');
    }

Podemos, novamente, realizar os testes e visto que está funcionando, vamos mehorar a forma como está sendo enviado a msg de erro.

    module.exports.cadastro = function(application, req, res){
        res.render('cadastro', {validacao: {}});
    }

    module.exports.cadastrar = function(application, req, res) {
        // res.send('Teste - vamos cadastrar!');
        var dadosForm = req.body;
        req.assert('nome', 'Nome não pode ser vazio!').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio!').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio!').notEmpty();
        req.assert('casa', 'Casa não pode ser vazio!').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            // res.send('Existem erros no formulário!');
            res.render('cadastro', {validacao: erros});
            return;
        }

        res.send('Podemos cadastrar!');
    }

Agora, no cadastro.ejs do views precisamos configurar uma div que mostre tais erros para o usuário

    <div class="container">

        <% if(validacao.length > 0) { %> 
            <div class="alert alert-danger">
                <strong>Atenção!</strong>
                <ul>
                    <% for(var i = 0; i < validacao.length; i++) { %>
                        <li><%=validacao[i].msg%></li>
                    <% } %>
                </ul>
            </div>
        <% } %>

Feito isso, agora, ele estará sendo exibido ao usuário essa msg de erro.

Agora, para melhorar a usabilidade do usuário de não ter que ficar preenchendo novamente as msgs sempre que der algum erro, vamos configurar uma forma que tais msgs permaneçam.


No caso, no cadastro.js de controllers, vamos colocar o dadosForm dentro da msg de erros.

    module.exports.cadastro = function(application, req, res){
        res.render('cadastro', {validacao: {}, dadosForm: {}});
    }

    module.exports.cadastrar = function(application, req, res) {
        // res.send('Teste - vamos cadastrar!');
        var dadosForm = req.body;
        req.assert('nome', 'Nome não pode ser vazio!').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio!').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio!').notEmpty();
        req.assert('casa', 'Casa não pode ser vazio!').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            // res.send('Existem erros no formulário!');
            res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
            return;
        }

        res.send('Podemos cadastrar!');
    }

Agora, falta configurar isso no cadastro.ejs com values.

    <div class="row">
        <div class="col-xs-4">
            <div class="form-group">
                <label for="nome" class="col-sm-2 col-form-label">Nome</label>
                <input type="nome" value="<%=dadosForm.nome%>" class="form-control" id="nome" name="nome" placeholder="Nome">
            </div>
        </div>
        
        <div class="col-xs-4">
            <div class="form-group">
                <label for="usuario" class="col-sm-2 col-form-label">Usuário</label>
                <input type="usuario" value="<%=dadosForm.usuario%>" class="form-control" id="usuario" name="usuario" placeholder="Usuário">
            </div>
        </div>
        
        <div class="col-xs-4">
            <div class="form-group">
                <label for="senha" class="col-sm-2 col-form-label">Senha</label>
                <input type="password" value="<%=dadosForm.senha%>" class="form-control" id="senha" name="senha" placeholder="Password">
            </div>
        </div>
    </div>

Assim, sempre que o usuário errar o preenchimento de alguns dados ele não terá o trabalho de ter que preencher novamente.

## Aula 5 - NPM - Instalando o módulo de conexão com o MongoDB:
Vamos estabelecer a conexão com o MongoDB.

No caso, no diretório projeto aberto pelo terminal digite:

    npm install mongodb --save

## Aula 6 - NodeJS e MongoDB - Configurando a conexão com o banco de dados:
Vamos criar um novo arquivo, dbConnection.js dentro do config, que é o módulo que irá servir de configuração de conexão com o banco de dados e dentro dela colocar

    // Importar o mongodb
    var mongo = require('mongodb');

    module.exports = function(){
        console.log('Entrou na função de conexão');
        var db = new mongo.Db(
            'got',
            new mongo.Server(
                'localhost', // String contendo o endereço onde está o banco de dados
                27017, // porta de conexão
                {}
            ),
            {}
        );

        return db;

    }

Após isso, no arquivo server.js do config, vamos precisar usar o consign para chamar essa configuração.

    consign()
        .include('app/routes')
        .then('config/dbConnection.js')
        .then('app/models')
        .then('app/controllers')
        .into(app);

Porém, tais configurações acima resultaram nesse tipo de problema

    TypeError: mongo.Server is not a constructor
        at module.exports (/home/leonardo/Documentos/estudos/mmorpg_got/config/dbConnection.js:7:9)
        at Consign.into (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/consign/lib/consign.js:240:17)
        at Object.<anonymous> (/home/leonardo/Documentos/estudos/mmorpg_got/config/server.js:35:3)
        at Module._compile (node:internal/modules/cjs/loader:1159:14)
        at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
        at Module.load (node:internal/modules/cjs/loader:1037:32)
        at Module._load (node:internal/modules/cjs/loader:878:12)
        at Module.require (node:internal/modules/cjs/loader:1061:19)
        at require (node:internal/modules/cjs/helpers:103:18)
        at Object.<anonymous> (/home/leonardo/Documentos/estudos/mmorpg_got/app.js:2:11)
        at Module._compile (node:internal/modules/cjs/loader:1159:14)
        at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
        at Module.load (node:internal/modules/cjs/loader:1037:32)
        at Module._load (node:internal/modules/cjs/loader:878:12)
        at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
        at node:internal/main/run_main_module:23:47

    Node.js v18.12.1
    [nodemon] app crashed - waiting for file changes before starting...

O que significa que não estamos conseguindo configurar a conexão com o banco de dados MongoDB.

Para isso irei assitir um curso de MongoDB, Curso Completo MongoDB 2022 [NoSQL do Básico ao Avançado!], cujo o professor usa tbm o sistema operacional Linux para conseguir estabelecer as configurações com o banco de dados.

Lugar para tirar um certiicação bem forte para MongoDB:

    https://www.mongodb.com/community/forums/c/university/19

A melhor maneira de instalar o MongoDB no linux é seguir o download oficial:

    https://www.mongodb.com/try/download/community

Basta selecionar seu sistema operacional e fazer o download do software community edition que é a verão que utilizaremos, é grátis e open source!

Caso esteja no Ubuntu e prefira gerenciar sua instalação com seu package manager (APT), siga os seguintes passos:

    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#official-mongodb-packages

Tenha em mente que o pacote que já existe no apt-get não é oficial do mongo db, e isso está confirmado no link acima. Basta adicionar o PPA oficial para poder instalar com o APT.

O link onde o mongosh, via mongod, bate

    mongodb://127.0.0.1:27017/?directConnection=true serverSelectionTimeoutMS=2000 appName=mongodb+1.6.1

Precisa se instalar, via sudo apt-get, os usos de mongo e mongod. Bastaria jogar no terminal mongo e mongod, para verificas quais comandos precisaria fazer para instalar cada uma.

Caso o sudo systemctl start mongod não estiver funcionando:

    https://stackoverflow.com/questions/60309575/mongodb-service-failed-with-result-exit-code

A construção que funcionou em conectar ao mongoDB community Edition, onde está rodando o mongod, pelo comando sudo systemctl start mongod, seria o seguinte:

    const { MongoClient } = require("mongodb");

    // Connection URI
    const uri =
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1";

    // Create a new MongoClient
    const client = new MongoClient(uri);

    async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Entrou na função de conexão");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    }
    run().catch(console.dir);

Donde, o ponto curioso seria o local const uri, onde tem a string

    mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1

Essa string, conseguimos obter, depois que seguir a instalação tudo certinho nesse link
    https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
    
vc consegue rodar o comando "mongosh" pelo terminal e será exibido o algo parecido com o seguinte:

    Current Mongosh Log ID:	63a8e2809212410c1b4a1d9b
    Connecting to:		mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1
    Using MongoDB:		6.0.3
    Using Mongosh:		1.6.1

    For mongosh info see: https://docs.mongodb.com/mongodb-shell/

    ------
    The server generated these startup warnings when booting
    2022-12-25T20:39:33.098-03:00: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem
    2022-12-25T20:39:33.255-03:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
    2022-12-25T20:39:33.255-03:00: vm.max_map_count is too low
    ------

    ------
    Enable MongoDB's free cloud-based monitoring service, which will then receive and display
    metrics about your deployment (disk utilization, CPU, operation statistics, etc).
    
    The monitoring data will be available on a MongoDB website with a unique URL accessible to you
    and anyone you share the URL with. MongoDB may use this information to make product
    improvements and to suggest MongoDB products and deployment options to you.
    
    To enable free monitoring, run the following command: db.enableFreeMonitoring()
    To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
    ------

    Warning: Found ~/.mongorc.js, but not ~/.mongoshrc.js. ~/.mongorc.js will not be loaded.
    You may want to copy or rename ~/.mongorc.js to ~/.mongoshrc.js.
    test>

Onde, onde está escrito Connecting to, mostra exatamente o uri na qual vc deverá colocar.

Agora, vamos precisar configurar o server.js, da mesma forma como foi expressa anteriormente e, por fim, quando rodarmos "nodemon app" aparecerá o seguinte estatus

    [nodemon] restarting due to changes...
    [nodemon] starting `node app`
    consign v0.1.6 Initialized in /home/leonardo/Documentos/estudos/mmorpg_got
    + ./app/routes/cadastro.js
    + ./app/routes/index.js
    + ./app/routes/jogo.js
    + ./config/dbConnection.js
    ! Entity not found /home/leonardo/Documentos/estudos/mmorpg_got/app/models
    + ./app/controllers/cadastro.js
    + ./app/controllers/index.js
    + ./app/controllers/jogo.js
    Servidor online
    Entrou na função de conexão

Agora, creio que podemos dar continuidade na aula.

No caso, o formato atual, sempre que acessarmos o localhost irá estabelecer a conexão com o banco de dados mongoDB de forma desnecessária.

Isso é ruim, pois no quesito financeiro pode ser custoso, pois estaria realizando uma requisição desnecessariamente.

No caso, o ideal seria estabelecer a conexão com o banco de dados apenas quando for necessário por via da ação de um usuário que estiver mexendo no na tela.

Para resolvermos esse problema realizamos o seguinte. (https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connection-options/)

    const { MongoClient } = require("mongodb");

    // Connection URI
    const uri =
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1";

    // Create a new MongoClient
    const client = new MongoClient(uri);

    var connMongoDB = function() {async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Entrou na função de conexão");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    }
    run().catch(console.dir);
    }

    module.exports = function() {
        return connMongoDB;
    }

Ao olharmos na nossa aplicação, vamos ver que não aparecerá o console.log('Entrou na função de conexão').

## Aula 7 - Cadastrando usuários:
Agora, vamos cadastrar o formulário no mongoDB.

Para isso, vamos criar um diretório models dentro do diretório app e dentro dela criamos um arquivo UsuariosDAO.js.

Dentro do arquivo UsuariosDAO.js colocamos o seguinte código para podermos eniar dados para o MongoDB.

Como os nossos models estão sendo incorporados pelo consign, então precisamos fornecer a nossa classe no momento em que o autoloader carregar o nosso model. No caso, vamos colocar o module.exports no UsuarioDAO.js.

    function UsuariosDAO() {
        console.log('Objeto carregado');
    }

    module.exports = function(){
        return UsuariosDAO;
    }

Além disso, no cadastro.js de controllers, vamos precisar chamar essa classe, UsuariosDAO, definido da seguinte forma

    module.exports.cadastro = function(application, req, res){
        res.render('cadastro', {validacao: {}, dadosForm: {}});
    }

    module.exports.cadastrar = function(application, req, res) {
        // res.send('Teste - vamos cadastrar!');
        var dadosForm = req.body;
        req.assert('nome', 'Nome não pode ser vazio!').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio!').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio!').notEmpty();
        req.assert('casa', 'Casa não pode ser vazio!').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            // res.send('Existem erros no formulário!');
            res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
            return;
        }

        var UsuariosDAO = new application.app.models.UsuariosDAO;

        res.send('Podemos cadastrar!');
    }

Agora, podemos testar fazendo um cadastro manual. Assim, visto que está funcionando, agora, vamos ter que ir no arquivo UsuariosDAO.js e nela definir o prototype.

    function UsuariosDAO() {
    }

    UsuariosDAO.prototype.inserirUsuario = function(usuario) {
        console.log('Objeto carregado');
    }

    module.exports = function(){
        return UsuariosDAO;
    }

Agora, no cadastro, na variável UsuariosDAO que foi criado vamos precisar acessar a propriedade inserirUsuario

    module.exports.cadastro = function(application, req, res){
        res.render('cadastro', {validacao: {}, dadosForm: {}});
    }

    module.exports.cadastrar = function(application, req, res) {
        // res.send('Teste - vamos cadastrar!');
        var dadosForm = req.body;
        req.assert('nome', 'Nome não pode ser vazio!').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio!').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio!').notEmpty();
        req.assert('casa', 'Casa não pode ser vazio!').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            // res.send('Existem erros no formulário!');
            res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
            return;
        }

        var UsuariosDAO = new application.app.models.UsuariosDAO;

        UsuariosDAO.inserirUsuario(dadosForm);

        res.send('Podemos cadastrar!');
    }

Agora, novamente, vamos testar se desta vez está sendo enviado um objeto com todos os parâmetros estabelecidos.

No nodemon, devera aparecer algo do segunite gênero

    [nodemon] restarting due to changes...
    [nodemon] starting `node app`
    consign v0.1.6 Initialized in /home/leonardo/Documentos/estudos/mmorpg_got
    + ./app/routes/cadastro.js
    + ./app/routes/index.js
    + ./app/routes/jogo.js
    + ./config/dbConnection.js
    + ./app/models/UsuariosDAO.js
    + ./app/controllers/cadastro.js
    + ./app/controllers/index.js
    + ./app/controllers/jogo.js
    Servidor online
    {
    nome: 'Leonardo',
    usuario: 'leolexus',
    senha: '123456',
    casa: 'targaryen'
    }

Agora, falta abrirmos conexão com o MongoDB e inserir tais informações dentro do banco de dados.

No caso, em cadastro.js do controllers, vamos precisar chamar a conexão com o banco de dados.

    module.exports.cadastro = function(application, req, res){
        res.render('cadastro', {validacao: {}, dadosForm: {}});
    }

    module.exports.cadastrar = function(application, req, res) {
        // res.send('Teste - vamos cadastrar!');
        var dadosForm = req.body;
        req.assert('nome', 'Nome não pode ser vazio!').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio!').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio!').notEmpty();
        req.assert('casa', 'Casa não pode ser vazio!').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            // res.send('Existem erros no formulário!');
            res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
            return;
        }

        var connection = application.config.dbConnection;
        console.log(connection);
        var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

        UsuariosDAO.inserirUsuario(dadosForm);

        res.send('Podemos cadastrar!');
    }

A forma acima deverá aparecer no nodemon a seguinte msg

    [nodemon] restarting due to changes...
    [nodemon] starting `node app`
    consign v0.1.6 Initialized in /home/leonardo/Documentos/estudos/mmorpg_got
    + ./app/routes/cadastro.js
    + ./app/routes/index.js
    + ./app/routes/jogo.js
    + ./config/dbConnection.js
    + ./app/models/UsuariosDAO.js
    + ./app/controllers/cadastro.js
    + ./app/controllers/index.js
    + ./app/controllers/jogo.js
    Servidor online
    [Function: connMongoDB]

O ue indica que a conexão com o banco de dados foi estabelecida.

Assim, no arquivo UsuarioDAO.js vamos chamar a tal conexão da seguinte forma

    function UsuariosDAO(connection) {
        this._connection = connection();
    }

    UsuariosDAO.prototype.inserirUsuario = function(usuario) {
        // console.log(usuario);
        // insert(usuario);
        this._connection.open(function(err, mongoclient){
            mongoclient.collection('usuarios', function(err, collection){
                collection.insert(usuario);
            });
        });
    }

    module.exports = function(){
        return UsuariosDAO;
    }

Agora, vamos testar se vamos conseguir inserir alguma informação no mongoDB.
No caso, podemos executar o comando mongosh para verificarmos se estaria criando ou não.

No caso, não estou conseguindo inserir. Voltar a assistir as aulas de mongoDB para verificar como no formato atualizado podemos inserir algum documento para conseguirmos dar continuidade no curso de nodejs.

Uma solução para isso, bastaria ver essa documentação do github:

    https://github.com/mongodb/node-mongodb-native

No caso, via a instrução acima, o que funcionou foi o seguinte código colocado de forma não assíncrona em dbConnection

    const { MongoClient } = require('mongodb');
    // or as an es module:
    // import { MongoClient } from 'mongodb'

    // Connection URL
    // const url = 'mongodb://localhost:27017';
    const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';
    const client = new MongoClient(url);

    // Database Name
    const dbName = 'got';

    var connMongoDB = function main() {
    // Use connect method to connect to the server
    client.connect();
    console.log('Conectado com sucesso no servidor!');
    const db = client.db(dbName);
    // const collection = db.collection('usuarios').insertOne({nome: 'Leonardo', apelido: 'OtakuFedido', senha: 741852, casa: 'Corvinal'});

    // the following code examples can be pasted here...

    // return 'done.';
    // return collection;
    return db;
    }

    // main()
    //   .then(console.log)
    //   .catch(console.error)
    //   .finally(() => client.close());

    module.exports = function() {
    return connMongoDB;
    }

Precisa tbm aprender a fechar a conexão com o banco de dados:

    https://www.mongodb.com/community/forums/t/client-close-is-not-a-function/579

    https://www.mongodb.com/community/forums/t/mongoclient-nodejs-open-close-connection-events/15042

    https://stackoverflow.com/questions/8373905/when-to-close-mongodb-database-connection-in-nodejs

    https://github.com/mongodb/node-mongodb-native

## Aula 8 - Opcional - Download dos arquivos MMORPG GOT:
Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos do projeto MMORPG GOT no estado em que se encontram na aula anterior.

Bons estudos ;)