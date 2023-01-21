# Seção 19 - Content Negotiation e Status Code:
## Aula 1 - O que é Content Negotiation:
Leituras para entender o que é Content Negotiation:

    https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Content_negotiation

    https://en.wikipedia.org/wiki/Content_negotiation
    
    https://learn.microsoft.com/pt-br/aspnet/web-api/overview/formats-and-model-binding/content-negotiation

    https://www.w3.org/Protocols/rfc2616/rfc2616-sec12.html

## Aula 2 - Download das aplicações Server/Client:
Download das aplicações Server/Client

Utilize o link disponibilizado como recurso dessa aula para fazer o download das aplicações Server/Client que serão utilizadas neste módulo.

Bons estudos ;)

## Aula 3 - Accept: Negociando o conteúdo de recebimento:
Vamos pegar o diretório que fizemos o download na aula anterior, apps_client_servidor.

Disso, vamos realizar uma nova implementação acima desse diretório.
No caso, ao descompactarmos esse arquivo zipado, será liberado uma pasta apps.

Focaremos agora nessa pasta para o novo projeto.

No caso, no diretório cliente que está vazio, vamos criar uma aplicação frontEnd para Android.

Mas, antes disso, vamos primeiro rodar o que consta dentro do diretóro servidor para verificar se está tudo ok.

Para isso, no app.js que está no servidor, como consta a porta padrão do localhost, nela iremos subir para verificar se está tudo correto na aplicação.

Assim, pelo terminal, acessando a pasta servidor, rodemos o nodemon.

Daí, acessando pelo navegador, localhost, aparecerá a msg de boas vindas.

Agora, no diretório cliente, vamos criar um arquivo android.js

    var http = require('http');

    http.get('http://localhost/', function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            console.log(' '+pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

Agora, vamos rodar esse arquivo android.js para verificarmos o que está acontecendo.

No caso, o http que demos o require acima ele consegue verificar os três momentos, quanto a página está carregando, termina de carregar e quano der algum erro.

Se tudo ocorrer bem, quando rodarmos o node e o nome do arquivo android.js acessado o diretorio cliente, irá aparecer a msg que consta no localhost (precisa que o servidor esteja rodando com o nodemon).

    root@leonardo-Dell-G15-5520:/home/leonardo/Documentos/estudos/apps/cliente# node android.js
        Bem vindo a sua app NodeJS!

Daí, se fizermos a seguinte alteração, vemos que aparecerá uma msg ilegível.

    var http = require('http');

    http.get('http://localhost', function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            console.log(pedaco);
        });

        // res.on('end', function(){
        //     // Possibilita em tomar alguma ação após a página terminar de carregar
        // });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

Ao rodarmos, novamente, node android.js, temos que.

    root@leonardo-Dell-G15-5520:/home/leonardo/Documentos/estudos/apps/cliente# node android.js
        <Buffer 42 65 6d 20 76 69 6e 64 6f 20 61 20 73 75 61 20 61 70 70 20 4e 6f 64 65 4a 53 21>

Podemos melhorar isso da seguinte forma.

    var http = require('http');

    var buffer_corpo_response = [];

    http.get('http://localhost', function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

Com isso, novamente, rodando node android.js a msg que é exibida em localhost será exibida.

Agora, vamos realizar a seguinte alteração em JSON.

    var http = require('http');

    var opcoes = {
        hostname: 'localhost',
        port: 80,
        path: '/'
    }

    var buffer_corpo_response = [];

    http.get(opcoes, function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

No caso, a forma acima é uma outra maneira de vc especificar qual porta e qual local está sendo utilizado para exibição.

Ao rodarmos novamente, node android.js, iremos ter o mesmo resultado.

    var http = require('http');

    var opcoes = {
        hostname: 'localhost',
        port: 80,
        path: '/',
        headers: {
            'Accept': 'text/html'
        }
    }

    var buffer_corpo_response = [];

    http.get(opcoes, function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

No caso, acrescentamos o headers acima, donde podemos verificar o que é devolvido pelo Headers ao visitarmos o console do navegador.

Nela, no Accept, está especificando o text/html.

Assim, rodando novamente node android.js, acima, teremos o mesmo retorno do texto de boas vindas.

Agora, no mesmo Accept, realizamos a seguinte alteração.

    var http = require('http');

    var opcoes = {
        hostname: 'localhost',
        port: 80,
        path: '/',
        headers: {
            'Accept': 'application/json'
        }
    }

    var buffer_corpo_response = [];

    http.get(opcoes, function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

Entretanto, não vai adiantar de nada realizar apenas essa alteração.

Vamos precisar tbm colocar mais algumas implementações no index.js de routes do servidor app, onde é dado o res.send com a msg de boas vindas.

    module.exports = function(application){
        application.get('/', function(req, res){

            res.format({
                html: function() {
                    res.send('Bem vindo a sua app NodeJS!');
                },

                json: function() {
                    var retorno = {
                        body: 'Bem vindo a sua app NodeJS!'
                    }

                    res.json(retorno);
                }
            });
            // res.send('Bem vindo a sua app NodeJS!');
        });
    }

Ao rodarmos novamente node android.js, será exibido uma msg como seguinte.

    root@leonardo-Dell-G15-5520:/home/leonardo/Documentos/estudos/apps/cliente# node android.js
        {"body":"Bem vindo a sua app NodeJS!"}
        
No caso, com a configuração como foi feito no index.js acima, no Accept, do android.js se ficarmos alterando entre 'text/html' e 'application/json', repsectivamente, será exibido a msg em forma de texto e uma em forma de json.

Esse formato de recepção diversa, pode valer para banco de dados, MongoDB, por exemplo, ou para aplicativos Android.

## Aula 4 - Content-type: Negociando o conteúdo de envio:
Vamos agora mudar o método que está sendo executado em android.js.

    var http = require('http');

    var opcoes = {
        hostname: 'localhost',
        port: 80,
        path: '/',
        headers: {
            'Accept': 'application/json'
        }
    }

    var buffer_corpo_response = [];

    // http.get(opcoes, function(res){
    //     res.on('data', function(pedaco){
    //         // serve para exibir as informações
    //         // console.log(' ' + pedaco);
    //         // console.log(pedaco);
    //         buffer_corpo_response.push(pedaco);
    //     });

    //     res.on('end', function(){
    //         // Possibilita em tomar alguma ação após a página terminar de carregar
    //         var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
    //         console.log(corpo_responde);
    //     });

    //     // res.on('error', function(){
    //     //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
    //     // });
    // });

    var req = http.request(opcoes, function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

    req.end();

Ao rodarmos novamente, node android.js, veremos que nada se alterou, continua funcionando tudo corramente.

Mas a diferença com o request e o get, é que a requisição via request, podemos versatilizar os tipos de requisições existents, get, post, etc...

Como exemplo disso, vamos realizar a seguinte implementação em android.js.

    var http = require('http');

    var opcoes = {
        hostname: 'localhost',
        port: 80,
        path: '/',
        method: 'post',
        headers: {
            'Accept': 'application/json'
        }
    }

    // Content-type
    var html = 'nome=Leonardo';

    var buffer_corpo_response = [];

    // http.get(opcoes, function(res){
    //     res.on('data', function(pedaco){
    //         // serve para exibir as informações
    //         // console.log(' ' + pedaco);
    //         // console.log(pedaco);
    //         buffer_corpo_response.push(pedaco);
    //     });

    //     res.on('end', function(){
    //         // Possibilita em tomar alguma ação após a página terminar de carregar
    //         var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
    //         console.log(corpo_responde);
    //     });

    //     // res.on('error', function(){
    //     //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
    //     // });
    // });

    var req = http.request(opcoes, function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

    req.write(html);
    req.end();

Como foi requisitado o método post acima, então precisamos colocar esse método tbm no index.js de routes de servidor.

    module.exports = function(application){
        application.get('/', function(req, res){

            res.format({
                html: function() {
                    res.send('Bem vindo a sua app NodeJS!');
                },

                json: function() {
                    var retorno = {
                        body: 'Bem vindo a sua app NodeJS!'
                    }

                    res.json(retorno);
                }
            });
            // res.send('Bem vindo a sua app NodeJS!');
        });

        application.post('/', function(req, res){
            res.send('teste');
        });
    }

No caso, ao rodarmos novamente o node android.js, vamos ver que msg teste foi exibida provando que de fato a requisição post definida foi executado.

    root@leonardo-Dell-G15-5520:/home/leonardo/Documentos/estudos/apps/cliente# node android.js
        teste

Agora, precisamos receber a msg que foi colocado na variavel html.

Para isso, será preciso usar o bodu-parse, que já está cpnfigurado no server.js.

Então, no index.js de routes, vamos poder realizar o seguinte.

    module.exports = function(application){
        application.get('/', function(req, res){

            res.format({
                html: function() {
                    res.send('Bem vindo a sua app NodeJS!');
                },

                json: function() {
                    var retorno = {
                        body: 'Bem vindo a sua app NodeJS!'
                    }

                    res.json(retorno);
                }
            });
            // res.send('Bem vindo a sua app NodeJS!');
        });

        application.post('/', function(req, res){
            // res.send('teste');
            var dados = req.body;
            res.send(dados);
        });
    }

Se rodarmos novamente, node android.js será retornado o seguinte.

    root@leonardo-Dell-G15-5520:/home/leonardo/Documentos/estudos/apps/cliente# node android.js
        {}

Se for exibido essa msg, significa que deu certo.

Agora, precisamos definir o content-type dentro de headers, para conseguirmos exibir a msg que está dentro da variável html.

    var http = require('http');

    var opcoes = {
        hostname: 'localhost',
        port: 80,
        path: '/',
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }

    // Content-type
    var html = 'nome=Leonardo'; // x-www-form-urlencoded

    var buffer_corpo_response = [];

    // http.get(opcoes, function(res){
    //     res.on('data', function(pedaco){
    //         // serve para exibir as informações
    //         // console.log(' ' + pedaco);
    //         // console.log(pedaco);
    //         buffer_corpo_response.push(pedaco);
    //     });

    //     res.on('end', function(){
    //         // Possibilita em tomar alguma ação após a página terminar de carregar
    //         var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
    //         console.log(corpo_responde);
    //     });

    //     // res.on('error', function(){
    //     //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
    //     // });
    // });

    var req = http.request(opcoes, function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

    req.write(html);
    req.end();

Ao rodarmos novamente, node android.js, será exibido em formato json o que definimos dentro da variável html.

Podemos, tbm, realizar a mesma coisa da seguinte forma, que seria dando uma variável json no formato json e converter essa variável por uma string e susbstituindo no write.

Além disso, com o Content-type, mudado para application/json.

    var http = require('http');

    var opcoes = {
        hostname: 'localhost',
        port: 80,
        path: '/',
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    }

    // Content-type
    var html = 'nome=Leonardo'; // x-www-form-urlencoded
    var json = { nome: 'Leonardo'};
    var string_json = JSON.stringify(json);

    var buffer_corpo_response = [];

    // http.get(opcoes, function(res){
    //     res.on('data', function(pedaco){
    //         // serve para exibir as informações
    //         // console.log(' ' + pedaco);
    //         // console.log(pedaco);
    //         buffer_corpo_response.push(pedaco);
    //     });

    //     res.on('end', function(){
    //         // Possibilita em tomar alguma ação após a página terminar de carregar
    //         var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
    //         console.log(corpo_responde);
    //     });

    //     // res.on('error', function(){
    //     //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
    //     // });
    // });

    var req = http.request(opcoes, function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

    // req.write(html);
    req.write(string_json);
    req.end();

Assim, ao rodarmos novamente, node android.js, será exibido um json vazio.

    root@leonardo-Dell-G15-5520:/home/leonardo/Documentos/estudos/apps/cliente# node android.js
        {}

Motivo disso, deve-se ao fato de que o body-parser não suportar o formato json, o que está configurado no server.js.

Para isso, vamos precisar configurar no server.js, um body-parser que admite o formato json.

    /* configurar o middleware body-parser */
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

Assim, rodando novamente, node android.js, vamos ver que desta vez é exibido o json com o conteúdo definido dentro.

    root@leonardo-Dell-G15-5520:/home/leonardo/Documentos/estudos/apps/cliente# node android.js
        {"nome":"Leonardo"}

## Aula 5 - Opcional - Download dos arquivos do projeto Server/Client:
Opcional - Download dos arquivos do projeto Server/Client

Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos do projeto Server/Client no estado em que se encontram na aula anterior.

Bons estudos ;)

## Aula 6 - Introdução aos Códigos de status (Status Code):
Leitura para o conteúdo:

    https://moz.com/learn/seo/

    http-status-codes#:~:text=An%20HTTP%20status%20code%20is,code%3A%20the%20HTTP%20status%20code.

    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

    https://www.devmedia.com.br/http-status-code/41222

    https://www.hostinger.com.br/tutoriais/o-que-e-http-error-e-principais-codigos-http#:~:text=Status%2Dcode%20s%C3%A3o%20os%20tr%C3%AAs,para%20melhor%20compreens%C3%A3o%20dos%20usu%C3%A1rios.
    https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

## Aula 7 - Criando middlewares para páginas personalizadas de erro (status code):
Nesta aula, vamos aprender a mexer em status.

Lembrando que o status code, pode ser aplicados tanto do lado de servidor quanto do cliente.

Para isso, vamos configurar o seguinte no android.js, para praticarmos o erro 404, page not Found.

    var http = require('http');

    var opcoes = {
        hostname: 'localhost',
        port: 80,
        path: '/teste',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    }

    // Content-type
    // var html = 'nome=Leonardo'; // x-www-form-urlencoded
    // var json = { nome: 'Leonardo'};
    // var string_json = JSON.stringify(json);

    var buffer_corpo_response = [];

    // http.get(opcoes, function(res){
    //     res.on('data', function(pedaco){
    //         // serve para exibir as informações
    //         // console.log(' ' + pedaco);
    //         // console.log(pedaco);
    //         buffer_corpo_response.push(pedaco);
    //     });

    //     res.on('end', function(){
    //         // Possibilita em tomar alguma ação após a página terminar de carregar
    //         var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
    //         console.log(corpo_responde);
    //     });

    //     // res.on('error', function(){
    //     //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
    //     // });
    // });

    var req = http.request(opcoes, function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

    // req.write(html);
    // req.write(string_json);
    req.end();

Assim, executando o script, node android.js, vamos ter o seguinte.

    root@leonardo-Dell-G15-5520:/home/leonardo/Documentos/estudos/apps/cliente# node android.js
        Cannot GET /teste

Analisando isso no broswer, será exibido o status 404, ao acessarmos o console.

O mesmo status, podemos verificar pelo lado do servidor colocando um console Log

    var http = require('http');

    var opcoes = {
        hostname: 'localhost',
        port: 80,
        path: '/teste',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    }

    // Content-type
    // var html = 'nome=Leonardo'; // x-www-form-urlencoded
    // var json = { nome: 'Leonardo'};
    // var string_json = JSON.stringify(json);

    var buffer_corpo_response = [];

    // http.get(opcoes, function(res){
    //     res.on('data', function(pedaco){
    //         // serve para exibir as informações
    //         // console.log(' ' + pedaco);
    //         // console.log(pedaco);
    //         buffer_corpo_response.push(pedaco);
    //     });

    //     res.on('end', function(){
    //         // Possibilita em tomar alguma ação após a página terminar de carregar
    //         var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
    //         console.log(corpo_responde);
    //     });

    //     // res.on('error', function(){
    //     //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
    //     // });
    // });

    var req = http.request(opcoes, function(res){
        res.on('data', function(pedaco){
            // serve para exibir as informações
            // console.log(' ' + pedaco);
            // console.log(pedaco);
            buffer_corpo_response.push(pedaco);
        });

        res.on('end', function(){
            // Possibilita em tomar alguma ação após a página terminar de carregar
            var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
            console.log(corpo_responde);
            console.log(res.statusCode);
        });

        // res.on('error', function(){
        //     // Exibi algum erro, caso a página não carregue ou carreue de forma mau sucedida.
        // });
    });

    // req.write(html);
    // req.write(string_json);
    req.end();

Assim, rodando novamente o script, node android.js, será exibido a seguinte infomação.

    root@leonardo-Dell-G15-5520:/home/leonardo/Documentos/estudos/apps/cliente# node android.js
        Cannot GET /teste

        404

Para podermos tratar os status, vamos usar o express, para isso.

Vamos precisar configurar um middleware para isso no arquivo server.js.

Lembrando que a posição em que é configurado o middleware é muito importante.

    // middleware que configura páginas de status
    app.use(function(req, res, next){

        res.status(404).send('Página não encontrado');

        next();
    });

Abaixo do consing.

Ao acessarmos o localhost/teste, agora, pelo navegador, tal mensagem que está definido no send será exibido, indicando que conseguimos dar as devidas tratativas para esse status 404.

No caso, isso nos possibilita realizar em tratar os erros, por exemplo, criando uma pagina que aprensente tal erro.

No caso, na views, podemos criar um diretório erros, e dentro dela criar um arquivo 404.ejs e dentro dela definirmos o seguinte.

    A página não foi encontrada, verifique a URL informada.

Daí, no server onde configuramos o middleware, em vez de send, podemos renderizar essa pagina.

    // middleware que configura páginas de status
    app.use(function(req, res, next){

        // res.status(404).send('Página não encontrado');
        res.status(404).render('erros/404');

        next();
    });

Ao acessarmos novamente a página, localhot/teste, será exibido o conteúdo dentro de 404.ejs.

Podemos tbm tratar os erros internos desse lugar, como quando renderizamos algo que não existe, então será exibido o status 500.

Vamos configurar esse erro, novamente, pelo middleware no server.js.

    // middleware que configura páginas de status
    app.use(function(req, res, next){

        // res.status(404).send('Página não encontrado');
        res.status(404).render('erros/404');

        next();
    });

    // middleware que configura msg de erros internos
    app.use(function(err, req, res, next){

        // res.status(404).send('Página não encontrado');
        res.status(500).render('erros/500');

        next();
    });

Além disso, em erros, criarmos mais um arquivo 500.ejs.

    Desculpe, houve um erro interno na aplicação.

Assim, no index.js de routes, se renderizarmos algo que não existe, essa página será exibido.

Graças ao next(), em todos os casos o processamento continua, mesmo ocorrendo o erro.