# Seção 16 - Autenticação através de sessão com Express-Session:
## Aula 1 - Sessão com Express-Session:
Vamos aprender sobre o conceito de Express-Session.

    https://stackoverflow.com/questions/23566555/whats-difference-with-express-session-and-cookie-session

    https://expressjs.com/pt-br/advanced/best-practice-security.html#:~:text=O%20middleware%20express%2Dsession%20armazena,para%20um%20ambiente%20de%20produ%C3%A7%C3%A3o.

## Aula 2 - NPM - Instalando o Express-Session:
Vamos instalar o express-session. Para isso, bastaria rodar o seguinte comando de linha:

    npm install express-session --save

## Aula 3 - Criando o controller de autenticação:
Vamos aprender a criar controller de autenticação.

No caso, no arquivo index.ejs de views, vamos realizar a seguinte modificação na div com class container.

    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <form class="form-inline form-entrar" action="/autenticar" method="post">
                <div class="form-group">				
                    <input type="text" name="usuario" id="usuario" placeholder="Usuário" class="form-control" autocomplete="off" />
                    <input type="password" name="senha" id="senha" placeholder="Senha" class="form-control" />
                    <button type="submit" class="btn btn-success">Entrar</button>
                    <button type="button" class="btn btn-info">Cadastro</button>
                </div>
            </form>
        </div>
        
    </nav>

Agora, no arquivo index.js de routes, precisamos realizar a seguinte modificação:

    module.exports = function(application){
        application.get('/', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('index');
            application.app.controllers.index.index(application, req, res);
        });

        application.post('/autenticar', function(req, res){
            // res.send('chegando aqui');
            application.app.controllers.index.autenticar(application, req, res);
        });
    }

Agora, no index.js de controllers vamos precisar realizar a seguinte implementação.

    module.exports.index = function(application, req, res) {
        res.render('index');
    }

    module.exports.autenticar = function(application, req, res) {
        // res.send('chegou no controller');

        var dadosForm = req.body;

        req.assert('usuario', 'Usuário não deve ser vazio').notEmpty();
        req.assert('senha', 'Senha não deve ser vazio').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            res.render('index', {validacao: erros});
            return;
        }

        res.send('tudo ok para criar a sessão');
    }

Agora, no index.ejs do views, precisamos criar uma div que exiba tais mensagens de erros.

    <div class="container">
        
        <% if(validacao.length > 0){ %>
            <div class="alert alert-danger">
                <strong>Atenção!</strong>
                <ul>
                    <% for(var i = 0; i < validacao.length; i++) { %>
                        <li><%=validacao[i].msg%></li>
                    <% } %>
                </ul>
            </div>
        <% } %>

        <form class="form-inline form-entrar" action="/autenticar" method="post">
            <div class="form-group">				
                <input type="text" name="usuario" id="usuario" placeholder="Usuário" class="form-control" autocomplete="off" />
                <input type="password" name="senha" id="senha" placeholder="Senha" class="form-control" />
                <button type="submit" class="btn btn-success">Entrar</button>
                <button type="button" class="btn btn-info">Cadastro</button>
            </div>
        </form>
    </div>

## Aula 4 - Configurando o Express-Session em nossa aplicação:
A aula anterior serviu para criar um ambiente que dê para realizar as implementações necessárias para podermos aplicar o middleware, express-session.

Mas, antes disso, precisamos realizar um pequeno ajuste nas tratativas da tela index.ejs, pois quando colocamos usuários e senhas de forma correta e vamos para a tela "/autenticar", donde é exibido a msg "tudo ok para criar a sessão".

A partir dessa tela, quando apagamos a rota "/autenticar" será exibido a seguinte msg

    ReferenceError: /home/leonardo/Documentos/estudos/mmorpg_got/app/views/index.ejs:24
        22| 			<div class="container">

        23| 				

    >> 24| 				<% if(validacao.length > 0){ %>

        25| 					<div class="alert alert-danger">

        26| 						<strong>Atenção!</strong>

        27| 						<ul>


    validacao is not defined
        at eval (eval at compile (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/ejs/lib/ejs.js:524:12), <anonymous>:11:8)
        at returnedFn (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/ejs/lib/ejs.js:555:17)
        at tryHandleCache (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/ejs/lib/ejs.js:203:34)
        at exports.renderFile [as engine] (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/ejs/lib/ejs.js:412:10)
        at View.render (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/view.js:128:8)
        at tryRender (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/application.js:640:10)
        at Function.render (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/application.js:592:3)
        at ServerResponse.render (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/response.js:971:7)
        at module.exports.index (/home/leonardo/Documentos/estudos/mmorpg_got/app/controllers/index.js:2:9)
        at /home/leonardo/Documentos/estudos/mmorpg_got/app/routes/index.js:5:37
        at Layer.handle [as handle_request] (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/router/layer.js:95:5)
        at next (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/router/route.js:137:13)
        at Route.dispatch (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/router/route.js:112:3)
        at Layer.handle [as handle_request] (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/router/layer.js:95:5)
        at /home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/router/index.js:281:22
        at Function.process_params (/home/leonardo/Documentos/estudos/mmorpg_got/node_modules/express/lib/router/index.js:335:12)

No caso, está sendo lançado o erro acima, pois no index.ejs, dentro dela, tem a variável "validacao", donde não definimos.

Para corrigirmos esse problema, precisamos definir a variável validacao no index.js do controllers.

    module.exports.index = function(application, req, res) {
        res.render('index', {validacao: {}});
    }

Agora, sim, vamos importar o express-session e implementa-la.

No caso, no arquivo server.js do diretório config, nela iremos realizar a seguinte alteração.

    /* importar o módulo do framework express */
    var express = require('express');

    /* importar o módulo do consign */
    var consign = require('consign');

    /* importar o módulo do body-parser */
    var bodyParser = require('body-parser');

    /* importar o módulo do express-validator */
    var expressValidator = require('express-validator');

    /* importar o módulo do express-validator */
    var expressSession = require('express-session');

    /* iniciar o objeto do express */
    var app = express();

    /* setar as variáveis 'view engine' e 'views' do express */
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    /* configurar o middleware express.static */
    app.use(express.static('./app/public'));

    /* configurar o middleware body-parser */
    app.use(bodyParser.urlencoded({extended: true}));

    /* configurar o middleware express-validator */
    app.use(expressValidator());

    // configura o middleware express-session
    app.use(expressSession({
        secret: 'Bla Bla',
        resave: false,
        saveUnitialized: false
    }));

    /* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
    consign()
        .include('app/routes')
        .then('config/dbConnection.js')
        .then('app/models')
        .then('app/controllers')
        .into(app);

    /* exportar o objeto app */
    module.exports = app;

## Aula 5 - Autenticando usuários com Express-Session - parte 1:
Agora que configuramos o controller e o middleware, express-session, vamos implementar a lógica que receberá os dados do formulário do login para validar com as informações salvas no banco de dados.

Isso permitirar criar uma lógica que limite os tipos de acessos.

No caso, no arquivo index.js de controllers, vamos realizar a seguinte alteração.

    module.exports.index = function(application, req, res) {
        res.render('index', {validacao: {}});
    }

    module.exports.autenticar = function(application, req, res) {
        // res.send('chegou no controller');

        var dadosForm = req.body;

        req.assert('usuario', 'Usuário não deve ser vazio').notEmpty();
        req.assert('senha', 'Senha não deve ser vazio').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            res.render('index', {validacao:erros});
            return;
        }

        var connection = application.config.dbConnection;
        var UsuariosDAO =new application.app.models.UsuariosDAO(connection);

        UsuariosDAO.autenticar(dadosForm);

        res.send('tudo ok para criar a sessão');
    }

Agora, vamos ter que pegar o arquivo UsuarioDAO.js e nela criar mais um protótipo, autenticar:

    function UsuariosDAO(connection) {
        // console.log('Mostrar conexão antes: ', connection);
        this._connection = connection();
        // console.log('Mostrar conexão depois: ', this._connection);
    }

    UsuariosDAO.prototype.inserirUsuario = function(usuario) {
        // console.log(usuario);
        // insert(usuario);
        // this._connection.open( function(err, mongoclient){
        //     mongoclient.collection('usuarios', function(err, collection){
        //         collection.insert(usuario);
        //     });
        // } );
        this._connection.collection('usuarios').insertOne(usuario);
    }

    UsuariosDAO.prototype.autenticar = function(usuario) {
        // console.log(usuario);
        // this._connection.collection('usuarios').find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}});
        this._connection.collection('usuarios').find(usuario).toArray(function(err, result){
            console.log(result);
        });
        // this._connection.close();
    }

    module.exports = function(){
        return UsuariosDAO;
    }

No caso, acima é um teste. Agora, vamos para validação.

    function UsuariosDAO(connection) {
        // console.log('Mostrar conexão antes: ', connection);
        this._connection = connection();
        // console.log('Mostrar conexão depois: ', this._connection);
    }

    UsuariosDAO.prototype.inserirUsuario = function(usuario) {
        // console.log(usuario);
        // insert(usuario);
        // this._connection.open( function(err, mongoclient){
        //     mongoclient.collection('usuarios', function(err, collection){
        //         collection.insert(usuario);
        //     });
        // } );
        this._connection.collection('usuarios').insertOne(usuario);
    }

    UsuariosDAO.prototype.autenticar = function(usuario, req) {
        // console.log(usuario);
        // this._connection.collection('usuarios').find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}});
        this._connection.collection('usuarios').find(usuario).toArray(function(err, result){
            // console.log(result);
            if(result[0] != undefined) {
                // Lembra quando colocamos o middleware express-session em server.js?
                req.session.autorizado = true;
            }
        });
        // this._connection.close();
    }

    module.exports = function(){
        return UsuariosDAO;
    }

Além disso, no index.js do controllers, precisamos enviar o req tbm, pois acima está sendo solicitado para possibilitar a aplicação do middleware, express-session.

    module.exports.index = function(application, req, res) {
        res.render('index', {validacao: {}});
    }

    module.exports.autenticar = function(application, req, res) {
        // res.send('chegou no controller');

        var dadosForm = req.body;

        req.assert('usuario', 'Usuário não deve ser vazio').notEmpty();
        req.assert('senha', 'Senha não deve ser vazio').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            res.render('index', {validacao:erros});
            return;
        }

        var connection = application.config.dbConnection;
        var UsuariosDAO =new application.app.models.UsuariosDAO(connection);

        UsuariosDAO.autenticar(dadosForm, req);

        res.send('tudo ok para criar a sessão');
    }

Agora, vamos refinar mais ainda os métodos autenticação no UsuariosDAO.js

    function UsuariosDAO(connection) {
        // console.log('Mostrar conexão antes: ', connection);
        this._connection = connection();
        // console.log('Mostrar conexão depois: ', this._connection);
    }

    UsuariosDAO.prototype.inserirUsuario = function(usuario) {
        // console.log(usuario);
        // insert(usuario);
        // this._connection.open( function(err, mongoclient){
        //     mongoclient.collection('usuarios', function(err, collection){
        //         collection.insert(usuario);
        //     });
        // } );
        this._connection.collection('usuarios').insertOne(usuario);
    }

    UsuariosDAO.prototype.autenticar = function(usuario, req, res) {
        // console.log(usuario);
        // this._connection.collection('usuarios').find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}});
        this._connection.collection('usuarios').find(usuario).toArray(function(err, result){
            // console.log(result);
            if(result[0] != undefined) {
                // Lembra quando colocamos o middleware express-session em server.js?
                req.session.autorizado = true;
            }

            if(req.session.autorizado) {
                res.send('Usuário foi encontrado no banco de dados!');
            } else {
                res.send('Usuário não existe no banco de dados!');
            }
        });
        // this._connection.close();
    }

    module.exports = function(){
        return UsuariosDAO;
    }

Para isso, será necessário tbm alterar no index.js de controllers

    module.exports.index = function(application, req, res) {
        res.render('index', {validacao: {}});
    }

    module.exports.autenticar = function(application, req, res) {
        // res.send('chegou no controller');

        var dadosForm = req.body;

        req.assert('usuario', 'Usuário não deve ser vazio').notEmpty();
        req.assert('senha', 'Senha não deve ser vazio').notEmpty();

        var erros = req.validationErrors();

        if(erros) {
            res.render('index', {validacao:erros});
            return;
        }

        var connection = application.config.dbConnection;
        var UsuariosDAO =new application.app.models.UsuariosDAO(connection);

        UsuariosDAO.autenticar(dadosForm, req, res);

        // res.send('tudo ok para criar a sessão');
    }

Lembrando só podemos ter um response, res, à cada request, req.

Agora, vamos fazer, por meio do uso de middleware, express-session, sempre que um usuário logar uma única vez, nas próximas vezes, em que o mesmo acessar a mesma tela não precisar realizar novamente o login.

No caso, para possibilitar isso, no arquivo UsuariosDAO.js, vamos colocar a seguinte configuração.

    function UsuariosDAO(connection) {
        // console.log('Mostrar conexão antes: ', connection);
        this._connection = connection();
        // console.log('Mostrar conexão depois: ', this._connection);
    }

    UsuariosDAO.prototype.inserirUsuario = function(usuario) {
        // console.log(usuario);
        // insert(usuario);
        // this._connection.open( function(err, mongoclient){
        //     mongoclient.collection('usuarios', function(err, collection){
        //         collection.insert(usuario);
        //     });
        // } );
        this._connection.collection('usuarios').insertOne(usuario);
    }

    UsuariosDAO.prototype.autenticar = function(usuario, req, res) {
        // console.log(usuario);
        // this._connection.collection('usuarios').find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}});
        this._connection.collection('usuarios').find(usuario).toArray(function(err, result){
            console.log(result);
            if(result[0] != undefined) {
                // Lembra quando colocamos o middleware express-session em server.js?
                req.session.autorizado = true;

                req.session.usuario = result[0].usuario;
                req.session.casa = result[0].casa;
            }

            if(req.session.autorizado) {
                // res.send('Usuário foi encontrado no banco de dados!');
                res.redirect("jogo");
            } else {
                // res.send('Usuário não existe no banco de dados!');
                res.render("index", {validacao: {}});
            }
        });
        // this._connection.close();
    }

    module.exports = function(){
        return UsuariosDAO;
    }

Agora, é só testar novamente para ver se foi implementado da forma que esperamos.

Vimos que para o usuário não cadastrado continuamos na mesma página de index.ejs, e se for um usuário que existe no banco de dados, então foi redirecionado à página de jogos.

## Aula 6 - Autenticando usuários com Express-Session - parte 2:
Agora, vamos finalizar os métodos de autenticação. No caso, usando o cookie, para possibilitar ao usuário, uma vez logado na máquina, quando for acessar na mesma máquina, ele não precisar realizar login novamente.

Primeiramente, precisamos restringir a rota do jogo, pois no formato atual, se simplesmente jogarnos na tela do navegador, localhost/jogo, é possível acessarmos a tela.

Vamos precisar impedir que seja possível acessar essa tela de forma livre, mas, sim, somente mediante ao login.

No caso, vamos tratar esse problema no arquivo jogo.js de controllers, mas vale ressaltar que a mesma tratativa é possível ser feito em jogo.js de routes.

    module.exports.jogo = function(application, req, res) {
        if(req.session.autorizado) {
            res.render('jogo');
        } else {
            res.send('Usuário precisa fazer o login!');
        }
    }

Agora, ao abrir um navegador anônimo e nela tentarmos acessar a tela de jogo, vamos ver que não será possível!

Já com o login válido , será possível realizar o acesso na tela.

Existem tbm outros métodos de autenticação, como tokens.

## Aula 7 - Destruindo a sessão com Session.destroy():
Vamos aprender a destruir a sessão, de modo que ao clicar no botão, não seja mais possível acessar a tela de jogo, a não ser que seja feita uma nova autenticação.

No caso, usaremos o botão "sair" de jogo.ejs de views.

    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="form-group sair">
                <button type="button" class="btn btn-info pull-right" id="btn_sair">Sair</button>
            </div>
        </div>
    </nav>

Além disso, usaremos o jquery, para conseguirmos definir as ações mediante ao evento de click.

    <script>
        $(document).ready( function(){
            $('#btn_sair').click(function(){
                window.location.href = '/sair';
            });
        });
    </script>

No caso, com as configurações acima, podemos realizar o teste entrando na tela jogo com o login válido e depois saindo dela clicando no botão "sair".

Visto que está funcionando, agora, em jogo.js de routes, nela iremos configurar a tal rota que definimos no jogo.ejs de views acima.

    module.exports = function(application){
        application.get('/jogo', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('jogo');
            application.app.controllers.jogo.jogo(application, req, res);
        });

        application.get('/sair', function(req, res){
            application.app.controllers.jogo.sair(application, req, res);
        });
    }

Agora, em jogo.js de controllers, vamos renderizar essa rota sair que definimos.

    module.exports.jogo = function(application, req, res) {
        if(req.session.autorizado) {
            res.render('jogo');
        } else {
            res.send('Usuário precisa fazer o login!');
        }
    }

    module.exports.sair = function(application, req, res) {
        res.send('sair');
    }

Agora, podemos testar se está tudo funcionando corretamente.

Visto que está funcionando corretamente, vamos agora destruir a seção

    module.exports.jogo = function(application, req, res) {
        if(req.session.autorizado) {
            res.render('jogo');
        } else {
            res.send('Usuário precisa fazer o login!');
        }
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

Com o formato acima, podemos ver que está funcionando como esperávamos.

## Aula 8 - Opcional - Download dos arquivos MMORPG GOT:
Opcional - Download dos arquivos MMORPG GOT

Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos do projeto MMORPG GOT no estado em que se encontram na aula anterior.

Bons estudos ;)