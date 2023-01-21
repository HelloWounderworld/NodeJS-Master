# Seção 20 - Projeto prático - API RESTful e Instagram Clone WEB:
## Aula 1 - O que é uma API?:

Leituras para esse conteúdo: (Apenas Leitura!)

    https://www.techtudo.com.br/listas/2020/06/o-que-e-api-e-para-que-serve-cinco-perguntas-e-respostas.ghtml

    https://aws.amazon.com/pt/what-is/api/

    https://www.sydle.com/br/blog/api-6214f68876950e47761c40e7/

    https://www.luiztools.com.br/post/como-criar-uma-web-api-com-nodejs/

## Aula 2 - O que são URIs, URLs e URNs?:
Leituras para esse conteúdo:

    https://techenter.com.br/o-que-sao-uri-url-e-urn/

    https://forum.casadodesenvolvedor.com.br/topic/44416-o-que-s%C3%A3o-url-uri-e-urn-%F0%9F%A4%94/

    https://igluonline.com/qual-diferenca-entre-url-uri-e-urn/

    https://pt.wikipedia.org/wiki/URI

## Aula 3 - Introdução ao REST:
Leituras para esse conteúdo:

    https://pt.wikipedia.org/wiki/REST

    https://coodesh.com/blog/dicionario/o-que-e-rest/

    https://www.astera.com/pt/tipo/blog/defini%C3%A7%C3%A3o-de-api/

    https://www.alura.com.br/artigos/rest-conceito-e-fundamentos

## Aula 4 - Postman (Rest Client): Instalação e primeiros passos:
Vamos instalar o Postman, que será uma software que permitirá experimentar as apis.

Vamos instalar o postman a partir do webstore.

No caso, nas extensões do google Chrome.

    https://chrome.google.com/webstore/category/extensions?hl=pt-PT

Em seguida realiza o sign up cadastrando algum usuário seu ou com a conta google.

Para usuário Linux pode-se realizar um download do postman para a própria máquina baixando o arquivo, e em seguida rodar o comando

    sudo snap install postman

## Aula 5 - Download dos arquivos iniciais da API:
Download dos arquivos iniciais da API

Utilize o link disponibilizado como recurso dessa aula para fazer o download do package.json, arquivo necessário para dar início a construção da nossa API RESTFull.

Bons estudos ;)

## Aula 6 - Iniciando o projeto da API através do package.json e criando o server:
Vamos dar início ao projeto da API através do package.json que foi baixado acima.

Partiremos de um package.json pré-configurado e configurarmos a aplicação web.

Em seguida, vamos criar um diretório chamado "instagram_clone" e dentro dela criar um outro diretório api e dentro desse diretório colocamos o arquivo package.json.

Daí, iremos realizar as aplicações dentro dela.

Note que, dentro de package.json, já estão as dependências configuradas nela, donde é o que indica o que é necessário para esse projeto.

Para instalarmos tais dependências, bastaria rodarmos o comando

    npm install

ou

    npm i
    
no diretório projeto, que automaticamente será lido as denpendências necessárias para o package.json e instaladas.

No caso, pelo terminal, abrindo até o diretório api desse novo projeto, dentro dela, basta rodar o comando "npm install".

Após isso, note que, foi baixado, dentro do diretório api, a pasta node_modules, donde dentro dela estão as dependências exigidas pelo package.json.

Agora, em seguida vamos criar um arquivo server.js dentro do diretório api.
Nesse arquivo, vamos colocar os seguintes.

    // Formato clássico
    // var express = require('express');
    // var bodyParser = require('body-parser');
    // var mongodb = require('mongodb');

    // Formato robusto
    var express = require('express'),
        bodyParser = require('body-parser'),
        mongodb = require('mongodb');

    var app = express();

    // body-parser como middleware
    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(bodyParser.json());

    var port = 8080;

    app.listen(port);

    console.log('Servidor HTTP esta escutando na porta ' + port);

Assim, ao rodarmos o nodemon server, se for exibido a informação no console log pelo terminal, significa que a aplicação deu certo.

## Aula 7 - Dando um "olá" para o Postman:
Vamos configurar lá dentro da api, uma olá para rodarmos no postman via GET.

Importante fazer um beve sumário:

    - POST: criação

    - GET: Consulta

    - PUT: Atualizar

    - DELETE: Remover

Configuremos o arquivo server.js adicionando uma rota dentro dela.

    // Formato clássico
    // var express = require('express');
    // var bodyParser = require('body-parser');
    // var mongodb = require('mongodb');

    // Formato robusto
    var express = require('express'),
        bodyParser = require('body-parser'),
        mongodb = require('mongodb');

    var app = express();

    // body-parser como middleware
    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(bodyParser.json());

    var port = 8080;

    app.listen(port);

    console.log('Servidor HTTP esta escutando na porta ' + port);

    app.get('/', function(req, res){
        res.send({msg: 'Hello WounderWorld!'});
    });

Assim, vamos abrir o Postman e nela rodar o seguinte link, localhost:8080, com o método GET.

Ao realizarmos isso, deverá ser exibido o objeto json que definimos acima.

## Aula 8 - Method Post: Incluindo documentos no MongoDB:
No caso, agora, vamos criar um objet para post para incluir docuentos no MongoDB.

Para isso, primeiro, vamos precisar configurar a conexão com o mongodb.
Mas, antes disso, vamos deixar estabelecido, via express, como será feito o post pelo server.js.

    // Formato clássico
    // var express = require('express');
    // var bodyParser = require('body-parser');
    // var mongodb = require('mongodb');

    // Formato robusto
    var express = require('express'),
        bodyParser = require('body-parser'),
        mongodb = require('mongodb');

    var app = express();

    // body-parser como middleware
    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(bodyParser.json());

    var port = 8080;

    app.listen(port);

    console.log('Servidor HTTP esta escutando na porta ' + port);

    app.get('/', function(req, res){
        res.send({msg: 'Hello WounderWorld!'});
    });

    app.post('/api', function(req, res){
        var dados = req.body;

        res.send(dados);
    });

Em seguida, usar o método POST, do Postman, e nela rodar o link, localhost:8080/api, e verifcarmos se está sendo rodado corretamente analisando o status que é retornado.

Se aparecer uma msg 200 OK com um objeto vazio, então significa que o deu certo o post.

Em seguida, só falta linkar esse método post definido no server.js, via express, com a conexão mongoDB para inserir algum documento dentro desse banco de dados.

Mas, antes, primeiro, no Postman, vamos configurar o formato que será enviado, que é usando o urlencoded.

No caso, em Postman, onde aparece a aba de menu Params, Authorization, Headers, Body, Pre-request Script, Tests e Settings, vamos clicar no Body.

Em seguida, selecionamos a alernativa "x-www-form-urlencoded".

Assim, vamos definir duas keys, titulo e url_imagem, respectivamente, vamos colocar nos values um "oi" e "oi.png".

Assim, com o método POST ainda selecionado e com o mesmo link rodado da última vez, rodando novamente irá aparecer, desta vez, um objeto json cujos elementos são os titulos e url_imagem que definimos nos passos acima.

Ou seja, isso indica que no lado do servidor tais informações já estão sendo obtidas.

O que falta agora, é enviar tais msgs para o MongoDB.

Como foi visto antes no projeto mmorpg_got a forma para estabelecer a conexão com o mongoDB havia mudado e os comandos para realizar algum tipo de requisição no banco de dados tbm havia mudado.

Logo, para conseguir dar continuidade nesse curso, seria necessário verificar a forma atualizada para estabelecer conexão com o MongoDB, como foi feito no projeto mmorpg_got.

Estou tendo dificuldade para realizar isso, então seria necessário dar uma olhada no curso do mongoDB ou estudar pelo github que eu peguei acima de mongoDB e nodejs e ver como posso resolver esse problema primeiro.

Para não perder o andamento do curso, continuar realizado as anotações.

Caso eu consiga consigurar o mongoDB no server.js e conectar com o banco de dados MongoDB, iremos rodar no Postman, usando o método POST, com o localhost:8080/api, o seguinte que está no arquivo server.js

    app.post('/api', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').insertOne(dados);
    });

No caso, onde está escrito main(), é uma função que estabelece a conexão com o banco de dados MongoDB para possibilitar a inserção de um documento.

## Aula 9 - Method Get: Recuperando documentos do MongoDB:
Nessa aula vamos testar o método GET no Postman colocando a seguinte requisição de get no server.js

    // GET (read)
    app.get('/api', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').find().toArray(function(err, results){
            if(err){
                res.json(err);
            } else {
                res.json(results);
            }
        });
    });

Daí, vc preciaria ir no Postman e colocar o método GET para o link localhost:8080/api que será lido o que foi solicitado aqui.

## Aula 10 - Method Get by ID: Recuperando documento por ID no MongoDB:
Agora, vamos usar um método GET colocando parâmetros para filtrar o tipo de consulta no banco de dados usando o Postman.

Para isso, no arquivo server.js, vamos realizar a seguinte implementação.

    // Formato clássico
    // var express = require('express');
    // var bodyParser = require('body-parser');
    // var mongodb = require('mongodb');

    // Formato robusto
    var express = require('express');
    var bodyParser = require('body-parser');
    var objectId = require('mongodb').ObjectId;

    const { MongoClient } = require('mongodb');
    const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';
    const client = new MongoClient(url);
    const dbName = 'instagram';

    function main() {
        client.connect();
        console.log('Conectado com sucesso no banco de dados MongoDB Community Edition!');
        const db = client.db(dbName);
    
        return db;
    }

    var app = express();

    // body-parser como middleware
    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(bodyParser.json());

    var port = 8080;

    app.listen(port);

    console.log('Servidor HTTP esta escutando na porta ' + port);

    app.get('/', function(req, res){
        res.send({msg: 'Hello WounderWorld!'});
    });

    // POST (create)
    app.post('/api', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').insertOne(dados);
    });

    // GET (read)
    app.get('/api', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').find().toArray(function(err, results){
            if(err){
                res.json(err);
            } else {
                res.json(results);
            }
        });
    });

    // GET by ID (read)
    app.get('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').find({_id : objectId(req.params.id) }).toArray(function(err, results){
            if(err){
                res.json(err);
            } else {
                res.json(results);
            }
        });
    });

Será a forma como vamos consultar.

Assim, no Postman, ainda com o método GET ativo, vamos colocar o link localhost:8080/api/(algum parâmetro _id) que isso refinará a busca exatamente ao parâmetro que foi colocado.

## Aula 11 - Method Put by ID: Atualizando documentos por ID no MongoDB:
Agora, vamos usar o método PUT do Postman, mas atualizarmos algum dado via busca id, parecido com o que foi feito acima no get by id.

Para isso, vamos precisar realizar a seguinte implementação no server.js.

    // PUT by ID (update)
    app.put('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').update(
            { _id : objectId(req.params.id) },
            { $set : { titulo: req.body.titulo }},
            {},
            function(err, records) {
                if(err) {
                    res.json(err);
                } else {
                    res.json(records);
                }

                // colocar o comando que fecha a conexão com o banco de dados.
            }
        );
    });

Assim, no Postman, vamos colocar o método PUT, em seguida no Body e selecionando o x-www-form-urlencoded, vamos colocar no key, título, e no value, Titulo atualizado via PUT.

Assim, rodando o send, será atualizado o título para o _id que foi colocado em localhost:8080/api/_id.

## Aula 12 - Method Delete by ID: Removendo documentos por ID no MongoDB:
Vamos, agora, deletar as informações do banco de dados, MongoDB, via método DELETE pelo Postman informando o id para ela.

Para isso, no arquivo server.js, vamos realizar a seguinte implementação.

    // DELETE by ID (remove)
    app.delete('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').deleteOne({ _id : objectId(req.params.id) }, function(err, records) {
            if(err) {
                res.json(err);
            } else {
                res.json(records);
            }

            // colocar o comando que fecha a conexão com o banco de dados.
        });
    });

Assim, no Postman vamos colocar o método DELETE e nela rodar o link localhost:8080/api/(algum id).

Vamos ver que no banco de dados foi deletado tal informação que pedimos.
Uma boa prática sempre que realizarmos alguma alteração seria validar a tal operação.

Uma via aqui no curso, para isso, seria usando o express-validator, para que qualquer operação POST, GET, PUT e DELETE, for realizado, sempre perguntarmos se tem certeza que queremos realizar a tal operação.

## Aula 13 - Ajustando o código de status do response com base no Verbo HTTP/URI:
No caso, vamos ajustar os status para cada tipo de operação que estivermos executando, de forma que tais informações sirva de ajuda para mim mesmo em verificar o que está ou não está sendo feito de forma bem feita.

Podemos, implementar isso, por exemplo, no server.js da seguinte forma usando o GET by Id como exemplo.

    // GET by ID (read)
    app.get('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').find({_id : objectId(req.params.id) }).toArray(function(err, results){
            if(err){
                res.json(err);
            } else {
                res.status(500).json(results);
            }
        });
    });

Assim, ao rodarmos no Postman o método GET com o link localhost:8080/api/(algum _id), será retornado o status 500, se tiver dado certo, ainda na mesma tela do Postman.

E podemos colocar tais números de forma personalizadas dando relevância à lógica interna da operação.

    // GET by ID (read)
    app.get('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').find({_id : objectId(req.params.id) }).toArray(function(err, results){
            if(err){
                res.json(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

## Aula 14 - Opcional - Download dos arquivos da API:
Opcional - Download dos arquivos da API

Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos do projeto API no estado em que se encontram na aula anterior.

Bons estudos ;)

## Aula 15 - Download dos arquivos iniciais do Instagram Clone WEB:
Download dos arquivos iniciais do Instagram Clone WEB

Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos iniciais do cliente web Instagram Clone.

Bons estudos ;)

## Aula 16 - Breve explicação sobre a aplicação e seus recursos:
Descompactando o arquivo cliente_web_instagram_clone, vamos agora direcionar as nossas aplicações para o lado de frontEnd.

Assim, pegamos essa pasta descompactada e colocamos dentro do instagram_clone.

No caso, essa pasta já vem com as configurações básicas prontas.
Vamos inclusive rodar pelo nodemon e verificar se conseguimos rodar isso pelo navegador colocando o localhos.

Deverá aparecer exatamente a tela de login para acessar o instagram.
No caso, teremos duas páginas, uma de login e uma de home, localhost/home.

## Aula 17 - Incluindo publicações - parte 1:
O objetivo dessa aula, seria implementar uma publicação, mas usando o serviço da api.

No caso, em padrao.ejs que está no diretório views do diretório app da pasta client_web_instagram_clone, vamos realizar a seguinte modificação no script usando o jquery.

    <script>
        $(document).ready(function(){

            $('#btn_incluir').click(function(){
                $('#container_timeline').hide();
                $('#container_form').show();
            });

            $('#btn-cancelar-publicacao').click(function(){
                $('#container_timeline').show();
                $('#container_form').hide();
                return false;
            });

            $('#btn-publicar').click(function(){
                // criar um formData
                var formData = new FormData(); // chave=valor

                var arquivo = document.getElementById("arquivo").files[0];
                var titulo = document.getElementById("titulo").value;

                formData.append("arquivo", arquivo);
                formData.append("titulo", titulo);

                // criar xmlhttprequest
                var xhr = new XMLHttpRequest();

                // verificar as mudanças de estado
                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4) {
                        var resposta = xhr.responseText;
                        document.getElementById('mensagem').innerHTML = resposta;
                    }
                }

                // fazer o envio do nosso request
                xhr.open("POST", "http://localhost:8080/api");
                xhr.send(formData);
            });

        });
    </script>

Em seguida, vamos fazer a seguite publicação agora.

No caso, visitando localhost/home, nela iremos colocar uma imagem e um título clicando no icone da câmera.

Entretanto será exibida a msg de erro como abaixo.

    XMLHttpRequest cannot load

## Aula 18 - Incluindo publicações - parte 2:
O objetivo é corrigir esse problema de XMLHttpRequest cannot load.
Logo, no server.js de api, em app.post, vamos colocar o seguinte.

    // POST (create)
    app.post('/api', function(req, res){

        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:80");
        res.setHeader("Access-Control-Allow-Origin", "*");

        var dados = req.body;

        console.log(dados);

        res.send(dados);
        // main().collection('postagens').insertOne(dados);
    });

Por hora, para verificar se está sendo recebido de forma bem sucedida.
Se foi retornado um json vazio, então, por hora, a aplicação está indo bem.
O que aconteceu foi que agora temos um novo formato de enctype que está sendo recebido.

No caso, em vez de application/x-www-form-urlencoded, está sendo multipart/form-data, donde em server.js, não está tendo estratura o suficiente ainda para receber esse tipo de formato de arquivo.

Vamos precisar instalar isso via npm, o connect-multiparty, que é um middleware, e depois resolver o problema.

## Aula 19 - NPM - instalando o Connect-Multiparty:
Vamos realizar a instalação do connect-multiparty.

    npm install connect-multiparty --save

Agora, vamos configurar como um middleware na nossa aplicação.

Então, no arquivo server.js da api, vamos realizar o seguinte.

    // Formato clássico
    // var express = require('express');
    // var bodyParser = require('body-parser');
    // var mongodb = require('mongodb');

    // Formato robusto
    var express = require('express');
    var bodyParser = require('body-parser');
    var objectId = require('mongodb').ObjectId;
    var multiparty = require('connect-multiparty');

    const { MongoClient } = require('mongodb');
    const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';
    const client = new MongoClient(url);
    const dbName = 'instagram';

    function main() {
        client.connect();
        console.log('Conectado com sucesso no banco de dados MongoDB Community Edition!');
        const db = client.db(dbName);
    
        return db;
    }

    var app = express();

    // body-parser como middleware
    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(bodyParser.json());
    app.use(multiparty());

    var port = 8080;

    app.listen(port);

    console.log('Servidor HTTP esta escutando na porta ' + port);

    app.get('/', function(req, res){
        res.send({msg: 'Hello WounderWorld!'});
    });

    // POST (create)
    app.post('/api', function(req, res){

        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:80");
        res.setHeader("Access-Control-Allow-Origin", "*");

        var dados = req.body;

        console.log(dados);

        res.send(dados);
        // main().collection('postagens').insertOne(dados);
    });

    // GET (read)
    app.get('/api', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').find().toArray(function(err, results){
            if(err){
                res.json(err);
            } else {
                res.json(results);
            }
        });
    });

    // GET by ID (read)
    app.get('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').find({_id : objectId(req.params.id) }).toArray(function(err, results){
            if(err){
                res.json(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    // PUT by ID (update)
    app.put('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').update(
            { _id : objectId(req.params.id) },
            { $set : { titulo: req.body.titulo }},
            {},
            function(err, records) {
                if(err) {
                    res.json(err);
                } else {
                    res.json(records);
                }

                // colocar o comando que fecha a conexão com o banco de dados.
            }
        );
    });

    // DELETE by ID (remove)
    app.delete('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').deleteOne({ _id : objectId(req.params.id) }, function(err, records) {
            if(err) {
                res.json(err);
            } else {
                res.json(records);
            }

            // colocar o comando que fecha a conexão com o banco de dados.
        });
    });

Agora, vamos rodar novamente para verificarmos se está sendo trago o que precisa quando clicamos no botão publicar.

Assim, desta vez foi enviado a mensagem com o título.

Agora, só falta  configurarmos o upload da imagem.

## Aula 20 - Incluindo publicações - parte 3:
Visto a instalação acima, agora, vamos configurar o upload da imagem, para que seja possível, por fim, conseguirmos enviar ao banco de dados tais publicações.

Logo, no server.js, temos que analisar o seguinte.

    // POST (create)
    app.post('/api', function(req, res){

        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:80");
        res.setHeader("Access-Control-Allow-Origin", "*");

        var dados = req.body;

        console.log(dados);

        console.log(req.files);

        res.send(dados);
        // main().collection('postagens').insertOne(dados);
    });

No caso, o console log de req.files que colocamos acima, permite-nos verificar pelo terminal se está ou não recebendo a imagem na qual temos enviado.

    [nodemon] 2.0.20
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node server.js`
    Servidor HTTP esta escutando na porta 8080
    { titulo: 'Trabalho Tóxico' }
    {
    arquivo: {
        fieldName: 'arquivo',
        originalFilename: '323917347_460863916256077_3387055700615368140_n.jpg',
        path: '/tmp/2KDcPvMiQPR_DLrh2gpxjIjM.jpg',
        headers: {
        'content-disposition': 'form-data; name="arquivo"; filename="323917347_460863916256077_3387055700615368140_n.jpg"',
        'content-type': 'image/jpeg'
        },
        size: 63944,
        name: '323917347_460863916256077_3387055700615368140_n.jpg',
        type: 'image/jpeg'
    }
    }

Foi exibido aqui a imagem que temos carregado.

Note que, pelo path, que definimos, o arquivo ficou tem um diretório temporário, tmp. 

No caso, o que precisaríamos realizar agora, é acessar esse diretório onde ficam os arquivos de forma temporária e carregar ela.

Para isso, iremos usar um módulo que permite realizar isso chamado "fs" (file system).

No caso, vamos fazer o require desse módulo em server.js.

    // Formato clássico
    // var express = require('express');
    // var bodyParser = require('body-parser');
    // var mongodb = require('mongodb');

    // Formato robusto
    var express = require('express');
    var bodyParser = require('body-parser');
    var objectId = require('mongodb').ObjectId;
    var multiparty = require('connect-multiparty');
    var fs = require('fs');

    const { MongoClient } = require('mongodb');
    const { json } = require('body-parser');
    const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';
    const client = new MongoClient(url);
    const dbName = 'instagram';

    function main() {
        client.connect();
        console.log('Conectado com sucesso no banco de dados MongoDB Community Edition!');
        const db = client.db(dbName);
    
        return db;
    }

    var app = express();

    // body-parser como middleware
    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(bodyParser.json());
    app.use(multiparty());

    var port = 8080;

    app.listen(port);

    console.log('Servidor HTTP esta escutando na porta ' + port);

    app.get('/', function(req, res){
        res.send({msg: 'Hello WounderWorld!'});
    });

    // POST (create)
    app.post('/api', function(req, res){

        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:80");
        res.setHeader("Access-Control-Allow-Origin", "*");

        var dados = req.body;

        console.log(dados);

        console.log(req.files);

        res.send(dados);

        var path_origem = req.files.arquivo.path;
        var path_destino = './uploads/' + req.files.arquivo.originalFilename;

        fs.rename(path_origem, path_destino, function(err){
            if(err){
                res.status(500).json({error: err})
                return;
            }
        });
        // main().collection('postagens').insertOne(dados);
    });

    // GET (read)
    app.get('/api', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').find().toArray(function(err, results){
            if(err){
                res.json(err);
            } else {
                res.json(results);
            }
        });
    });

    // GET by ID (read)
    app.get('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').find({_id : objectId(req.params.id) }).toArray(function(err, results){
            if(err){
                res.json(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    // PUT by ID (update)
    app.put('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').update(
            { _id : objectId(req.params.id) },
            { $set : { titulo: req.body.titulo }},
            {},
            function(err, records) {
                if(err) {
                    res.json(err);
                } else {
                    res.json(records);
                }

                // colocar o comando que fecha a conexão com o banco de dados.
            }
        );
    });

    // DELETE by ID (remove)
    app.delete('/api/:id', function(req, res){
        var dados = req.body;

        res.send(dados);
        main().collection('postagens').deleteOne({ _id : objectId(req.params.id) }, function(err, records) {
            if(err) {
                res.json(err);
            } else {
                res.json(records);
            }

            // colocar o comando que fecha a conexão com o banco de dados.
        });
    });

Daí, vamos criar mais um diretório dentro do api chamado uploads. Dentro dela, serão enviados as imagens que foram carregadas usando o fs.

Feito as configurações acima, podemos testar se de fato as imagens que eu carreguei no localhost/home será enviado dentro desse diretório.

Como, podemos ver, de fato, a imagem que carregamos foi enviado no uploads.
Agora, falta configurarmos alguns no POST que definimos em server.js, visto que está sendo possível carregar a imagem.

    // POST (create)
    app.post('/api', function(req, res){

        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:80");
        res.setHeader("Access-Control-Allow-Origin", "*");

        // var dados = req.body;

        // console.log(dados);

        // console.log(req.files);

        // res.send(dados);

        var path_origem = req.files.arquivo.path;
        var path_destino = './uploads/' + req.files.arquivo.originalFilename;

        var url_imagem = req.files.arquivo.originalFilename;

        fs.rename(path_origem, path_destino, function(err){
            if(err){
                res.status(500).json({error: err})
                return;
            }

            var dados = {
                url_imagem: url_imagem,
                titulo: req.body.titulo
            }
            console.log('Dentro do fs, mostrar dados: ', dados);

            // Aqui será feito a requisição ao banco de dados.
            // main().collection('postagens').insertOne(dados);
        });
    });

Assim, a estrutura acima, nos permite conseguir carregar a imagem ao uploads e, além disso, nos permite salvar tais informações no banco de dados, MongoDB, o que falta é só configurar tal banco de dados para possibilitar tal uso.

Obs: pelo visto só aceita a imagem no formato .jpg.

Realizar os estudos do MongoDB atualizado para verificar a forma como podemos implementar isso nesse projeto instagram_clone.
Além disso, será necessário criar um identificador único da imagem, pois se fizermos novamente o upload da mesma imagem, no diretório uploads não mudará nada e no banco de dados, haverá dois dados com as mesmas imagens salvas.

Para isso, iremos utilizar o identificador único, que é o tempo, para possibilitar que dois usuários publiquem as duas mesmas imagens.

Assim, no server.js, fazemos a seguinte alteração no POST create

    // POST (create)
    app.post('/api', function(req, res){

        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:80");
        res.setHeader("Access-Control-Allow-Origin", "*");

        // var dados = req.body;

        // console.log(dados);

        // console.log(req.files);

        // res.send(dados);

        var date = new Date();

        var time_stamp = date.getTime();

        var url_imagem = time_stamp + '_' + req.files.arquivo.originalFilename;

        var path_origem = req.files.arquivo.path;
        var path_destino = './uploads/' + url_imagem;

        fs.rename(path_origem, path_destino, function(err){
            if(err){
                res.status(500).json({error: err})
                return;
            }

            var dados = {
                url_imagem: url_imagem,
                titulo: req.body.titulo
            }
            console.log('Dentro do fs, mostrar dados: ', dados);

            // Aqui será feito a requisição ao banco de dados.
            // main().collection('postagens').insertOne(dados);
        });
    });

Agora, tentamos realizar novamente a inclusão.
Podemos ver que, agora, estamos conseguindo fazer o upload da mesma imagem várias vezes e no diretório uploads tais imagens estão sendo várias vezes carregadas com o identificador único nelas.

## Aula 21 - Exibindo postagens na timeline:
Agora que estamos conseguindo salvar as informações de publicações no banco de dados.

Queremos agora publicar de fato na timeline.

Para isso, vamos realizar as seguinte alterações no padrao.ejs que está no views do app do cliente)web_instagram_clone.

    <script>
        $(document).ready(function(){

            function carrega_postagens(){
                // criar xmlhttprequest
                var xhr = new XMLHttpRequest();

                xhr.open("GET", "http://localhost:8080/api");

                xhr.onload = function() {
                    if(xhr.status == 200) {
                        // status acima é o mesmo que é devolvido quando testamos no Postman
                        alert('Tudo ok!');
                    }
                }

                xhr.send();
            }

            carrega_postagens();

            $('#btn_incluir').click(function(){
                $('#container_timeline').hide();
                $('#container_form').show();
            });

            $('#btn-cancelar-publicacao').click(function(){
                $('#container_timeline').show();
                $('#container_form').hide();
                return false;
            });

            $('#btn-publicar').click(function(){
                // criar um formData
                var formData = new FormData(); // chave=valor

                var arquivo = document.getElementById("arquivo").files[0];
                var titulo = document.getElementById("titulo").value;

                formData.append("arquivo", arquivo);
                formData.append("titulo", titulo);

                // criar xmlhttprequest
                var xhr = new XMLHttpRequest();

                // verificar as mudanças de estado
                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4) {
                        var resposta = xhr.responseText;
                        document.getElementById('mensagem').innerHTML = resposta;
                    }
                }

                // fazer o envio do nosso request
                xhr.open("POST", "http://localhost:8080/api");
                xhr.send(formData);
            });

        });
    </script>

No caso, quando rodarmos novamente o localhost/home, teremos o mesmo problema que tivemos quando estávamos tentando carregar uma imagem.

    XMLHttpRequest cannot load

Vamos precisar configurar isso tbm no get pelo server.js.

    // GET (ready)
    app.get('/api', function(req, res){
        var dados = req.body;

        res.setHeader("Access-Control-Allow-Origin", "*");

        res.send(dados);
        // main().collection('postagens').find().toArray(function(err, results){
        //     if(err){
        //         res.json(err);
        //     } else {
        //         res.json(results);
        //     }
        // });
    });

Visto que está funcionando acima, vamos realizar a seguinte implementação no script do padrao.ejs.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = xhr.responseText;
                console.log(data);
            }
        }

        xhr.send();
    }

    carrega_postagens();

Para verificarmos o que está sendo retornado dessa msg.

No caso, se estivermos conectado ao banco de dados, mongoDB, deveria estar filtrando os dados da coleção postagens.

Por hora, como precisa-se realizar um estudos para verificarmos como fazemos tal requisição, no console log, está sendo retornado um objeto vazio.

Para garantirmos que o dado, na varável data acima, está sendo feito em objeto, vamos realizar a seguinte implementação.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                console.log(data);
            }
        }

        xhr.send();
    }

    carrega_postagens();

Daí, se testarmos, visto que foi configurado a conexão com o banco de dados, estará funcionando.

Assim, vamos poder iterar as postagens, pois visto que está retornando um objeto, podemos usar o for, para conseguirmos iterar.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                        '</div>'
                    );
                }
            }
        }

        xhr.send();
    }

    carrega_postagens();

Entretanto, ainda não será possível exibir as imagens, mesmo sendo carregadas.

A resolução disso será visto na próxima aula.

## Aula 22 - Exibindo imagens:
Para resolvermos o problema da imagem existem várias vias.

Porém, uma alternativa para resolvermos isso, que não foge tanto do escopo do curso, é usando o código.

No caso, iremos realizar a seguinte implementação no server.js, que é mais um get voltado para o outro diretório.

    app.get('/imagens/:imagem', function(req, res) {
        var img = req.params.imagem;

        fs.readyFile('./uploads/' + img, function(err, content){
            if(err) {
                res.status(400).json(err);
                return;
            }

            res.writeHead(200, { 'content-type': 'image/jpg' });
            res.end(content);
        })
    });

No caso, com a implementação acima, conseguimos exibir as imagens carregadas.

## Aula 23 - Incluindo comentários em postagens - parte 1:
Visto que agora cada postagem está exibindo o título e a imagem, vamos iniciar uma forma de conseguirmos colocar comentários para cada postagem.

Por hora, só vamos preparar o ambiente para possibilitar tais implementações mais sofisticadas para a próxima aula.

No caso, no padrao.ejs, vamos realizar o seguinte em script onde criamos a função carrega_postagens.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );
                }
            }
        }

        xhr.send();
    }

    carrega_postagens();

Feito acima, em cada postagem será configurado uma parte para comentários.
Assim, o ambiente está pronto para realizar as implementações das lógicas.

## Aula 24 - Incluindo comentários em postagens - parte 2:
Vamos agora implementar as lógicas ao botão comentário, visto que já foi criado o ambiente para isso.

No caso, em padrao.ejs, no script, vamos usar o jquery para realizar tais implementações.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );
                }

                $('.btn_postagem').click(function(){
                    alert('Teste!');
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

Note que, na implementação, só foi feito para testar se realmente o botão Comentar está funcionando via jquery.

Visto que o alert está funcionando, então vamos precisar considerar o conteúdo na qual está sendo colocado dentro do comentário.

Para isso, na mesma função carrega_contagens, na div button, vamos colocar o value e puxar esse value dentro do jquery em que colocamos o alert.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );
                }

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    alert(value);
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

Agora, novamente, podemos testar se agora, quando clicado no botão Comentar, está sendo devolvido o id da postagem feita.

Visto que está funcionando isso, então na div input vamos definir um atributo id e nela passar o valor do id da postagem.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" id="postagem_' + data[i]._id+ '" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );
                }

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    alert(value);
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

Com o formato acima, cada coisa que colcarmos no input, como estamos linkando com o id único da postagem, vamos ter a referência, pelo value que foi definido no button, para acessar o conteúdo que foi colocado dentro do input.

No caso, no evento click que foi definido via jquery para btn_postagem, vamos realizar a seguinte implementação.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" id="postagem_' + data[i]._id+ '" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );
                }

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    // alert(value);
                    var id_input_comentario = 'postagem_' + id;
                    alert(id_input_comentario);
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

Visto que agora, estamos conseguindo referenciar ao id do input, então vamos recuperar o comentário que é colocado dentro de input.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" id="postagem_' + data[i]._id+ '" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );
                }

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    // alert(value);
                    var id_input_comentario = 'postagem_' + id;
                    // alert(id_input_comentario);
                    var comentario = $('#' + id_input_comentario).val();
                    alert(comentario);
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

Agora, podemos testar se colocando algum comentário, está sendo trago de fato o comentario que foi colocado pelo alert acima.
Visto que está sendo feito de forma bem sucedida, então só falta enviarmos essa informação no nosso api.

## Aula 25 - Incluindo comentários em postagens - parte 3:
No caso, como estamos conseguindo capturar agora a msg que é inserido na aba de comentários, via jquery, só falta agora enviarmos essa informação para api, especificamente para o put, no server.js, para atualizarmos as informações da postagem no banco de dados.

Logo, vamos implementar isso pouco a pouco do que está escrito na postagem.

    // PUT by ID (update)
    app.put('/api/:id', function(req, res){
        res.send('rota para atualização');
        // var dados = req.body;

        // res.send(dados);
        // main().collection('postagens').update(
        //     { _id : objectId(req.params.id) },
        //     { $set : { titulo: req.body.titulo }},
        //     {},
        //     function(err, records) {
        //         if(err) {
        //             res.json(err);
        //         } else {
        //             res.json(records);
        //         }

        //         // colocar o comando que fecha a conexão com o banco de dados.
        //     }
        // );
    });

Vamos testar se a rota está tudo ok.

Para isso, vamos utilizar o Postman com o método PUT e nela colocar algum id, localhot:8080/api/(algum id).

Visto que está retornando o send como configuramos acima, então vamos agora implementar, pouco a pouco, as lógicas necessárias para isso.

Então, em padrao.ejs, na função carrega_postagens, no envento click que definimos, vamos realizar o seguinte.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" id="postagem_' + data[i]._id+ '" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );
                }

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    // alert(value);
                    var id_input_comentario = 'postagem_' + id;
                    // alert(id_input_comentario);
                    var comentario = $('#' + id_input_comentario).val();
                    // alert(comentario);
                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'http://localhost:8080/api/' + id);
                    xhr.send();
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

Com a configuração acima, podemos testar se o evento click que definimos para btn_postagem está conseguindo requisitar a api que definimos.

Bom, como ocorreu da mesma forma anteriormente, provalmente, não, pois ainda precisaria resolver o problema do XMLHttpRquest cannot load.

Bastaríamos fazer o mesmo, como foi feito para os outros métodos, para resolvermos esse problema.

No caso, no método put que definimos em server.js, colocamos

    // PUT by ID (update)
    app.put('/api/:id', function(req, res){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send('rota para atualização');
        // var dados = req.body;

        // res.send(dados);
        // main().collection('postagens').update(
        //     { _id : objectId(req.params.id) },
        //     { $set : { titulo: req.body.titulo }},
        //     {},
        //     function(err, records) {
        //         if(err) {
        //             res.json(err);
        //         } else {
        //             res.json(records);
        //         }

        //         // colocar o comando que fecha a conexão com o banco de dados.
        //     }
        // );
    });

Mas ainda assim ainda não é o suficiente, pois agora temos o problema novo, diferente do Access control, como havia tido antes.

O problema seria a de preflight, que é o que precisamos resolver e iremos fazer isso na próxima aula.

## Aula 26 - Preflight Request:
Leitura de conceito:

    https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request#:~:text=A%20CORS%20preflight%20request%20is,Headers%20%2C%20and%20the%20Origin%20header.
    
    https://docs.sensedia.com/pt/faqs/Latest/apis/preflight.html#:~:text=Comportamento-,Requisi%C3%A7%C3%A3o%20preflight,requisi%C3%A7%C3%A3o%20HTTP%20efetiva%20%C3%A9%20realizada.

    https://developer.mozilla.org/pt-BR/docs/Glossary/Preflight_request

    https://learn.microsoft.com/pt-br/rest/api/storageservices/preflight-queue-request

## Aula 27 - Incluindo comentários em postagens - parte 4:
Vamos resolver esse problema de preflight.

Logo, no arquivo server.js, vamos definir um novo app.use da seguinte forma

    app.use(function(req, res, next){

        // isso é um middleware
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        // O motivo de ser o content-type seria e precisamos informar que o tipo de conteúdo que está sendo enviado é um JSON.
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Credentials", true);

        next();
    });

Visto que confguramos esse middleware, podemos retirar todos os setHeaders que colocamos uma por uma em cada método.

Em seguida, em padrao.ejs, no evento click para btn_postagem definida e dentro de xhr.send(), podemos enviar o conteúdo que está sendo colocado no input.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" id="postagem_' + data[i]._id+ '" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );
                }

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    // alert(value);
                    var id_input_comentario = 'postagem_' + id;
                    // alert(id_input_comentario);
                    var comentario = $('#' + id_input_comentario).val();
                    // alert(comentario);
                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'http://localhost:8080/api/' + id);
                    xhr.setRequestHeader('Content-Type', 'application/json');

                    xhr.onload = function(){
                        alert(xhr.responseText);
                    }

                    xhr.send(JSON.stringify({comentario: comentario}));
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

No caso, isso fará com que seja enviado uma string para o método PUT
Podemos testar isso inserindo algum comentário e se tudo ocorrer certo, irá aparecer o alert onde irá exibir o send, "rota para atualização", que está configurado no método put do server.js.

Vamos testar se no método put está de fato retornando o id correto.

    // PUT by ID (update)
    app.put('/api/:id', function(req, res){
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.send('rota para atualização');
        res.send(req.params.id);
        // var dados = req.body;

        // res.send(dados);
        // main().collection('postagens').update(
        //     { _id : objectId(req.params.id) },
        //     { $set : { titulo: req.body.titulo }},
        //     {},
        //     function(err, records) {
        //         if(err) {
        //             res.json(err);
        //         } else {
        //             res.json(records);
        //         }

        //         // colocar o comando que fecha a conexão com o banco de dados.
        //     }
        // );
    });

Basta, novamente, inserir algum comentário e clicado, verificar o que irá ser exibido pelo alert.

Agora, vamos verificar se está sendo enviado, de fato, o comentário.
No server.js, colocamos.

    // PUT by ID (update)
    app.put('/api/:id', function(req, res){
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.send('rota para atualização');
        // res.send(req.params.id);
        res.send(req.body.comentario);
        // var dados = req.body;

        // res.send(dados);
        // main().collection('postagens').update(
        //     { _id : objectId(req.params.id) },
        //     { $set : { titulo: req.body.titulo }},
        //     {},
        //     function(err, records) {
        //         if(err) {
        //             res.json(err);
        //         } else {
        //             res.json(records);
        //         }

        //         // colocar o comando que fecha a conexão com o banco de dados.
        //     }
        // );
    });

Novamente, inserimos algum comentário e clicamos no evento para verficarmos se está sendo de fato enviado a msg.

Visto que foi enviado, agora, estamos prontos para atualizar isso no banco de dados da postagem em que o comentário foi inserido.

## Aula 28 - Incluindo comentários em postagens - parte 5:
Agora, vamos, de fato, atualizar o conteúdo.

Para isso, no método put que estamos utilizando, antes, usávamos $set, mas agora iremos usar o $push para conseguirmos incluir um novo conteúdo dentro do objeto json que estão salvos os conteúdos da postagem.

    // PUT by ID (update)
    app.put('/api/:id', function(req, res){
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.send('rota para atualização');
        // res.send(req.params.id);
        res.send(req.body.comentario);
        // var dados = req.body;

        // res.send(dados);
        // Lugar para requisitar o banco de dados, MongoDB.
        // main().collection('postagens').update(
        //     { _id : objectId(req.params.id) },
        //     { $push : {
        //         comentarios: {
        //             id_ comentario: new objectId(),
        //             comentario: req.body.comentario
        //             }
        //         }
        //     },
        //     {},
        //     function(err, records) {
        //         if(err) {
        //             res.json(err);
        //         } else {
        //             res.json(records);
        //         }

        //         // colocar o comando que fecha a conexão com o banco de dados.
        //     }
        // );
    });

Feito isso, vamos poder testar, visto que conseguimos configurar a conexão com o MongoDB.

Para verificarmos se estamos conseguindo pegar exatamente o que está sendo retornado pelo banco de dados se foi ou não bem sucedido a operação, podemos implementar no padrao.ejs, em script com o evento click btn_postagem definido, o seguinte.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" id="postagem_' + data[i]._id+ '" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );
                }

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    // alert(value);
                    var id_input_comentario = 'postagem_' + id;
                    // alert(id_input_comentario);
                    var comentario = $('#' + id_input_comentario).val();
                    // alert(comentario);
                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'http://localhost:8080/api/' + id);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    
                    xhr.onload = function(){
                        // alert(xhr.responseText);
                        if(xhr.status === 200) {
                            window.location.href = '/home';
                        }
                    }

                    xhr.send(JSON.stringify({comentario: comentario}));
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

No caso, isso nos permitirá verificar se, de fato, a inclusão do comentário no banco de dados foi bem sucedida ou não via a página padrao.ejs.

## Aula 29 - Exibindo comentários:
Agora que estamos conseguindo incluir os comentários no banco de dados falta, agora, exibir esses comentários nas respectivas postagens.

No caso, no arquivo padrao.js, no container_timerline, nela que iremos realizar a implementaçãoa necessária para conseguirmos exibir tais comentários.

Então realizamos o seguinte.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentarios" id="comentarios_"' + data[i]._id + '></div>' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" id="postagem_' + data[i]._id+ '" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );

                    if(data[i].comentarios != undefined){
                        var comentarios = data[i].comentarios;

                        for(j = 0; j < comentarios.lenght; j++){
                            $('#comentarios_'+data[i]._id).append(
                                '<div class="txt_comentario">' +
                                    comentarios[j].comentario +
                                '</div>'
                            );
                        }
                    }
                }

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    // alert(value);
                    var id_input_comentario = 'postagem_' + id;
                    // alert(id_input_comentario);
                    var comentario = $('#' + id_input_comentario).val();
                    // alert(comentario);
                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'http://localhost:8080/api/' + id);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    
                    xhr.onload = function(){
                        // alert(xhr.responseText);
                        if(xhr.status === 200) {
                            window.location.href = '/home';
                        }
                    }

                    xhr.send(JSON.stringify({comentario: comentario}));
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

Isso já possibilita a exibição dos comentários para os respectivos posts.
Além disso, ao inserirmos um novo comentário, será possível ver que o mesmo já é exibido em seguida.

## Aula 30 - Removendo comentários - parte 1:
Vamos agora aprender a remover os comentários.

No caso, primeiro, vamos criar os ambientes necessários para isso.

Iremos usar o método DELETE.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentarios" id="comentarios_"' + data[i]._id + '></div>' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" id="postagem_' + data[i]._id+ '" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );

                    if(data[i].comentarios != undefined){
                        var comentarios = data[i].comentarios;

                        for(j = 0; j < comentarios.lenght; j++){
                            $('#comentarios_'+data[i]._id).append(
                                '<div class="txt_comentario">' +
                                    '<button type="button" value="' + comentarios[j].id_comentario + '" class="btn btn_default btn_remover_postagem">X</button>' +
                                    comentarios[j].comentario +
                                '</div>'
                            );
                        }
                    }
                }

                $('.btn_remover_postagem').click(function(){
                    var id_comentario = this.value;
                    alert(id_comentario);
                });

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    // alert(value);
                    var id_input_comentario = 'postagem_' + id;
                    // alert(id_input_comentario);
                    var comentario = $('#' + id_input_comentario).val();
                    // alert(comentario);
                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'http://localhost:8080/api/' + id);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    
                    xhr.onload = function(){
                        // alert(xhr.responseText);
                        if(xhr.status === 200) {
                            window.location.href = '/home';
                        }
                    }

                    xhr.send(JSON.stringify({comentario: comentario}));
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

Com a implementação de um novo evento de click para remover comentário feito acima e visto que ela está nos retornando o id_comentario certo, agora em server.js no método delete vamos ter que receber esse valor para conseguirmos deletá-las.

    // DELETE by ID (remove)
    app.delete('/api/:id', function(req, res){
        res.send(req.params.id);
        // var dados = req.body;

        // res.send(dados);
        // main().collection('postagens').deleteOne({ _id : objectId(req.params.id) }, function(err, records) {
        //     if(err) {
        //         res.json(err);
        //     } else {
        //         res.json(records);
        //     }

        //     // colocar o comando que fecha a conexão com o banco de dados.
        // });
    });

Vamos, agora, ir no padrao.ejs e lá na função carrega_postagens no envento de click para remover comentário precisamos disparar esse método que está definido no server.js.

    function carrega_postagens(){
        // criar xmlhttprequest
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:8080/api");

        xhr.onload = function() {
            if(xhr.status === 200) {
                // status acima é o mesmo que é devolvido quando testamos no Postman
                // alert('Tudo ok!');
                var data = $.parseJSON(xhr.responseText);
                // console.log(data);

                for(i = 0; data.length; i++) {
                    // alert(data[i])
                    $('#container_timeline').append(
                        '<div class="publicacao">'+
                            '<span class="titulo">' + 
                                data[i].titulo +
                            '</span>' +
                            '<img src="http://localhost:8080/uploads/' + data[i].url_imagem + '" />' +
                            '<div class="comentarios" id="comentarios_"' + data[i]._id + '></div>' +
                            '<div class="comentar">' +
                                '<input type="text" class="form-control input_comentario" id="postagem_' + data[i]._id+ '" placeholder="Adicione um comentário...">' +
                                '<button class="btn btn-default btn_postagem" value="'+ data[i]._id +'" type="button">Comentar</button>' +
                            '</div>' +
                        '</div>'
                    );

                    if(data[i].comentarios != undefined){
                        var comentarios = data[i].comentarios;

                        for(j = 0; j < comentarios.lenght; j++){
                            $('#comentarios_'+data[i]._id).append(
                                '<div class="txt_comentario">' +
                                    '<button type="button" value="' + comentarios[j].id_comentario + '" class="btn btn_default btn_remover_postagem">X</button>' +
                                    comentarios[j].comentario +
                                '</div>'
                            );
                        }
                    }
                }

                $('.btn_remover_postagem').click(function(){
                    var id_comentario = this.value;
                    // alert(id_comentario);

                    var xhr = new XMLHttpRequest();
                    xhr.open('DELETE', 'http://localhost:8080/api/' + id_comentario);
                    
                    xhr.onload = function(){
                        // alert(xhr.responseText);
                        if(xhr.status === 200) {
                            alert(xhr.responseText);
                        }
                    }
                    xhr.send();
                });

                $('.btn_postagem').click(function(){
                    // alert('Teste!');
                    var id = this.value;
                    // alert(value);
                    var id_input_comentario = 'postagem_' + id;
                    // alert(id_input_comentario);
                    var comentario = $('#' + id_input_comentario).val();
                    // alert(comentario);
                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'http://localhost:8080/api/' + id);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    
                    xhr.onload = function(){
                        // alert(xhr.responseText);
                        if(xhr.status === 200) {
                            window.location.href = '/home';
                        }
                    }

                    xhr.send(JSON.stringify({comentario: comentario}));
                });
            }
        }

        xhr.send();
    }

    carrega_postagens();

Depois que fizermos isso, vamos testar clicando no X em algum comentário.

Se aparecer um alert com o id do comentário na qual está sendo enviado pelo método delete que está sendo configurado no server.js, então está tudo ocorrendo certo.

Agora, basta acionar o banco de dados para removermos tal comentário via id.

## Aula 31 - Removendo comentários - parte 2:
Vamos agora deletar os comentários.

No caso, para isso, vamos usar, dentro do método delete, o comando update.

No caso, no server.js do método delete definimos.

    // DELETE by ID (remove)
    app.delete('/api/:id', function(req, res){
        res.send(req.params.id);
        // var dados = req.body;

        // res.send(dados);
        // main().collection('postagens').deleteOne({ _id : objectId(req.params.id) }, function(err, records) {
        //     if(err) {
        //         res.json(err);
        //     } else {
        //         res.json(records);
        //     }

        //     // colocar o comando que fecha a conexão com o banco de dados.
        // });

        // Lugar para requisitar o banco de dados, MongoDB.
        // main().collection('postagens').update(
        //     { _id : objectId(req.params.id) },
        //     { $pull : {
        //         comentarios: {
        //             id_ comentario: objectId(req.params.id)
        //             }
        //         }
        //     },
        //     {multi: true},
        //     function(err, records) {
        //         if(err) {
        //             res.json(err);
        //         } else {
        //             res.json(records);
        //         }

        //         // colocar o comando que fecha a conexão com o banco de dados.
        //     }
        // );
    });

Agora, vamos conseguir remover os comentários.

## Aula 32 - Download dos arquivos do projeto:
Download dos arquivos do projeto

Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos do projeto API RESTFull e Instagram Clone WEB no estado em que se encontram na aula anterior.

Bons estudos ;)

# Seção 21 - Complementos do curso:
## Aula 1 - Download servidor NodeJS pré-configurado:
    Download servidor NodeJS pré-configurado

    Utilize o link disponibilizado como recurso dessa aula para fazer o download de uma aplicação NodeJS pré-configurada com o Express, o EJS, o Consign, o Body-parser e o Express-validator.

    Bons estudos ;)

## Aula 2 - Trabalhando com o MongoDB 3.6 no projeto final MMORPG GOT:
    Trabalhando com o MongoDB 3.6 no projeto final MMORPG GOT

    Confira no PDF disponibilizado nessa aula algumas dicas para trabalhar com o MongoDB na versão 3.6 em conjunto com o NodeJS aplicado ao projeto final MMORPG Got.

    Bons estudos ;)

# Seção 22 - Bônus:
## Aula 1 - Não deixe de conferir ;):
Não deixe de conferir ;)

Olá,

E ai, está curtindo a curso? Então que tal conhecer um pouco mais do meu trabalho?

Acesse www.jorgesantana.net.br e confira.

Forte abraço e sucesso!