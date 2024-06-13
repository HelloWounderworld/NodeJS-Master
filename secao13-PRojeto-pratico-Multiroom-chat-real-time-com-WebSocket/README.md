# Seção 13 - Projeto prático - Multiroom Chat real-time com WebSocket:
## Aula 1 - Preparando dependências e diretórios do app:
Vamos preparar um novo projeto chamado Multiroom Chat Real-time.

Vamos criar um ditetório novo chamado multiroom_chat.

As notas de aulas serão transferidas para esse novo diretório.

Vamos precisar instalar os mesmos módulos que usamos no projeto curso_node pelo npm.

Vamos seguir os passos a passos burocráticos abaixo:

    1-) Criamos um diretório com o nome do projeto.

    2-) Vamos rodar o comando "npm init", no caso, isso permitirá criar o package.json.

    3-) Instalar o express, "npm install express@4.15.3 --save", com o "--save" incluso isso criará o package-lock.json e o node_modules.

Obs: Caso vc rodar apenas "npm install express --save", será instalado a última versão do express validator e isso pode ser que mude a regra de como deve ser importado.

    4-) Instalar o ejs, "npm install ejs@2.5.6 --save".
    
Obs: Caso vc rodar apenas "npm install ejs --save", será instalado a última versão do express validator e isso pode ser que mude a regra de como deve ser importado.

    5-) Instalar o consign, "npm install consign@0.1.6 --save".

Obs: Caso vc rodar apenas "npm install consign --save", será instalado a última versão do express validator e isso pode ser que mude a regra de como deve ser importado.

    6-) Vamos instalar o body-parser, que é o nosso middleware, "npm install body-parser@1.17.2 --save".
    
Obs: Caso vc rodar apenas "npm install body-parser --save", será instalado a última versão do express validator e isso pode ser que mude a regra de como deve ser importado.

    7-) Instalar o express-validator, que é o módulo que valida, "npm install --save express-validator@3.2.0 -E".
    
Obs: Caso vc rodar apenas "npm install express-validator --save", será instalado a última versão do express validator e isso pode ser que mude a regra de como deve ser importado.

Assim, temos todos os módulos que precisamos.

Agora, vamos criar as estruturas que vamos precisar nesse projeto.

    1-) Vamos criar o diretório config e dentro dela o arquivo server.js.

    2-) Criamos o arquivo app.js no diretório raiz, que servirá de entry point.

    3-) Criamos o diretório app, no diretório raiz, e dentro dela criamos os subdiretórios controllers, models, public, routes e views.

    4-) Dentro do diretório public, vamos criar os diretórios css, images e js.

Com isso, no nosso novo projeto, instalamos os módulos que precisamos e criamos as estruturas que serão necessárias para ela.

Ou seja, o ambiente para começarmos a desenvolver está pronto!

## Aula 2 - Configurando o servidor:
Vamos configurar, agora, o nosso servidor.

Vamos seguir os seguintes passos:

1-) No app.js vamos importar as configurações do servidor.

        // Importar as configurações do servidor
        // Lembrando que na importaçào do módulo, podemos ocultar a extensão. Ou seja, não precisa colocar .js.
        var app = require('./config/server');

        // Vamos parametrizar a porta de escuta
        app.listen(80, function() {
            console.log('Servidor Online');
        })

2-) No arquivo server.js, vamos configurar algumas importações.
    
    // Importar o módulo do framework express
    var express = require('express');

    // Importar o módulo do consign
    var consign = require('consign');

    // Importar o módulo do body-parser
    var bodyParser = require('body-parser');

    // Importar o módulo de express-validator

    var expressValidator = require('express-validator');

    // Iniciar o objeto express
    var app = express();

    // Setar as variáveis 'view engine'e 'views' do express
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    // Configurar o middleware express.static
    app.use(express.static('./app/public'));

    // Configurar o middleware body-parser
    app.use(bodyParser.urlencoded({extended: true}));

    // Configurar o middleware express-validator
    app.use(expressValidator());

    // Efetuando o autoload das rotas, models e dos controllers para o objeto app
    consign()
        .include('app/routes')
        .then('app/models')
        .then('app/controllers')
        .into(app)

    // Exportando o objeto app
    module.exports = app;

3-) Feitas as etapas acima, vamos subir o servidor para verificar se tudo está funcionando como esperamos.

Bastaria rodar o comando dentro do diretório pelo terminal "nodemon app". Daí, em uma nova aba de navegação podemos colocar apenas o localhost, sem especificar a porta 80, pois o próprio broswer possui uma parametrização que indica a porta 80.

Se aparecer algo do gênero Cannot GET/, significa que deu certo.

Obs: Haverá casos em que vc não irá conseguir rodar isso. Ou seja, quando vc colocar o comando nodemon app aparecerá o seguinte erro, ou algo parecido, abaixo:

        [nodemon] 2.0.20
        [nodemon] to restart at any time, enter `rs`
        [nodemon] watching path(s): *.*
        [nodemon] watching extensions: js,mjs,json
        [nodemon] starting `node app`
        internal/modules/cjs/loader.js:905
        throw err;
        ^

        Error: Cannot find module '/config/server.js'
        Require stack:
        - /home/leonardo/Documentos/estudos/multiroom_chat/app.js
            at Function.Module._resolveFilename (internal/modules/cjs/loader.js:902:15)
            at Function.Module._load (internal/modules/cjs/loader.js:746:27)
            at Module.require (internal/modules/cjs/loader.js:974:19)
            at require (internal/modules/cjs/helpers.js:93:18)
            at Object.<anonymous> (/home/leonardo/Documentos/estudos/multiroom_chat/app.js:3:11)
            at Module._compile (internal/modules/cjs/loader.js:1085:14)
            at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
            at Module.load (internal/modules/cjs/loader.js:950:32)
            at Function.Module._load (internal/modules/cjs/loader.js:790:12)
            at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12) {
        code: 'MODULE_NOT_FOUND',
        requireStack: [ '/home/leonardo/Documentos/estudos/multiroom_chat/app.js' ]
        }

No caso, uma das possibilidades para corrigir esse erro seria que vc não está como um usuŕio privilegiado para acessar a porta 80.
    
    https://stackoverflow.com/questions/60372618/nodejs-listen-eacces-permission-denied-0-0-0-080

Logo, uma das alternativas que serviria para corrigir esse tipo de erro seria vc usar o comando "sudo -s" e acessando o diretório projeto estando como root vc instala o nodemon
    
    npm install -g nodemon --save


4-) Por vias das dúvidas, podemos ir no diretório routes e dentro dela vamos criar um arquivo index.js e dentro dela vamos exportar um módulo.

    module.exports = function(application) {
        application.get('/', function(req, res) {
            res.send('Teste');
        })
    }

Assim, no localhost, deverá aparecer a msg "Teste".

## Aula 3 - Download de arquivos estáticos (assets) e HTML:
Download de arquivos estáticos (assets) e HTML

Utilize o link disponibilizado como recurso dessa aula para fazer o download dos HTMLs e assets do projeto Multiroom Chat.

Bons estudos ;)

## Aula 4 - Ajustando routes e views:
Pegamos o projeto com frontEnd pronto, multiroom_chat_arquivos_do_projeto, que podemos pegar da aula anterior e implementamos-as dentro do nosso projeto.

No caso, dentro do diretório public no diretório css, images e js, dentro delas, colocamos os arquivos presentes que estão nos respectivos diretórios com o mesmos nomes que vc encontra no multiroom_chat_arquivos_do_projeto.
Agora, os dois arquivos htmls, index.html e chat.html, ambos irão para o diretório views do nosso projeto, multiroom_chat.

Enviado todos os arquivos que precisávamos para darmos continuidade no nosso projeto, agora vamos pegar o arquivo index.js que está dentro do diretório routes e iremos substituir o .send para .render e dentro dela colocar o index.html para rodarmos.

    module.exports = function(application) {
        application.get('/', function(req, res) {
            // res.send('Teste');
            res.render('index');
        })
    }

No caso, como estamos usando a extensão ejs, então os dois arquivos htmls que enviamos ao nosso projeto, index.html e chat.html, que estão dentro do diretório views, precisamos mudar a extensão delas para ejs.

Feito isso, no broswer, bastaria rodar localhost, sem especificar a porta 80, que nela irá renderizar o arquivo index.ejs que chamamos.

Note que, da msg "Teste" mudou para uma tela de entrada para sala de chat.

Vamos, agora, fazer o processo análogo para o chat tbm. No caso, dentro do diretório routes, vamos criar o arquivo chat.js e dentro dele criar uma requisição get e post, pois, esta última, o que está sendo exibido na tela index.ejs será feito uma submissão para podermos entrar na tela de chat e realizar as conversas.

    module.exports = function(application) {
        application.post('/chat', function(req, res) {
            // res.send('Teste');
            res.render('chat');
        })

        application.get('/chat', function(req, res) {
            // res.send('Teste');
            res.render('chat');
        })
    }

No caso, mesmo feito acima no arquivo chat.js, como tela index.ejs não foi configurado para realizar a submissão, então mesmo colocando o nosso nome e cliando em entrar não acontecerá nada. No rota, irá aparecer http://localhost/?.


## Aula 5 - Ajustando routes e controllers:
Nessa aula, daremos continuidade para refatoração. Na última aula fizemos isso em routes e views.

Já agora, continuaremos a dar atenção ao routes e, desta vez de novo, iremos dar atenção ao controllers.

No diretório controllers, vamos criar dois arquivos, index.js e chat.js.

No index.js, do diretório controllers, vamos exportar um módulo.

    module.exports.index = function(application, req, res) {
        res.render("index");
    }

No caso, feito isso, vamos precisar alterar o index.js de routes, pois o controllers, como foi estudado antes, serve para conseguir controlar os tipos de arquivos que serão exportados e que receberão as requisições pelo routes.

Basicamente, enquanto que no controllers vc define a função o routes ele executa ela.

    module.exports = function(application) {
        application.get('/', function(req, res) {
            // res.send('Teste');
            // res.render('index');
            application.app.controllers.index.index(application, req, res)
        })
    }

Se atualizarmos a página, vamos ver que tudo continua funcionando corretamente.

Realizamos o mesmo processo para o controllers do chat.js.

No caso, no chat.js do controllers:

    module.exports.iniciaChat = function(application, req, res) {
        res.render('chat');
    }

Já no chat.js de routes, colocamos:

    module.exports = function(application) {
        application.post('/chat', function(req, res) {
            // res.send('Teste');
            // res.render('chat');
            application.app.controllers.chat.iniciaChat(application, req, res);
        })

        application.get('/chat', function(req, res) {
            // res.send('Teste');
            // res.render('chat');
            application.app.controllers.chat.iniciaChat(application, req, res);
        })
    }

Feito isso, ao visitarmos a tela chat, localhost/chat, vamos ver que tudo continua funcionando normalmente.

## Aula 6 - Recebendo e validando os dados do formulário de entrada:
Vamos aprender a aplicar as lógicas dentro do controllers.

Primeira coisa que vamos fazeré configurar o nosso formulário. No caso, no arquivo index.ejs do views, vamos colocar o seguinte:

    <form accept-charset="UTF-8" role="form" class="form-signin" action="/chat" method="post">
        <fieldset>
            <label class="panel-login">
                <div class="login_result"></div>
            </label>
            <input class="form-control" placeholder="Nome ou apelido" id="apelido" type="text">
            <br></br>
            <input class="btn btn-lg btn-success btn-block" type="submit" id="entrar" value="Entrar »">
        </fieldset>
    </form>

No caso, com essa mudança acima, independentemente se eu coloquei ou não algum nome, ao clicarmos no Entrar seremos direcionado diretamente na tela de chat.

No caso, não é o que queremos. Precisamos colocar algumas restrições para isso. Então iremos usar o express-validator, o middleware.

Para isso, vamos pegar o arquivo chat.js do controllers e nela realizar tais implementações.

    module.exports.iniciaChat = function(application, req, res) {
        var dadosForm = req.body;

        console.log(dadosForm);
        res.render('chat');
    }

A implementação acima mostrará o que irá ser entregue em json quando clicarmos no Entrar. No estado atual em que estamos o formulário do index.ejs, ao clicarmos no Entrar, sem que coloquemos nenhum nome, pelo console será mostrado um objeto json vazio.

Ou seja, rodando o nodemon, será mostrado "{}".

Para evitarmos isso, no index.ejs, vamos precisar configurar algumas coisa na tag input que está dentro da tag form.

    <input class="form-control" placeholder="Nome ou apelido" id="apelido" name="apelido" type="text">

Colocado name="apelido" na tag acima, vamos conseguir ver que ao colocarmos o próprio nome no formulário isso será expresso pelo console um objeto com elemento apelido dentro.

Agora que conseguimos colocar as variáveis que servirão para condicionar a loǵica, vamos realizar a tal implementação lógica.

No caso, no chat.js vamos colocar o seguinte:

    module.exports.iniciaChat = function(application, req, res) {
        var dadosForm = req.body;

        // console.log(dadosForm);
        req.assert('apelido', 'Nome ou apelido é obrigatório!').notEmpty();
        req.assert('apelido', 'Nome ou apelido deve conter entre 3 à 15 caracteres!').len(3,15);

        var erros = req.validationErrors();

        if(erros) {
            res.send('Existem erros no formulário!');
            return;
        }

        res.render('chat');
    }

No formato acima, quando colocado algum erro no formulário, será exibido a msg "Existem erros no formulário!", apenas. Precisamos, no caso, enviar tais msgs que erros da própria tela do formulário explicitamente para o usuário.

No caso, no chat.js do controllers, vamos aplicar:

    module.exports.iniciaChat = function(application, req, res) {
        var dadosForm = req.body;

        // console.log(dadosForm);
        req.assert('apelido', 'Nome ou apelido é obrigatório!').notEmpty();
        req.assert('apelido', 'Nome ou apelido deve conter entre 3 à 15 caracteres!').len(3,15);

        var erros = req.validationErrors();

        if(erros) {
            res.render('index', {validacao: erros});
            // res.send('Existem erros no formulário!');
            return;
        }

        res.render('chat');
    }

Em seguida, no index.ejs, vamos criar uma nova div em que será expressado essas msgs de erros.

    <div>
        <% if(validacao.length > 0) {%>
            <div class="row">
                <div class="col-md-12">
                    <div class="alert">
                        <strong>Atenção!</strong>
                        <ul>
                            <% for(var i = 0; i < validacao.length; i++) {%>
                                <li><%=validacao[i].msg%></li>
                            <% } %>
                        </ul>
                    </div>
                </div>
            </div>
        <% }%>
    </div>

A implementação acima, não será o suficiente, pois como estamos usando uma variável dentro do index.ejs, precisamos, primeiramente, definir essa variável dentro do index.js do controllers.

    module.exports.index = function(application, req, res) {
        res.render("index", {validacao: {}});
    }

## Aula 7 - Introdução a Websocket e Socket.IO:
Vamos aprender, inicialmente, o conceito de Socket, Websocket e Socket.io.

    https://socket.io/docs/v4/

    https://cursos.alura.com.br/forum/topico-diferenca-entre-socket-e-websocket-70527

    https://pt.stackoverflow.com/questions/46839/o-que-s%C3%A3o-sockets-de-rede-e-websockets

    https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets

## Aula 8 - NPM - Instalando o Socket.IO:
Vamos precisar instalar o Socket.io via npm.

No caso, vamos precisar rodar o comando

    npm install socket.io@2.0.3 --save

Obs: se rodarmos apenas

    npm install socket.io --save

irá baixar a última versão.

## Aula 9 - Refactoring do Multiroom Chat - Integrando o Socket.IO ao servidor NodeJS:
Feito a instalação do socket.io, vamos realizar uma refatoração nessa aula integrando o socket.i o instalado.

No caso, no arquivo app.js que está na raiz, precisamos realizar a seguinte implementação:

    // Importar as configurações do servidor
    // Lembrando que na importaçào do módulo, podemos ocultar a extensão. Ou seja, não precisa colocar .js.
    var app = require('./config/server.js');

    // Vamos parametrizar a porta de escuta
    var server = app.listen(80, function() {
        console.log('Servidor Online');
    })

    require('socket.io').listen(server);

No caso, a implementação acima, meio qua, cria um gancho com a requisição HTTP, da porta 80, com o HTTP do socket.io.

No caso, agora o nosso servidor responde à dois protocolos diferentes na mesma porta 80.

## Aula 10 - Abrindo a conexão via websocket:

Vamos configurar o websocket do lado do cliente.

No caso, no chat.ejs, vamos configurar o seguinte:

    <script src="/socket.io/socket.io.js"></script>

O script implementado acima configura tudo o que precisa para o cliente escutar e emitir msgs.

Ao entrarmos no chat com algum apelido ou nome e abrirmos o console e irmos ao Sources, nela será mostrado que tem o diretório socket.io e dentro dela o arquivo socket.io.js com o código tudo configurado.

Isso significa que os recursos do socket.io foi implementado tanto pelo broswer em que estamos usando quando no nosso servidor.

Isso significa que, agora, podemos começar a trocar msgs para estabelecer um protocolo de comunicação.

Novamente, no chat.ejs, abaixo do script que criamos vamos criar um outro script, visto que é js que estamos usando e nela iremos implementar as funções necessárias.

    <script>
        var socket = io('http://localhost');
    </script>

Como, antes, temos o script do socket.io, podemos usar um recurso do socket chamado "io", como foi feito acima, para estabelecermos a comunicação com o lado do cliente.

Agora, iremos realizar isso para o lado do servidor.

Para isso, iremos mexer no arquivo app.js e iremos colocar o seguinte dentro dela.

    // Importar as configurações do servidor
    // Lembrando que na importaçào do módulo, podemos ocultar a extensão. Ou seja, não precisa colocar .js.
    var app = require('./config/server.js');

    // Vamos parametrizar a porta de escuta
    var server = app.listen(80, function() {
        console.log('Servidor Online');
    })

    var io = require('socket.io').listen(server);

    // Criar conexão por websocket.

    io.on('connection', function(socket){
        console.log('Usuário conectou!');
    });

No caso, foi feito a mesma função "io" acima, como temos tbm no lado do cliente, precisou-se definir para o lado do servidor tbm.

Além disso, a função "on" que foi usada acima ela é o que estabelece a comunicação com o cliente. No caso, escuta o cliente e o servidor, vice e versa.

No caso, o console.log acima será um indicativo de que conseguimos realizar o disparo de io pelo lado do servidor e que será expresso pelo terminal.

Além do evento da conexão, existe tbm o evento da desconexão.

No caso, a partir do evento de escuta que criamos, o io.on(), dentro dela podemos definir outros eventos. Uma delas que iremos definir seria o disconnect.

    io.on('connection', function(socket){
        console.log('Usuário conectou!');

        socket.on('disconnect', function(){
            console.log('Usuário desconectou!');
        });
    });

Além do evento de desconexão que definimos acima, podemos definir outros eventos de escutas e emissões tbm.

Por hora, podemos ver o evento em que o usuário conecta e desconecta do chat controlando isso pela path. Clicando no Entrar e em seguida apagando /chat da path.

E como ele sabe disso? É muito simples, é porque a conexão estabelecida via socket, não existe mais!

## Aula 11 - Enviando mensagem de que usuário se conectou ao chat:
Vamos simular uma conversa. No caso, para isso, seria necessário abrirmos três navegadore que são independentes de cada um.

Para isso, podemos fazer o seguinte, abrir o navegador em que vc usa e os outros dois deixar como anônimo.

Antes de realizarmos a conversa, precisamos tirar a conversa estática que temos na tela de chat.ejs.

Para isso, pegamos o arquivo chat.ejs e faremos a seguinte modificação.

    <div class="col-md-10">
        <!-- <div class="dialogo">
            <h4>Jorge</h4>
            <p>Fala José, blz cara?</p>
        </div>
        
        <div class="dialogo">
            <h4>José</h4>
            <p>Opa, tudo certo!</p>
        </div>
        
        <div class="dialogo">
            <h4>Jorge</h4>
            <p>Vai estudar mais sobre NodeJS hoje?</p>
        </div>
        
        <div class="dialogo">
            <h4>José</h4>
            <p>Sim, com certeza. Vamos trabalhar com Websockets hoje, o assunto é bem interessante</p>
        </div>
        
        <div class="dialogo">
            <h4>Jorge</h4>
            <p>Show de bola, comunicação bi-direcional em páginas ou sistemas web é muito bacana mesmo</p>
        </div> -->
    </div>

Acima, vamos apagar as conversas estáticas.

Agora, a primeira coisa que iremos fazer, antes de estabelecer alguma conversa seria avisar que um outro usuário se conectou.

No caso, no formato atual isso não é possível mesmo que via console consigamos ver que quando vc se conecta via o navegador seu e simulamos a outra conexão com outro navegador anônimo, via terminal conseguimos ver que ambos se conectaram, mas isso não fica explícito.

Para isso, precisamos entender mais à fundo sobre o on e o emit.

    https://socket.io/pt-br/docs/v3/emitting-events/

    https://socket.io/docs/v4/listening-to-events/

No caso, no arquivo chat.js do controllers precisamos colocar esse evento emit.

    module.exports.iniciaChat = function(application, req, res) {
        var dadosForm = req.body;

        // console.log(dadosForm);
        req.assert('apelido', 'Nome ou apelido é obrigatório!').notEmpty();
        req.assert('apelido', 'Nome ou apelido deve conter entre 3 à 15 caracteres!').len(3,15);

        var erros = req.validationErrors();

        if(erros) {
            res.render('index', {validacao: erros});
            // res.send('Existem erros no formulário!');
            return;
        }

        emit('msgParaCliente');

        res.render('chat');
    }

Agora, no chat.ejs, do script que criamos a variável socket, precisamos escutar esse emit que criamos.

    <script>
        var socket = io('http://localhost');

        socket.on('msgParaCliente', function(){
            alert('Recebi uma requisição do servidor e estou tomando uma ação!');
        });
    </script>

Além disso, para o emit que foi criado no chat.js do controllers, precisamos deixar claro que esse evento está sendo feito via o io que foi definido no app.js.

Para isso, no app.js, vamos criar uma forma de estabelecer essa comunicação com o chat.js do controllers. Usaremo o set para isso.

Obs: muito cuidado ao usar o set, pois dentro dela não se pode definir uma variável pré definida.

    var io = require('socket.io').listen(server);

    app.set('io', io);

    // Criar conexão por websocket.

    io.on('connection', function(socket){
        console.log('Usuário conectou!');

        socket.on('disconnect', function(){
            console.log('Usuário desconectou!');
        });
    });

Daí, no chat.js, vamos finalmente definir direito o evento emit recebendo a variável io definida no app.js.

    application.get('io').emit(
        'msgParaCliente',
        'Teste'
    );

Note que, no evento que colocamos acima, podemos tbm definir uma msg que irá ser enviado. Assim, na função de callback que foi definido no socket.on do chat.ejs, lá podemos colocar a variável data.

    <script>
        var socket = io('http://localhost');

        socket.on('msgParaCliente', function(data){
            alert(data);
        });
    </script>

Com a forma acima, podemos realizar o teste.

Agora, vamos implementar, de fato, o aviso de que uma pessoa se conectou.

    application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: 'Aabou de entrar no chat.'}
    );

Além disso, no chat.ejs vamos concatenar a msg que foi feito acima.

    <div class="col-md-10" id="dialogos">
            
    </div>

E, usando a função append que temos no jquery, podemos colocar o seguinte:

    <script>
        var socket = io('http://localhost');

        socket.on('msgParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<div class="dialogo">';
                html += '<h4>' + data.apelido + '</h4>';
                html += '<p>' + data.mensagem + '</p>';
            html += '</div>';

            $('#dialogos').append(html);
        });
    </script>

Assim, o formato acima nos permite receber diretamente no chat o aviso da entrada do usuário.

### O que e JQuery
jQuery é uma biblioteca JavaScript rápida, pequena e rica em recursos, criada para simplificar a maneira como se escreve e se manipula o código JavaScript no navegador. Foi lançada por John Resig em 2006 e rapidamente se tornou uma das ferramentas mais populares entre os desenvolvedores web devido à sua facilidade de uso e poderosas funcionalidades.

#### Principais Características do jQuery:
1. Manipulação do DOM: jQuery oferece uma API simples e eficaz para selecionar e manipular elementos do Document Object Model (DOM) de uma página web. Isso inclui alterar textos, atributos, e estilos CSS, além de inserir e remover elementos.

2. Event Handling: Facilita a manipulação de eventos, como cliques, hover, e outros eventos de usuário, com uma sintaxe mais simples e clara comparada ao JavaScript puro (vanilla JavaScript).

3. Efeitos e Animações: jQuery vem com várias opções para adicionar efeitos visuais e animações aos elementos da página, como fades, slides, e personalizações mais complexas.

4. Ajax: Simplifica muito o uso de Ajax (Asynchronous JavaScript and XML), permitindo que os desenvolvedores façam requisições HTTP assíncronas de maneira mais fácil e com menos código. Isso é útil para carregar dados dinamicamente sem recarregar a página.

5. Compatibilidade Cross-Browser: Uma das grandes vantagens do jQuery é sua capacidade de abstrair as diferenças entre os navegadores, oferecendo uma API consistente que funciona de maneira uniforme nos mais diversos browsers.

#### Exemplo de Uso Básico do jQuery:
Para começar a usar jQuery, você pode incluir a biblioteca em sua página HTML através de uma tag <script> apontando para um CDN:

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

Aqui está um exemplo simples de como o jQuery pode ser usado para manipular o DOM e tratar eventos:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Exemplo jQuery</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script>
            $(document).ready(function() {
                // Esconde todos os parágrafos ao clicar no botão
                $("button").click(function() {
                    $("p").hide();
                });
            });
        </script>
    </head>
    <body>
        <button>Esconder Parágrafos</button>
        <p>Este é um parágrafo.</p>
        <p>Este é outro parágrafo.</p>
    </body>
    </html>

Neste exemplo, quando o botão é clicado, todos os elementos <p> são escondidos. Isso é feito usando o seletor $("p") para selecionar os parágrafos e o método .hide() para escondê-los.

#### Declínio e Alternativas:
Apesar de sua popularidade, o uso do jQuery tem diminuído nos últimos anos. Isso se deve, em parte, à evolução do JavaScript moderno (ES6+) e dos navegadores, que agora oferecem muitas das funcionalidades que antes eram facilitadas pelo jQuery. Além disso, frameworks modernos como React, Angular e Vue.js oferecem uma abordagem mais robusta e escalável para construir aplicações web interativas.

#### Conclusão:
jQuery foi uma ferramenta revolucionária que ajudou a moldar o desenvolvimento web moderno, simplificando muitas tarefas complexas e promovendo maior compatibilidade entre navegadores. Embora ainda seja útil para projetos mais simples ou para manutenção de sistemas legados, muitos desenvolvedores estão migrando para tecnologias mais recentes que se alinham melhor com as práticas atuais de desenvolvimento web.

## Aula 12 - Trocando mensagens entre usuários conectados no chat:
Nessa aula, vamos aprender a realizar uma troca de msg real.

No caso, vamos realizar modificações no chat.ejs. Assim, na tag nav, vamos realizar a seguinte modificação:

    <nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
        <div class="container">
            <div class="panel-body campo-mensagem">
                <div class="col-md-12">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Mensagem" id="mensagem">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" id="enviar_mensagem">></button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </nav>

Além disso, no mesmo arquivo chat.ejs da views, vamos realizar as seguintes modificações na tag script:

    <script>
        var socket = io('http://localhost');

        $('#enviar_mensagem').click(function(){
            socket.emit(
                'msgParaServidor',
                {apelido: '', mensagem: $('#mensagem').val()}
            );
        });

        socket.on('msgParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<div class="dialogo">';
                html += '<h4>' + data.apelido + '</h4>';
                html += '<p>' + data.mensagem + '</p>';
            html += '</div>';

            $('#dialogos').append(html);
        });
    </script>

Ou seja, utilizando o jquery.js, configuramos o evento de click nela, $('#enviar_mensage'), e dentro dela configuramos o evento emit.

Agora, falta configurarmos isso no app.js, que seria configurar o envento de escutar o click:

    io.on('connection', function(socket){
        console.log('Usuário conectou!');

        socket.on('disconnect', function(){
            console.log('Usuário desconectou!');
        });

        socket.on('msgParaServidor', function(data){
            socket.emit(
                'msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
            );
        });
    });

No caso, ao realizarmos o teste, conseguimos enviar a mensagem no chat. Porém, no formato como está acima, só conseguimos enviar a msg para o chat diretamente para si mesmo.

Ou seja, o outro usuáro online não consegue verificar a msg que vc publicou no chat.

Para possibilitar que o outro usuário consiga visualizar a msg precisaria realizar a seguinte modificação no app.js usando um recurso chamado broadcast.

    io.on('connection', function(socket){
        console.log('Usuário conectou!');

        socket.on('disconnect', function(){
            console.log('Usuário desconectou!');
        });

        socket.on('msgParaServidor', function(data){
            socket.emit(
                'msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
            );

            socket.broadcast.emit(
                'msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
            );
        });
    });

Com isso, a troca de msg será possível, mas, note que, por hora só conseguimos trocar as msgs sem saber quem é que está se comunicando.

No caso, só bastaria colocar o apelido. No caso, lembra que no chat.js do controllers, foi colocado um o dadosForm.apelido. Iremos chamar isso para o campo que configuramos no chat.ejs.

Primeira coisa que precisamos realizar, seria definir a variável dadosForm de forma que dê para utilizar isso no chat.ejs, para a definição vamos realizar no chat.js do controllers no res.render('chat'):

    module.exports.iniciaChat = function(application, req, res) {
        var dadosForm = req.body;

        // console.log(dadosForm);
        req.assert('apelido', 'Nome ou apelido é obrigatório!').notEmpty();
        req.assert('apelido', 'Nome ou apelido deve conter entre 3 à 15 caracteres!').len(3,15);

        var erros = req.validationErrors();

        if(erros) {
            res.render('index', {validacao: erros});
            // res.send('Existem erros no formulário!');
            return;
        }

        application.get('io').emit(
            'msgParaCliente',
            {apelido: dadosForm.apelido, mensagem: 'Acabou de entrar no chat.'}
        );

        res.render('chat', {dadosForm: dadosForm});
    }

No caso, no chat.ejs, na tag nav vamos configurar mais um input da seguinte forma:

    <nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
        <div class="container">
            <div class="panel-body campo-mensagem">
                <div class="col-md-12">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Mensagem" id="mensagem">
                        <input type="hidden" vallue="<%=dadosForm.apelido%>" id="apelido">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" id="enviar_mensagem">></button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </nav>

Em seguida, precisamos configurar isso no script que definimos no chat.ejs como o seguinte:

    <script>
        var socket = io('http://localhost');

        $('#enviar_mensagem').click(function(){
            socket.emit(
                'msgParaServidor',
                {apelido: $('#apelido').val(), mensagem: $('#mensagem').val()}
            );
        });

        socket.on('msgParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<div class="dialogo">';
                html += '<h4>' + data.apelido + '</h4>';
                html += '<p>' + data.mensagem + '</p>';
            html += '</div>';

            $('#dialogos').append(html);
        });
    </script>

Voltando na aplicação, agora conseguiremos trocar as msgs com os apelidos incluídos.

## Aula 13 - Atualizando a relação de participantes da conversa:
Agora, estamos praticamente fechando. Agora, só resta atualizr a relação dos participantes no chat.

Ao entrarmos na tela do chat temos, na barra de menu, a opção participantes, onde nela mostra os participantes.

Por hora ela estará estático. O objetivo agora é dinamizar isso mostrando quem está ou não participando no chat.

No caso, no chat.ejs no views, localizamos essa parte e apagamos:

    <div class="row participantes" id="participantes" style="display:none">
        <div class="col-md-1"></div>
        <div class="col-md-10" id="pessoas">
            
        </div>
        <div class="col-md-1"></div>
        
    </div>

Agora, no app.js, precisamos definir o evento emit que atualiza os participantes:

    io.on('connection', function(socket){
        console.log('Usuário conectou!');

        socket.on('disconnect', function(){
            console.log('Usuário desconectou!');
        });

        socket.on('msgParaServidor', function(data){
            // Dialogos
            socket.emit(
                'msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
            );

            socket.broadcast.emit(
                'msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
            );

            // Participantes
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );

            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );
        });
    });

Agora, usando, novamente, o jquery, vamos definir as funções no script do chat.ejs:

    <script>
        var socket = io('http://localhost');

        $('#enviar_mensagem').click(function(){
            socket.emit(
                'msgParaServidor',
                {apelido: $('#apelido').val(), mensagem: $('#mensagem').val()}
            );
        });

        socket.on('msgParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<div class="dialogo">';
                html += '<h4>' + data.apelido + '</h4>';
                html += '<p>' + data.mensagem + '</p>';
            html += '</div>';

            $('#dialogos').append(html);
        });

        socket.on('participantesParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<span class="participante">';
                html += data.apelido;
            html += '</span>';

            $('#pessoas').append(html);
        });
    </script>

Daí, agora conseguimos ver que os participantes estão atualizados.
Entretanto, com um problema. Sempre ocorrer trocas de mensagens, isso fará aparecer mais e mais participantes, os mesmos, no caso.

Isso deixará muito bagunçado, pois não saberemos quem está ou não participando exatamente.

O usual, no caso, seria usar um banco de dados que guarde tais condições para podermos controlar se a pessoa está ou não participando.  

Mas no escopo do que temos, podemos improvisar isso usando mais um input hidden no chat.ejs.

    <nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
        <div class="container">
            <div class="panel-body campo-mensagem">
                <div class="col-md-12">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Mensagem" id="mensagem">
                        <input type="hidden" value="<%=dadosForm.apelido%>" id="apelido">
                        <input type="hidden" value="0" id="apelido_atualizado_nos_clientes">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" id="enviar_mensagem">></button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </nav>

Em seguida, no script do chat.ejs, vamos chamar o uso disso:

    <script>
        var socket = io('http://localhost');

        $('#enviar_mensagem').click(function(){
            socket.emit(
                'msgParaServidor',
                {
                    apelido: $('#apelido').val(),
                    mensagem: $('#mensagem').val(),
                    apelido_atualizado_nos_clientes: $('#apelido_atualizado_nos_clientes').val()
                }
            );
        });

        socket.on('msgParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<div class="dialogo">';
                html += '<h4>' + data.apelido + '</h4>';
                html += '<p>' + data.mensagem + '</p>';
            html += '</div>';

            $('#dialogos').append(html);
        });

        socket.on('participantesParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<span class="participante">';
                html += data.apelido;
            html += '</span>';

            $('#pessoas').append(html);
        });
    </script>

E no lado do servidor, app.js da raiz, vamos precisar definir as condicionais para participantes, pois, agora, a variável data a função que definimos recebe o valor 0 que definimos no chat.ejs.

    io.on('connection', function(socket){
        console.log('Usuário conectou!');

        socket.on('disconnect', function(){
            console.log('Usuário desconectou!');
        });

        socket.on('msgParaServidor', function(data){
            // Dialogos
            socket.emit(
                'msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
            );

            socket.broadcast.emit(
                'msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
            );

            // Participantes
            if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
                socket.emit(
                    'participantesParaCliente',
                    {apelido: data.apelido}
                );
        
                socket.broadcast.emit(
                    'participantesParaCliente',
                    {apelido: data.apelido}
                );
            }
        });
    });

E, por fim, em chat.ejs, precisamos analisar se está sendo verificado esse valor 0 definido e alterar ela para 1.

    <script>
        var socket = io('http://localhost');

        $('#enviar_mensagem').click(function(){
            socket.emit(
                'msgParaServidor',
                {
                    apelido: $('#apelido').val(),
                    mensagem: $('#mensagem').val(),
                    apelido_atualizado_nos_clientes: $('#apelido_atualizado_nos_clientes').val()
                }
            );

            $('#apelido_atualizado_nos_clientes').val(1);
        });

        socket.on('msgParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<div class="dialogo">';
                html += '<h4>' + data.apelido + '</h4>';
                html += '<p>' + data.mensagem + '</p>';
            html += '</div>';

            $('#dialogos').append(html);
        });

        socket.on('participantesParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<span class="participante">';
                html += data.apelido;
            html += '</span>';

            $('#pessoas').append(html);
        });
    </script>

Basicamente, a lógica seria o seguinte, ao clicar em enviar a msg, pelo chat.ejs, esse evento dispara para o servidor, app.js da raiz, verificar se o participante está aparecendo pela primeira vez ou não pelo valor 0 e, em seguida, visto a entrada do participante, no chat.ejs, no mesmo evento em que ocorreu o click, ele modifica o valor 0 para 1 para indicar que esse participante está participando, evitando assim o problema de toda hora quando estiver enviando uma msg ficar aparecendo o mesmo participando toda hora ao ponto de correr o risco de confudir quem de fato está ou não participando na conversa.

Só falta, agora, por preciosismo, colocar a imagem do participante, deixar vazio a aba onde digita a msg sempre que ocorrer o envio e sempre o scroll estar mostrando a ultima msg enviada usando o window.scrollTo(0, document.body.scrollHeight).

    <script>
        var socket = io('http://localhost');

        $('#enviar_mensagem').click(function(){
            socket.emit(
                'msgParaServidor',
                {
                    apelido: $('#apelido').val(),
                    mensagem: $('#mensagem').val(),
                    apelido_atualizado_nos_clientes: $('#apelido_atualizado_nos_clientes').val()
                }
            );
            
            $('#mensagem').val('');
            $('#apelido_atualizado_nos_clientes').val(1);
        });

        socket.on('msgParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<div class="dialogo">';
                html += '<h4>' + data.apelido + '</h4>';
                html += '<p>' + data.mensagem + '</p>';
            html += '</div>';

            $('#dialogos').append(html);

            window.scrollTo(0, document.body.scrollHeight);
        });

        socket.on('participantesParaCliente', function(data){
            // alert(data);
            var html = ''
            html += '<span class="participante">';
                html+= '<img src="images/ico_usuario.png">';
                html += data.apelido;
            html += '</span>';

            $('#pessoas').append(html);
        });
    </script>

## Aula 14 - Download dos arquivos do projeto:
Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos do projeto Multiroom Chat completo.

Bons estudos ;)