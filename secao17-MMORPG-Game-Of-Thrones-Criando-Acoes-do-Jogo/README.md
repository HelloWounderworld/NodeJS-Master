# Seção 17 - MMORPG Game Of Thrones - Criando ações do Jogo:
## Aula 1 - Ajustando a bandeira da casa do jogador:
Vamos verificar agora diversos cenários de problemas e suas soluções, na expectativa de que isso sejam úteis nos seus projetos futuros.
Vamos, primeiro, ajustar as bandeiras.

No caso, sempre que um jogador for logar no jogo, queremos exibir na tela de jogo de qual bandeira esse jogador pertence.

Primeiro, note que, em UsuariosDAO.js no protótipo autenticar, nela fizemos a requisição de uma sessão que consta a casa
    
    req.session.casa = result[0].casa;

Visto que isso foi feito, então em jogo.js de controllers, vamos precisar que tal casa seja chamado.

    module.exports.jogo = function(application, req, res) {
        if(req.session.autorizado) {
            res.render('jogo', {img_casa: req.session.casa});
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

Feito isso, em jogo.ejs, na div img, vamos chamar essa variável que definimos.

    <div class="col-sm-3 casa">
        <img src="images/casa_<%=img_casa%>.jpg" />
    </div>

Daí, ao logarmos, se tudo ocorreu certo, vamos poder verificar a casa em que o usuário pertence e a sua bandeira estará sendo exibido.

Ou seja, a imagem da bandeira foi carregada.

No caso, agora, as bandeiras da casa para exibição foi dinamizada.

## Aula 2 - Gerando pontos de habilidade, súditos e moedas:
Vamos dar mais dinâmica para o nosso jogo.

O que queremos fazer aqui é definir as qualidade pré-inatas de quando cada pessoa escolha as casas na qual ela acha que mais se adequa.

Entretanto, definir para cada casa uma qualidade pré-definida, precisaria de mais alguns conceitos que foge fora do escopo do que queremos ensinar nesse curso.

Logo, por hora, vamos fazer com que tais qualidades, independente de qual casa escolhida, seja feita de forma randomica.

Vamos criar um novo arquivo no models com nome JogoDAO.js.

Esse arquivo vai manipular os documentos dentro da collection jogo.

Dentro desse arquivo, vamos colocar a seguinte configuração

    function JogoDAO(connection) {
        this._connection = connection();
    }

    module.exports = function(){
        return JogoDAO;
    }

Por hora, são configurações básicas.

Além disso, no cadastro.js de controllers, precisamos enviar tais qualidades de cada casa que será definido de forma randômica.

Para isso, nesse arquivo será criado algo que esteja relacionado à geração dos parâmetros.

Mas antes disso, vamos pegar o arquivo jogoDAO.js e dentro dela configurar as funções que irá receber tais parâmetros.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

Agora, no cadastro.js de controllers, vamos precisar realizar a seguinte customização.

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
        // console.log('Estado da conexão: ', connection);
        var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
        var JogoDAO = new application.app.models.JogoDAO(connection);

        UsuariosDAO.inserirUsuario(dadosForm);
        JogoDAO.gerarParametros(dadosForm.usuario);

        // geracao dos parametros

        res.send('Podemos cadastrar!');
    }

Feito as configurações acima, vamos realizar os testes.

Cada vez que fizermos os cadastros, no banco de dados, MongoDB, será criado uma coleção jogo e dentro dela será acrescentado as informações pré-definidas do usuário.

## Aula 3 - Exibindo pontos de habilidades, súditos e moedas:
Agora que estamos gerando os parâmetros acima no banco de dados, precisamos que elas sejam exibidas.

No caso, em jogo.js de controllers, vamos precisar configurar para possibilitar essa exibição.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        var usuario = req.session.usuario;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.iniciaJogo(usuario);
        res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

Vale lembrar que a variável usuario que foi criado acima, só foi possível por conta do que está em UsuarioDAO quando validamos o req.session.usuario.

Agora, em jogoDAO.js de models, vamos criar a função iniciaJogo onde irá requisitar as informações dos parâmetros no banco de dados.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(usuario) {
        console.log('Iniciar os parâmetros do jogo');
    }

    module.exports = function(){
        return JogoDAO;
    }

A forma acima será feita para podermos realizar o teste.

No caso, precisamos acessar com um login válido da tela de jogo, para verificarmos se está tudo funcionando corretamente.

Visto que está funcionando, vamos implementar a lógica em jogoDAO.js.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(usuario) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            console.log(result);
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

No caso, dentro do jogoDAO.js da função iniciaJogo, vamos precisar renderizar a tela de jogo para podermos enviar os dados de cada parâmetro.

Para isso, antes em jogo.js, vamos precisar enviar mais algumas informações dentro dessa função iniciaJogo.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.iniciaJogo(res, usuario, casa);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

Daí, em jogoDAO.js, vamos precisar colocar mais variáveis para receberem mais parâmetros.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            console.log(result[0]);
            res.render('jogo', {img_casa: casa, jogo: result[0]});
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

Por último, em jogo.ejs, vamos precisar exibir tais parâmetros.

    <div class="container">
    
        <div class="row">
            <div class="col-sm-3 casa">
                <img src="images/casa_<%=img_casa%>.jpg" />
            </div>

            <div class="col-sm-9">
                <div class="row barra-superior">
                    <div class="col-sm-2"> 
                        <img src="images/habilidades/temor.jpg" title="Temor" alt="Temor" />
                        <span><%=jogo.temor%></span>
                    </div>
                    
                    <div class="col-sm-2"> 
                        <img src="images/habilidades/sabedoria.jpg" title="Sabedoria" alt="Sabedoria"/>
                        <span><%=jogo.sabedoria%></span>
                    </div>
                    
                    <div class="col-sm-2"> 
                        <img src="images/habilidades/comercio.jpg" title="Comércio" alt="Comércio"/>
                        <span><%=jogo.comercio%></span>
                    </div>
                    
                    <div class="col-sm-2"> 
                        <img src="images/habilidades/magia.jpg" title="Magia" alt="Magia"/>
                        <span><%=jogo.magia%></span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-9">
                <div class="acoes"></div>					
            </div>
        </div>
        
    </div>	
    
    <div class="barra-inferior">
        <div class="container">
        
            <div class="row">
                <div class="col-sm-1">
                    <img src="images/outros/suditos.jpg" title="Aldeões" alt="Aldeões"/>
                    <span><%=jogo.suditos%></span>
                </div>
                
                <div class="col-sm-1">
                    <img src="images/outros/pergaminho.jpg" title="Pergaminhos" alt="Pergaminhos"/>
                </div>
                
                <div class="col-sm-8"></div>
                
                <div class="col-sm-2">
                    <img src="images/outros/moeda.jpg" title="Moeda" alt="Moeda"/>
                    <span><%=jogo.moeda%></span>
                </div>
                
            </div>
        </div>
    </div>

Assim, vemos que já estão sendo exibidos os parâmetros em cada lugar.

## Aula 4 - Carregando as views de súditos e pergaminhos via Ajax com JQuery:
Vamos aprender a carregar as views correspondentes aos súditos e ao pergaminho.

No caso, no diretório views, temos dois arquivos, aldeoes.ejs e pergaminhos.ejs.

Vamos precisar carregar ela utilizando o método ajax, através de uma requisição assíncrona.

No caso, em jogo.js de routes, vamos criar mais duas rotas.

    module.exports = function(application){
        application.get('/jogo', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('jogo');
            application.app.controllers.jogo.jogo(application, req, res);
        });

        application.get('/sair', function(req, res){
            application.app.controllers.jogo.sair(application, req, res);
        });

        application.get('/suditos', function(req, res){
            application.app.controllers.jogo.suditos(application, req, res);
        });

        application.get('/pergaminhos', function(req, res){
            application.app.controllers.jogo.pergaminhos(application, req, res);
        });
    }

No caso, com a rota configurada, vamos precisar, agora, definir as funções correspondentes de cada rota definida.

Assim, no jogo.js de controllers, vamos definir tais funções.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.iniciaJogo(res, usuario, casa);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        res.render("pergaminhos");
    }

No caso, definidas as duas funções, suditos e pergaminhos, acima podemos agora acessar tais rotas ao jogarmos no navegador.

Visto que as rotas acimas estão sendo possíveis em serem acessadas, vamos precisar que tais acessos sejam permitidos apenas quando acessarmos a tela jogo.

No caso, primeiro, em jogo.ejs vamos definir a possibilitar em acessar tais rotas.

    <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-9">
            <div class="acoes" id="acoes">Senhor, o que deseja fazer hoje?</div>					
        </div>
    </div>

Agora, iremos aplicar o método ajax para realizar isso.

Assim, no mesmo arquivo jogo.ejs, vamos colocar as seguintes configurações

    <div class="row">
        <div class="col-sm-1">
            <img src="images/outros/suditos.jpg" title="Aldeões" alt="Aldeões" id="btn_suditos"/>
            <span><%=jogo.suditos%></span>
        </div>
        
        <div class="col-sm-1">
            <img src="images/outros/pergaminho.jpg" title="Pergaminhos" alt="Pergaminhos" id="btn_pergaminho"/>
        </div>
        
        <div class="col-sm-8"></div>
        
        <div class="col-sm-2">
            <img src="images/outros/moeda.jpg" title="Moeda" alt="Moeda"/>
            <span><%=jogo.moeda%></span>
        </div>
        
    </div>

Basicamente, as configurações estabelecidas acima, em criar os ids, será definida o evento de click sobre elas para possibilitar o acesso à telas aldeoes e pergaminhos definidas pelas rotas anteriormente.

No caso, no mesmo arquivo, jogo.ejs, será usado javascript para definirmos tais eventos.

    <script>
        $(document).ready( function(){
            $('#btn_sair').click(function(){
                window.location.href = '/sair';
            });

            $('#btn_suditos').click(function(){
                alert('BTN suditos clicado');
            });

            $('#btn_pergaminho').click(function(){
                alert('BTN pergaminho clicado');
            });
        });
    </script>

Daí, agora, podemos testar se está sendo possível clicar em suditos e pergaminhos acessando a tela de jogo.

No caso, a configuração acima, é apenas um "Hello World", então visto que está sendo exibido a msg, podemos agora usar o ajax para configurarmos definitivamente a rota
No caso, podemos entender que o ajax é uma espécie de components de vue (explicação para quem sabe vue). Ou seja, vc consegue exibir uma tela inteira dentro de uma outra tela.

Logo, em jogo.ejs, vamos realizar a seguinte configuração.

    <script>
        $(document).ready( function(){
            $('#btn_sair').click(function(){
                window.location.href = '/sair';
            });

            $('#btn_suditos').click(function(){
                // alert('BTN suditos clicado');
                $.ajax({
                    url: '/suditos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                    }
                });
            });

            $('#btn_pergaminho').click(function(){
                // alert('BTN pergaminho clicado');
                $.ajax({
                    url: '/pergaminhos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                    }
                })
            });
        });
    </script>

## Aula 5 - Ações com súditos - recebendo e validando dados:
Vamos implementar o formulário que permitirá realizar as ações com os súditos.

No caso, no arquivo aldeoes.ejs vamos definir o seguinte na tag form

    <form class="form-cadastro" action="/ordenar_acao_sudito" method="post">

        <div class="row">
            <div class="col-xs-5">
                <div class="form-group">
                    <select class="form-control" name="acao">
                        <option value="">-- Escolha a ação</option>
                        <option value="1">Coletar recursos (2G e 1H)</option>
                        <option value="2">Enforcar aldeão (3G e 2H)</option>
                        <option value="3">Ensinar história (1G e 5H)</option>
                        <option value="4">Ensinar magia (1G e 5H)</option>
                    </select>										
                </div>
            </div>
            
            <div class="col-xs-3">
                <div class="form-group">
                    <input type="number" class="form-control" name="quantidade" id="quantidade" placeholder="Quantidade">									
                </div>
            </div>
            
            <div class="col-xs-4">
                <div class="form-group row">
                    <button type="submit" class="btn btn-primary">Ordenar</button>
                </div>
            </div>
            
        </div>
        
        <hr />
        <div class="row">
            <div class="col-xs-12">
                <span>Senhor, você possui 8 aldeões desocupados e 2 aldeões em atividade.</span>
            </div>
        </div>
    </form>

Agora, falta ajustarmos as nossas rotas para tais finalidades que queremos.
No caso, em jogo.js de routes, iremos configurar da seguinte maneira.

    module.exports = function(application){
        application.get('/jogo', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('jogo');
            application.app.controllers.jogo.jogo(application, req, res);
        });

        application.get('/sair', function(req, res){
            application.app.controllers.jogo.sair(application, req, res);
        });

        application.get('/suditos', function(req, res){
            application.app.controllers.jogo.suditos(application, req, res);
        });

        application.get('/pergaminhos', function(req, res){
            application.app.controllers.jogo.pergaminhos(application, req, res);
        });

        application.post('/ordenar_acao_sudito', function(req, res){
            application.app.controllers.jogo.ordenar_acao_sudito(application, req, res);
        });
    }

Agora, em jogo.js de controllers, vamos definir tais funções que estamos chamando nas rotas.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.iniciaJogo(res, usuario, casa);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.redirect('jogo');
            return;
        }

        console.log(dadosForm);
        res.send('tudo ok!');
    }

Com o formato acima, podemos testar o que estará acontecendo acessando pelo navegador acessando a tela de jogo, novamente, pelo login e em seguida clicar em súditos escolher a ação pelo filtro e clicar em "Ordenar".

Se apareceu a msg "tudo ok!" e no console, pelo nodemon, aparecer algo do seguinte tipo

    [nodemon] restarting due to changes...
    [nodemon] starting `node app`
    express-session deprecated undefined saveUninitialized option; provide saveUninitialized option config/server.js:33:9
    consign v0.1.6 Initialized in /home/leonardo/Documentos/estudos/mmorpg_got
    + ./app/routes/cadastro.js
    + ./app/routes/index.js
    + ./app/routes/jogo.js
    + ./config/dbConnection.js
    + ./app/models/UsuariosDAO.js
    + ./app/models/jogoDAO.js
    + ./app/controllers/cadastro.js
    + ./app/controllers/index.js
    + ./app/controllers/jogo.js
    Servidor online
    Conectado com sucesso no banco de dados MongoDB Community Edition!
    [
    {
        _id: new ObjectId("63ade4f86ce4e9192dc73ac5"),
        nome: 'Leonardo',
        usuario: 'MadScientistWithDepression',
        senha: '123456',
        casa: 'targaryen'
    }
    ]
    Conectado com sucesso no banco de dados MongoDB Community Edition!
    {
    _id: new ObjectId("63ade4f86ce4e9192dc73ac6"),
    usuario: 'MadScientistWithDepression',
    moeda: 15,
    suditos: 10,
    temor: 98,
    sabedoria: 197,
    comercio: 836,
    magia: 709
    }
    { acao: '2', quantidade: '1' }

Ou seja, o objeto onde consta os elementos acao e quantidade, então significa que tudo está funcionando corretamente.

Além disso, se eu deixar de preencher alguma informação, ela deverá. como foi configurado, voltar para tela jogo.

Novamente, vamos precisar tbm exibir tais erros para instruir melhor o usuário.

Temos duas formas de realizarmos isso, uma utilizando o banco de dados e outra utilizando o método mais simples como foi feito abaixo.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        var comando_invalido = 'N';

        if(req.query.comando_invalido == 'S') {
            comando_invalido = 'S';
        }

        console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.iniciaJogo(res, usuario, casa);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.redirect('jogo?comando_invalido=S');
            return;
        }

        console.log(dadosForm);
        res.send('tudo ok!');
    }

Vemos que se testarmos agora com o formato acima, será exibido no console.log a msg de N mudando para S. 

Se preenchermos os dados a meia boca, será redirecionado na rota 'jogo?comando_invalido=S'.

Visto que isso funciona, então vamos precisar agora ecaminhar tal variável que definimos para jogoDAO.iniciaJogo.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        var comando_invalido = 'N';

        if(req.query.comando_invalido == 'S') {
            comando_invalido = 'S';
        }

        // console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.redirect('jogo?comando_invalido=S');
            return;
        }

        console.log(dadosForm);
        res.send('tudo ok!');
    }

Agora, em jogoDAO.js em models, vamos precisar recuperar essa informação incluída.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, comando_invalido) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            console.log(result[0]);
            res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

Em seguida, em jogo.ejs, vamos precisar verificar tal variável para conseguirmos exibir se caso ocorrer algum erro.

    <% if(comando_invalido == 'S') {%>
        <div class="alert alert-danger">
            <strong>Operação inválida, verifique se todos os campos foram informados!</strong>
        </div>
    <%} %>

Daí, vamos verificar se está sendo expressa tal mensagem testando todas as possibilidades de erros e acertos que aconteceria.

Para melhor maneira de exibição da msg na tela sem que ocorra alguma distorção, vamos precisar colocar a seguinte configuração em jogo.ejs.

    <% if(comando_invalido == 'S') {%>
        <div class="alert alert-danger" id="msg_erros">
            <strong>Operação inválida, verifique se todos os campos foram informados!</strong>
        </div>
    <%} %>

    <script>
        $(document).ready( function(){
            $('#btn_sair').click(function(){
                window.location.href = '/sair';
            });

            $('#btn_suditos').click(function(){
                // alert('BTN suditos clicado');
                $('#msg_erros').hide();
                $.ajax({
                    url: '/suditos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                    }
                });
            });

            $('#btn_pergaminho').click(function(){
                // alert('BTN pergaminho clicado');
                $('#msg_erros').hide();
                $.ajax({
                    url: '/pergaminhos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                    }
                })
            });
        });
    </script>

Daí, sempre que clicarmos novamente em súditos, vamos conseguir verificar que a msg de erro desaparece.

Agora, falta possibilitar o acesso às telas de súditos e pergaminhos somente quando verificarmos que o usuário está autenticado.

Para isso, realizamos a mesma lógica que foi implementada para restringir o acesso à tela de jogo.

No caso, em jogo.js de controllers, vamos realizar a seguinte configuração.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        var comando_invalido = 'N';

        if(req.query.comando_invalido == 'S') {
            comando_invalido = 'S';
        }

        // console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.redirect('jogo?comando_invalido=S');
            return;
        }

        console.log(dadosForm);
        res.send('tudo ok!');
    }

Feito a configuração acima, vamos poder restringir o acesso à telas jogo, suditos, pergaminhos e ordenar_acao_sudito.

## Aula 6 - Gravando ações no banco de dados:
Agora, vamos aprender a gravar ações no banco de dados.

O motivo disso, seria que as ações dos usuários afetem na dinâmica do jogo, mas para que isso aconteça, de alguma forma, a informação precisa estar sendo cadastrada no banco de dados de tal forma que a ação tenha uma dinâmica permanente.

No caso, o que quero dizer com tais dinâmicas, está relacionado às quantidades de súditos, moedas, habilidades, etc... Aquelas nas quais são dados númericos com seus respectivos significados.

Logo, iremos acessar o banco de dados MongoDB, para gravarmos tais ações que permita ta tal dinâmica.

No caso, vamos abrir o jogo.js de controllers e por lá realizar as devidas tratativas.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        var comando_invalido = 'N';

        if(req.query.comando_invalido == 'S') {
            comando_invalido = 'S';
        }

        // console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.redirect('jogo?comando_invalido=S');
            return;
        }

        // console.log(dadosForm);
        // res.send('tudo ok!');

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.acao(dadosForm);
    }

Após isso, em jogoDAO.js de models vamos realizar a seguinte modificação.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, comando_invalido) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            console.log(result[0]);
            res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
        });
    }

    JogoDAO.prototype.acao = function(acao) {
        console.log(acao);
    }

    module.exports = function(){
        return JogoDAO;
    }

No caso, a forma como configuramos a função acao acima, serve para primeiro verificar se está sendo feito o "Hello World!".

No caso, logamos novamente e executação alguma acao pelo súditos.

Visto que está tudo funcionando corretamente, e visto que o dadosForm está sendo enviado corretamente na função acao de jogoDAO.js, iremos, finalmente, inserir a gravação de tais ações no banco de dados.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, comando_invalido) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            console.log(result[0]);
            res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
        });
    }

    JogoDAO.prototype.acao = function(acao) {
        // console.log(acao);
        this._connection.collection('acao', function(err, collection){
            var date = new Date();

            var tempo = null;

            switch(acao.acao) {
                case 1: tempo = 1*60*60000;
                case 2: tempo = 2*60*60000;
                case 3: tempo = 5*60*60000;
                case 4: tempo = 5*60*60000;
            }

            acao.acao_terminal_em = date.getTime() + tempo;
            collection.insertOne(acao);
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

Além disso, em jogo.js de controllers, precisamos inserir mais uma informação dentro do objeto dadosForm, que é o usuário, pois precisamos saber à qual usuário cada ação está sendo estabelecido.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        var comando_invalido = 'N';

        if(req.query.comando_invalido == 'S') {
            comando_invalido = 'S';
        }

        // console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.redirect('jogo?comando_invalido=S');
            return;
        }

        // console.log(dadosForm);
        // res.send('tudo ok!');

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        dadosForm.usuario = req.session.usuario;
        JogoDAO.acao(dadosForm);

        res.send('tudo ok!');
    }

Com isso, podemos ver que tais ações estão sendo cadastrados no banco de dados.

Vimos que os comandos foram realizados com sucesso e conseguimos cadastrar cada acao na coleção "acao" do banco de dados.

Para refinarmos as melhoras em sabermos se tais ações foram ou não executados, vamos em jogo.js controllers e nela configurar a função ordenar_acao_sudito  da seguinte forma.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        // var comando_invalido = 'N';

        // if(req.query.comando_invalido == 'S') {
        //     comando_invalido = 'S';
        // }

        var msg = '';

        if(req.query.msg != ''){
            msg = req.query.msg;
        }

        // console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        // JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
        JogoDAO.iniciaJogo(res, usuario, casa, msg);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        // if(erros){
        //     res.redirect('jogo?comando_invalido=S');
        //     return;
        // }

        if(erros){
            res.redirect('jogo?msg=A');
            return;
        }

        // console.log(dadosForm);
        // res.send('tudo ok!');

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        dadosForm.usuario = req.session.usuario;
        JogoDAO.acao(dadosForm);

        // res.send('tudo ok!');
        res.redirect('jogo?msg=B');
    }

A mudança configurada irá perpetuar para jogoDAO.js e nela precisará configurar o seguinte

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            // console.log(result[0]);
            // res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
            res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
        });
    }

    JogoDAO.prototype.acao = function(acao) {
        // console.log(acao);
        var date = new Date();

        var tempo = null;

        switch(acao.acao) {
            case 1: tempo = 1*60*60000;
            case 2: tempo = 2*60*60000;
            case 3: tempo = 5*60*60000;
            case 4: tempo = 5*60*60000;
        }

        acao.acao_terminal_em = date.getTime() + tempo;
        this._connection.collection('acao').insertOne(acao);
    }

    module.exports = function(){
        return JogoDAO;
    }

E, por final, vamos precisar alterar em jogo.ejs.

    <% if(msg == 'A') {%>
        <div class="alert alert-danger" id="msg">
            <strong>Operação inválida, verifique se todos os campos foram informados!</strong>
        </div>
    <%} %>

    <% if(msg == 'B') {%>
        <div class="alert alert-info" id="msg">
            <strong>Ação realizada com sucesso!</strong>
        </div>
    <%} %>

## Aula 7 - Pergaminhos - recuperando ações do banco de dados:
Vamos, agora, recuperar tais ações em pergaminhos, visto que tais ações foram gravadas no banco de dados.

Por hora, vamos apenas listar os objetos.

Para isso, iremos usar a função jogo.js de controllers e nela usar a função pergaminhos que foi definido.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        // var comando_invalido = 'N';

        // if(req.query.comando_invalido == 'S') {
        //     comando_invalido = 'S';
        // }

        var msg = '';

        if(req.query.msg != ''){
            msg = req.query.msg;
        }

        // console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        // JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
        JogoDAO.iniciaJogo(res, usuario, casa, msg);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        // recuperar as ações inseridas no banco de dados.
        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        JogoDAO.getAcoes();

        res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        // if(erros){
        //     res.redirect('jogo?comando_invalido=S');
        //     return;
        // }

        if(erros){
            res.redirect('jogo?msg=A');
            return;
        }

        // console.log(dadosForm);
        // res.send('tudo ok!');

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        dadosForm.usuario = req.session.usuario;
        JogoDAO.acao(dadosForm);

        // res.send('tudo ok!');
        res.redirect('jogo?msg=B');
    }

Agora, em jogoDAO.js, vamos precisar definir a função que foi chamado na função pergaminhos.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            // console.log(result[0]);
            // res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
            res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
        });
    }

    JogoDAO.prototype.acao = function(acao) {
        // console.log(acao);
        var date = new Date();

        var tempo = null;

        switch(acao.acao) {
            case 1: tempo = 1*60*60000;
            case 2: tempo = 2*60*60000;
            case 3: tempo = 5*60*60000;
            case 4: tempo = 5*60*60000;
        }

        acao.acao_terminal_em = date.getTime() + tempo;
        this._connection.collection('acao').insertOne(acao);
    }

    JogoDAO.prototype.getAcoes = function(acao) {
        console.log('recuperar acoes');
    }

    module.exports = function(){
        return JogoDAO;
    }

No caso, o prototipo getAcoes definida acima vamos verificar se está sendo passado por lá.

Para isso no navegador, precisamos relogar novamente para entrar na tela de jogo e clicar em pergaminhos para verificar se o console.log é exibido.
Visto que está passando pela função getAcoes, então vamos agora implementar os códigos que recupera os dados dentro do banco de dados.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            // console.log(result[0]);
            // res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
            res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
        });
    }

    JogoDAO.prototype.acao = function(acao) {
        // console.log(acao);
        var date = new Date();

        var tempo = null;

        switch(acao.acao) {
            case 1: tempo = 1*60*60000;
            case 2: tempo = 2*60*60000;
            case 3: tempo = 5*60*60000;
            case 4: tempo = 5*60*60000;
        }

        acao.acao_terminal_em = date.getTime() + tempo;
        this._connection.collection('acao').insertOne(acao);
    }

    JogoDAO.prototype.getAcoes = function(usuario) {
        // console.log('recuperar acoes');
        this._connection.collection('acao').find({usuario: usuario}).toArray(function(err, result) {
            console.log(result);
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

Além disso, em jogo.js de controllers, vamos precisar passar o dado do usuário para podermos filtrar qual tipo de dado precisa ser recuperado.

No caso, na função pergaminho precisamos, por ela, enviar tal parâmetro.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        // var comando_invalido = 'N';

        // if(req.query.comando_invalido == 'S') {
        //     comando_invalido = 'S';
        // }

        var msg = '';

        if(req.query.msg != ''){
            msg = req.query.msg;
        }

        // console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        // JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
        JogoDAO.iniciaJogo(res, usuario, casa, msg);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        // recuperar as ações inseridas no banco de dados.
        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        var usuario = req.session.usuario;

        JogoDAO.getAcoes(usuario);

        res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        // if(erros){
        //     res.redirect('jogo?comando_invalido=S');
        //     return;
        // }

        if(erros){
            res.redirect('jogo?msg=A');
            return;
        }

        // console.log(dadosForm);
        // res.send('tudo ok!');

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        dadosForm.usuario = req.session.usuario;
        JogoDAO.acao(dadosForm);

        // res.send('tudo ok!');
        res.redirect('jogo?msg=B');
    }

Daí, podemos, agora, testar se está tudo funcionando relogando novamente na tela de jogos e clicando em pergaminhos.

## Aula 8 - Pergaminhos - exibindo ações:
Visto que agora estamos conseguindo recuperar os dados de cada ação, agora, vamos precisar exibi-las.

Assim, em jogoDAO.js, na função getAcoes, vamos renderizar a tela pergaminhos passando os parâmetros que estamos recuperando pelo banco de dados.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            // console.log(result[0]);
            // res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
            res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
        });
    }

    JogoDAO.prototype.acao = function(acao) {
        // console.log(acao);
        var date = new Date();

        var tempo = null;

        switch(acao.acao) {
            case 1: tempo = 1*60*60000;
            case 2: tempo = 2*60*60000;
            case 3: tempo = 5*60*60000;
            case 4: tempo = 5*60*60000;
        }

        acao.acao_terminal_em = date.getTime() + tempo;
        this._connection.collection('acao').insertOne(acao);
    }

    JogoDAO.prototype.getAcoes = function(usuario, res) {
        // console.log('recuperar acoes');
        this._connection.collection('acao').find({usuario: usuario}).toArray(function(err, result) {
            // console.log(result);
            res.render('pergaminhos', {acoes: result})
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

Além disso, em jogo.js de controllers, vamos precisar enviar o objeto res para o getAcoes que foi definido em jogoDAO.js.

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        // var comando_invalido = 'N';

        // if(req.query.comando_invalido == 'S') {
        //     comando_invalido = 'S';
        // }

        var msg = '';

        if(req.query.msg != ''){
            msg = req.query.msg;
        }

        // console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        // JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
        JogoDAO.iniciaJogo(res, usuario, casa, msg);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        // recuperar as ações inseridas no banco de dados.
        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        var usuario = req.session.usuario;

        JogoDAO.getAcoes(usuario, res);

        // res.render("pergaminhos");
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        // if(erros){
        //     res.redirect('jogo?comando_invalido=S');
        //     return;
        // }

        if(erros){
            res.redirect('jogo?msg=A');
            return;
        }

        // console.log(dadosForm);
        // res.send('tudo ok!');

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        dadosForm.usuario = req.session.usuario;
        JogoDAO.acao(dadosForm);

        // res.send('tudo ok!');
        res.redirect('jogo?msg=B');
    }

Agora, em pergaminho.ejs, nela iremos listar as ações que recuperamos no banco de dados.

Visto que está tudo rodando normalmente, então vamos agora preencher os dados de forma correta.

Assim, em pergaminhos.ejs, vamos realizar a seguinte modificação.

    <div id="pergaminhos">					
        <h3>Pergaminhos</h3>
        
        <ul>
            <% for(var i = 0; i < acoes.length; i++) { %>
                <%
                    var txt_acao = '';

                    switch(parseInt(acoes[i].acao)){
                        case 1: txt_acao = 'Aldeão(ões) coletando recursos'; break;
                        case 2: txt_acao = 'Enforcar Aldeões'; break;
                        case 3: txt_acao = 'aldeão(ões) em treinamento de história'; break;
                        case 4: txt_acao = 'aldeão(ões) em treinamento de magia'; break;
                    }

                    var date = new Date();
                    var momento_atual = date.getTime();

                    var segundos_restantes = Math.round((acoes[i].acao_terminal_em - momento_atual) / 1000);
                %>
                <li>
                    <%=acoes[i].quantidade%> <%=txt_acao%>
                    - <small>restam <%=segundos_restantes%> segundos 
                    - <a href="#">revogar ordem</a></small>
                </li>
            <% } %>
        </ul>
    </div>

Com isso, ao relogarmos para a tela jogo e clicarmos no pergaminho será exibido o tempo em segundos. Entretanto, esse tempo ele não está em exibição em tempo real.

Será necessário colocar em um formato de cronômetro onde a contagem seja exibido em tempo real.

## Aula 9 - Criando um cronometro para controlar o tempo das ações:
Vamos configurar o cronômetro.

Para isso, no jogoDAO.js da função getAcoes, nela vamos definir um outro parâmetro dentro de find.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            // console.log(result[0]);
            // res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
            res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
        });
    }

    JogoDAO.prototype.acao = function(acao) {
        // console.log(acao);
        var date = new Date();

        var tempo = null;

        switch(parseInt(acao.acao)) {
            case 1: tempo = 1*60*60000; break;
            case 2: tempo = 2*60*60000; break;
            case 3: tempo = 5*60*60000; break;
            case 4: tempo = 5*60*60000; break;
        }

        acao.acao_terminal_em = date.getTime() + tempo;
        this._connection.collection('acao').insertOne(acao);
    }

    JogoDAO.prototype.getAcoes = function(usuario, res) {
        // console.log('recuperar acoes');
        var date = new Date();
        var momento_atual = date.getTime();
        this._connection.collection('acao').find({usuario: usuario, acao_terminal_em: {$gt:momento_atual}}).toArray(function(err, result) {
            // console.log(result);
            res.render('pergaminhos', {acoes: result})
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

Daí, feito isso, percebe-se que em pergaminhos não será mais exibido as ações que já superaram o tempo.

Agora, vamos automotizar a contagem de tempo e exibir o mesmo.
No caso, em jogo.ejs na parte de script onde tempo jquery de btn_pergaminhos, vamos realizar a seguinte modificação.

Além disso, em pergaminhos.ejs, vamos precisar definir a tal classe que chamamos para realizarmos a contagem de menos.

    <div id="pergaminhos">					
        <h3>Pergaminhos</h3>
        
        <ul>
            <% for(var i = 0; i < acoes.length; i++) { %>
                <%
                    var txt_acao = '';

                    switch(parseInt(acoes[i].acao)){
                        case 1: txt_acao = 'Aldeão(ões) coletando recursos'; break;
                        case 2: txt_acao = 'Enforcar Aldeões'; break;
                        case 3: txt_acao = 'aldeão(ões) em treinamento de história'; break;
                        case 4: txt_acao = 'aldeão(ões) em treinamento de magia'; break;
                    }

                    var date = new Date();
                    var momento_atual = date.getTime();

                    var segundos_restantes = Math.round((acoes[i].acao_terminal_em - momento_atual) / 1000);
                %>
                <li>
                    <%=acoes[i].quantidade%> <%=txt_acao%>
                    - <small>restam <span class="tempo_restante"><%=segundos_restantes%></span> segundos 
                    - <a href="#">revogar ordem</a></small>
                </li>
            <% } %>
        </ul>
    </div>

Obs: precisa ser uma classe, em vez de id, devido ao id ser um identificador único. Como haverá casos em que as ações serão mais de uma listada, precisamos que tais contagem sejam efetuadas em todas as ações.

No caso, a classe ela tem essa natureza uniforme, diferente de id, que é um identificador único que tem como natureza algo muito local e único.

    <script>
        $(document).ready( function(){
            $('#btn_sair').click(function(){
                window.location.href = '/sair';
            });

            $('#btn_suditos').click(function(){
                // alert('BTN suditos clicado');
                $('#msg').hide();
                $.ajax({
                    url: '/suditos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                    }
                });
            });

            $('#btn_pergaminho').click(function(){
                // alert('BTN pergaminho clicado');
                $('#msg').hide();
                $.ajax({
                    url: '/pergaminhos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);

                        cronometro();
                    }
                })
            });
        });

        function cronometro(){
            $('.tempo_restante').each(function(){
                var segundos = $(this).html();
                alert(segundos);
            })
        }
    </script>

Agora, podemos verificar se está funcionando.

Agora, falta decrementar o valor, visto que estamos buscando os dados corretos.

    <script>
        $(document).ready( function(){
            $('#btn_sair').click(function(){
                window.location.href = '/sair';
            });

            $('#btn_suditos').click(function(){
                // alert('BTN suditos clicado');
                $('#msg').hide();
                $.ajax({
                    url: '/suditos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                    }
                });
            });

            $('#btn_pergaminho').click(function(){
                // alert('BTN pergaminho clicado');
                $('#msg').hide();
                $.ajax({
                    url: '/pergaminhos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);

                        cronometro();
                    }
                })
            });
        });

        function cronometro(){
            $('.tempo_restante').each(function(){
                var segundos = $(this).html();
                var segundos_atuais = parseInt(segundos) - 1;

                $(this).html(segundos_atuais);
                // alert(segundos);
            })

            setTimeout('cronometro()', 1000);
        }
    </script>

Note que, conseguimos configurar um ciclo de iteração de funções.
Tal configuração, acima possibilitará a exibição da mesma a diminuição de tempo à cada segundo.

Porém, ainda temos um problema a ser resolvido nisso.

Note que, no formato atual, ao clicarmos em pergaminhos ela será exibido o tempo restante e que o mesmo está diminuindo a cada segundo em que é definido no setTimeout.

Porém, o problema é que conseguimos acelerar a redução de tempo clicando no botão pergaminho várias vezes.

Isso é um problema, pois a contagem ficará mais rápido do que a cada 1 segundos definidos, a priori.

Para resolvermos esse problema, precisamos realizar o seguinte.

    <script>
        $(document).ready( function(){
            $('#btn_sair').click(function(){
                window.location.href = '/sair';
            });

            $('#btn_suditos').click(function(){
                // alert('BTN suditos clicado');
                $('#msg').hide();
                $.ajax({
                    url: '/suditos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                    }
                });
            });

            $('#btn_pergaminho').click(function(){
                // alert('BTN pergaminho clicado');
                $('#msg').hide();
                $.ajax({
                    url: '/pergaminhos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                        
                        clearTimeout(timerId);
                        cronometro();
                    }
                })
            });
        });

        var timerId = null ; 

        function cronometro(){
            $('.tempo_restante').each(function(){
                var segundos = $(this).html();
                var segundos_atuais = parseInt(segundos) - 1;

                $(this).html(segundos_atuais);
                // alert(segundos);
            })

            timerId = setTimeout('cronometro()', 1000);
        }
    </script>   

No caso, definimos a variável timertId e combinamos com o clearTimeout.

Isso resolverá o problema, pois a lógica por trás disso seria que sempre que reacessarmos novamente, clicando no botão pergaminhos, sempre o timerId ela será resetado em null, e isso evitará de que o tempo sejá descontado conforme a velocidade do seu click, pois a cada click ela iniciará do último número em que foi descontado os 1 segundos.

Falta agora tratar o caso em que o tempo ficar no 0.

## Aula 10 - Tratando o instante 0 do cronometro:
Vamos, agora, tratar o caso em que a contagem chega em 0.

Para isso, bastaríamos colocar mais uma condicional no script de jogo.ejs que configuramos a função cronometro.

    <script>
        $(document).ready( function(){
            $('#btn_sair').click(function(){
                window.location.href = '/sair';
            });

            $('#btn_suditos').click(function(){
                // alert('BTN suditos clicado');
                $('#msg').hide();
                $.ajax({
                    url: '/suditos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                    }
                });
            });

            $('#btn_pergaminho').click(function(){
                // alert('BTN pergaminho clicado');
                $('#msg').hide();
                $.ajax({
                    url: '/pergaminhos',
                    method: "get",
                    success: function(data){
                        $('#acoes').html(data);
                        
                        clearTimeout(timerId);
                        cronometro();
                    }
                })
            });
        });

        var timerId = null ; 

        function cronometro(){
            $('.tempo_restante').each(function(){
                var segundos = $(this).html();
                var segundos_atuais = parseInt(segundos) - 1;

                if(segundos_atuais < 0) {
                    window.location.href = "/jogo?msg=C";
                } else {
                    $(this).html(segundos_atuais);
                }
                // alert(segundos);
            })

            timerId = setTimeout('cronometro()', 1000);
        }
    </script>

    <% if(msg == 'C') {%>
        <div class="alert alert-info" id="msg">
            <strong>Senhor, a atividade ordenada foi finalizada!</strong>
        </div>
    <%} %>

No caso, quando a contagem chegar no zero, será exibida a msg anterior.
Agora, podemos testar o mesmo mudando manualmente o valor do tempo que está sendo exibido dentro da classe tempo_restante.

## Aula 11 - Atualizando moedas:
Vamos, agora atualizar as moedas cada vez que conseguimos finalizar as ações de forma bem sucedida.

No caso, como na função ordenar_acao_sudito definido em jogo.js de controllers, nela chama-se a função acao que está definido em jogoDAO.js, então vamos definir dentro dessa função, acao, uma outra atualização para a moeda.

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            // console.log(result[0]);
            // res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
            res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
        });
    }

    JogoDAO.prototype.acao = function(acao) {
        // console.log(acao);
        var date = new Date();

        var tempo = null;

        switch(parseInt(acao.acao)) {
            case 1: tempo = 1*60*60000; break;
            case 2: tempo = 2*60*60000; break;
            case 3: tempo = 5*60*60000; break;
            case 4: tempo = 5*60*60000; break;
        }

        acao.acao_terminal_em = date.getTime() + tempo;
        this._connection.collection('acao').insertOne(acao);

        var moedas = null;

        switch(parseInt(acao.acao)) {
            case 1: moedas = -2 * parseInt(acao.quantidade); break;
            case 2: moedas = -3 * parseInt(acao.quantidade); break;
            case 3: moedas = -1 * parseInt(acao.quantidade); break;
            case 4: moedas = -1 * parseInt(acao.quantidade); break;
        }

        this._connection.collection('jogo').updateMany({ usuario: acao.usuario }, { $inc: {moeda: moedas} });
    }

    JogoDAO.prototype.getAcoes = function(usuario, res) {
        // console.log('recuperar acoes');
        var date = new Date();
        var momento_atual = date.getTime();
        this._connection.collection('acao').find({usuario: usuario, acao_terminal_em: {$gt:momento_atual}}).toArray(function(err, result) {
            // console.log(result);
            res.render('pergaminhos', {acoes: result})
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

No caso, sempre que a contagem terminar ocorrerá uma remoção na quantidade da moeda.

## Aula 12 - Removendo ações:
Vamos aprender a remover documentos dentro do banco de dados, MongoDB.
Nada mais justo, depois que acontecer a ação, ser removido do banco de dados.

No caso, vamos primeiro criar uma rota de revogar uma ação pelo jogo.js de routes.

    module.exports = function(application){
        application.get('/jogo', function(req, res){
            // res.send('Bem vindo a sua app NodeJS!');
            // res.render('jogo');
            application.app.controllers.jogo.jogo(application, req, res);
        });

        application.get('/sair', function(req, res){
            application.app.controllers.jogo.sair(application, req, res);
        });

        application.get('/suditos', function(req, res){
            application.app.controllers.jogo.suditos(application, req, res);
        });

        application.get('/pergaminhos', function(req, res){
            application.app.controllers.jogo.pergaminhos(application, req, res);
        });

        application.post('/ordenar_acao_sudito', function(req, res){
            application.app.controllers.jogo.ordenar_acao_sudito(application, req, res);
        });

        application.get('/revogar_acao', function(req, res){
            application.app.controllers.jogo.revogar_acao(application, req, res);
        });
    }

Em seguida, vamos em jogo.js de controllers, e nela iremos definir a função revogar_acao e definir o que será exercido dentro dela.]

    module.exports.jogo = function(application, req, res) {
        // if(req.session.autorizado) {
        //     res.render('jogo', {img_casa: req.session.casa});
        // } else {
        //     res.send('Usuário precisa fazer o login!');
        // }
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        // var comando_invalido = 'N';

        // if(req.query.comando_invalido == 'S') {
        //     comando_invalido = 'S';
        // }

        var msg = '';

        if(req.query.msg != ''){
            msg = req.query.msg;
        }

        // console.log(comando_invalido);

        var usuario = req.session.usuario;
        var casa = req.session.casa;

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        // JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
        JogoDAO.iniciaJogo(res, usuario, casa, msg);
        // res.render('jogo', {img_casa: req.session.casa});
    }

    module.exports.sair = function(application, req, res) {
        // res.send('sair');
        req.session.destroy( function(err){
            res.render("index", {validacao: {}});
        });
    }

    module.exports.suditos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        res.render("aldeoes");
    }

    module.exports.pergaminhos = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }

        // recuperar as ações inseridas no banco de dados.
        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        var usuario = req.session.usuario;

        JogoDAO.getAcoes(usuario, res);

        // res.render("pergaminhos", {acoes: {}});
    }

    module.exports.ordenar_acao_sudito = function(application, req, res) {
        if(req.session.autorizado !== true) {
            res.send('Usuário precisa fazer o login!');
            return;
        }
        var dadosForm = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        // if(erros){
        //     res.redirect('jogo?comando_invalido=S');
        //     return;
        // }

        if(erros){
            res.redirect('jogo?msg=A');
            return;
        }

        // console.log(dadosForm);
        // res.send('tudo ok!');

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        dadosForm.usuario = req.session.usuario;
        JogoDAO.acao(dadosForm);

        // res.send('tudo ok!');
        res.redirect('jogo?msg=B');
    }

    module.exports.revogar_acao = function(application, req, res) {
        var url_query = req.query;
        // res.send(url_query);

        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.jogoDAO(connection);

        var id = url_query.id_acao;
        JogoDAO.revogarAcao(id, res);
    }

Agora, em pergaminhos.ejs, onde consta "revogar ordem", nela podemos passar a rota "revogar_acao" e nela passar um parâmetro da seguinte forma.

    <div id="pergaminhos">					
        <h3>Pergaminhos</h3>
        
        <ul>
            <% for(var i = 0; i < acoes.length; i++) { %>
                <%
                    var txt_acao = '';

                    switch(parseInt(acoes[i].acao)){
                        case 1: txt_acao = 'Aldeão(ões) coletando recursos'; break;
                        case 2: txt_acao = 'Enforcar Aldeões'; break;
                        case 3: txt_acao = 'aldeão(ões) em treinamento de história'; break;
                        case 4: txt_acao = 'aldeão(ões) em treinamento de magia'; break;
                    }

                    var date = new Date();
                    var momento_atual = date.getTime();

                    var segundos_restantes = Math.round((acoes[i].acao_terminal_em - momento_atual) / 1000);
                %>
                <li>
                    <%=acoes[i].quantidade%> <%=txt_acao%>
                    - <small>restam <span class="tempo_restante"><%=segundos_restantes%></span> segundos 
                    - <a href="/revogar_acao?id_acao=<%=acoes[i]._id%>">revogar ordem</a></small>
                </li>
            <% } %>
        </ul>
    </div>

Com o formato atual, vamos poder testar se está sendo enviado o id corretamente.

Visto que está, então vamos agora usar o jogoDAO.js, para nela definir uma função que remova a tal ação.

    JogoDAO.prototype.revogarAcao = function(_id, res) {
        res.send(_id);
    }

No caso, acima mostra que recebemos as instruções.

No caso, agora, vamos remover.

    var ObjectID = require('mongodb').ObjectId;

    function JogoDAO(connection) {
        this._connection = connection();
    }

    JogoDAO.prototype.gerarParametros = function(usuario) {
        this._connection.collection('jogo').insertOne({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        });
    }

    JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
        // console.log('Iniciar os parâmetros do jogo');

        this._connection.collection('jogo').find({usuario: usuario}).toArray(function(err, result){
            // console.log(result[0]);
            // res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
            res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
        });
    }

    JogoDAO.prototype.acao = function(acao) {
        // console.log(acao);
        var date = new Date();

        var tempo = null;

        switch(parseInt(acao.acao)) {
            case 1: tempo = 1*60*60000; break;
            case 2: tempo = 2*60*60000; break;
            case 3: tempo = 5*60*60000; break;
            case 4: tempo = 5*60*60000; break;
        }

        acao.acao_terminal_em = date.getTime() + tempo;
        this._connection.collection('acao').insertOne(acao);

        var moedas = null;

        switch(parseInt(acao.acao)) {
            case 1: moedas = -2 * parseInt(acao.quantidade); break;
            case 2: moedas = -3 * parseInt(acao.quantidade); break;
            case 3: moedas = -1 * parseInt(acao.quantidade); break;
            case 4: moedas = -1 * parseInt(acao.quantidade); break;
        }

        this._connection.collection('jogo').updateMany({ usuario: acao.usuario }, { $inc: {moeda: moedas} });
    }

    JogoDAO.prototype.getAcoes = function(usuario, res) {
        // console.log('recuperar acoes');
        var date = new Date();
        var momento_atual = date.getTime();
        this._connection.collection('acao').find({usuario: usuario, acao_terminal_em: {$gt:momento_atual}}).toArray(function(err, result) {
            // console.log(result);
            res.render('pergaminhos', {acoes: result})
        });
    }

    JogoDAO.prototype.revogarAcao = function(_id, res) {
        // res.send(_id);
        this._connection.collection('acao').deleteOne({_id: ObjectID(_id)}, function(err, result){
            res.redirect("jogo?msg=D");
        });
    }

    module.exports = function(){
        return JogoDAO;
    }

Além disso, precisamos informar isso no jogo.ejs a remoção da ação.

    <% if(msg == 'D') {%>
        <div class="alert alert-info" id="msg">
            <strong>Senhor, sua ordem foi revogda!</strong>
        </div>
    <%} %>

## Aula 13 - Considerações finais:

## Aula 14 - Opcional - Download dos arquivos MMORPG GOT:
Opcional - Download dos arquivos MMORPG GOT

Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos do projeto MMORPG GOT no estado em que se encontram na aula anterior.

Bons estudos ;)

## Aula 15 - Opcional - Atividades práticas:
Opcional - Atividades práticas

Que tal praticar?

Baixe a relação de atividades em anexo e pratique seus conhecimentos!

Boa sorte.

OBS: Formas de fechar a conexão com o banco de dados, MongoDB: 
    
    https://www.mongodb.com/community/forums/t/mongoclient-nodejs-open-close-connection-events/15042
