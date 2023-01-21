# Seção 7 - Models e ganhando produtividade com Consign (sucessor do Express-Load):
## Aula 1 - O que é o Consign?:
Agora, vamos implementar o Consign. No caso, esse recurso ela serve para caso vc tiver um número muito grande de routes para gerenciar.

No caso, ela serve para criar tais rotas de forma automática, sem necessidade de criar requires um por um.

Além disso, ela faz um autoload de views.

## Aula 2 - NPM - Instalando o Cosign:
Entrando no projeto que estamos estudando, curso_node, e basta colocar o comando
    
    npm install consign --save

Assim, ao olharmos no node-modules, terá a pasta consign presente.

## Aula 3 - Refactoring do projeto prático portal de notícias com Consign (routes):
Vamos agora refatorar da nossa aplicação. No caso, vamos fazer o require do consign no arquivo server.js. No caso, como a intenção de usarmos consign está em conseguirmos requisitar os routes e depois colocar tais mudanças no express, é necessário que apliquemos o consign, depois que requisitarmos (require), depois do express.

Feito os procedimentos acima, no arquivo app.js, podemos desconsiderar as variáveis
    var rotaHome
    
    var rotaFormInclusaoNoticia
    
    var rotaNoticias

Depois disso, note que, mesmo colocando as rotas que temos, tudo continuará funcionando.

No caso, vale a pena estudar mais a fundo sobre o consign, pois além dos autoloads de rotas, ela automatiza outras inúmeras funcionalidades tbm!

https://fabiojanio.medium.com/nodejs-express-cors-consign-autoload-bodyparser-e-compression-na-pr%C3%A1tica-fbfc12e46ff4

## Aula 4 - Refactoring do projeto prático portal de notícias com Consign (banco de dados):
Vamos, por meio do uso de consign, a aprender a colocar o nosso método de conexão no modo autoloader.

No caso, note que, no arquivo noticias.js, nela estamos fazendo um require no banco de dados dbConnection, onde nesse arquivo dbConnection.js, estabelece uma única vez a conexão com o banco de dados MySQL.

Entretanto, ao termos mais de 40 telas, seria muito trabalhoso ter que toda hora em cada rota chamar esse comando para conseguirmos estabelecer a conexão com o banco de dados.

No caso, usando o consign, podemos automatizar isso deixando claro qual tela irá ou não fazer a requisição ao banco de dados.

Vamos inicialmente mexer no arquivo noticias.js. Em seguida, no arquivo server.js, vamos colocar o método then no consign().

Nela, vamos especificar a pasta config e o arquivo dentro do config, pois o próprio server.js que estamos usando está dentro desse arquivo config e assim vamos estabelecer as rotas que queremos que o banco de dados MySQL seja usado.

Feito isso, no módulo dbConnection.js nela iremos colocar o rapper. Pois, no formato em que o dbConnection.js está estabelecendo a conexão com o banco de dados, configurado o consign da forma como foi feito acima, sempre que entrarmos em uma tela x, será feito uma requisição do equivalente da quantidade de telas em que colocamos na rota independente se vc está ou não acessando a tela.

Isso, no ponto de vista de eficiência e custo, é muito ruim, pois significa que o seu computador estará realizando uma requisição descenessária toda hora e, dependendo do caso se vc estiver trabalhando em uma empresa que usa o seu sistema que vc está desenvolvendo, vc estárá causando um custo adicional totalmente desnecessária para a empresa por estar realizando requisições desnecessárias, cada vez que vc acessa qualquer tela do site em que vc estiver desenvolvendo.

No caso, como funciona esse rapper. Basicamente, vamos criar uma nova variável connMySQL e essa variável vamos retornar ela dentro da função module.export.

Sendo que na variável connMySQL vai todas as formas de estabelecer a conexão com o banco de dados como ia antes no module.export.

Agora, no arquivo noticias.js vamos estabelecer uma conexão de forma diferente. Que seria

    var connection = app.config.dbConnection();

isso dentro do app.get.

Pois assim, eu condiciono de forma que eu acesse o banco de dados somente quando eu acessar a rota noticias.

## Aula 5 - Criando a página de detalhes das notícias:
Agora, vamos criar uma página onde mostra em detalhe o conteúdo da notícia. Para isso, vamos criar um novo arquivo noticia.js no diretório routes.

Nesse arquivo criado, vamos estabelecer a conexão com o banco de dados requisitando somente os id`s das notícias que estamos inserindo nela. Daí, vamos exibir isso no arquivo noticia.ejs.

Daí em noticias.ejs podemos carregar somente o que precisamos.

## Aula 6 - Implementando models:
Vamos agora implementar os models que nos servirá para ajudar na organização dos arquivos. No caso, os models vai nos ajudar a controlar as tabelas que são expressa na tela.

Para isso, dentro do diretório vamos criar um outro diretório chamado models. E dentro desse subdiretório criamos um arquivo noticiasModel.js.

Daí, para evitarmos de ter que ficar criando cada model para cada tela, vamos, novamente, usar o consign para automatizarmos esse processo.

No caso, no arquivo server.js vamos incluir os models dentro do processo com o then, da mesma forma que foi feito para dbConnection.

Agora, dentro do arquivo noticiasModel.js vamos realizar as exportações que precisamos.

    module.exports = function() {
        this.getNoticias();

        return this;
    }

No caso, acima está sendo exportado uma função e ela retorna a variável "this".

Em seguida, no arquivo noticias, vamos criar a variável noticiasModel.

Criado a tal variável, vamos precisar chamar o getNoticias nela e dentro dela chamar o connection e no callback chamar a function que está sendo feito callback no connection.query.

    noticiasModel.getNoticias(connection, function(error, result) {
        res.render("noticias/noticias", {noticias: result});  // Basicamente, essa condição vai nos permitir acessar as informações dos arrays pelo arquivo .ejs correspondente dessa rota.
    });

Isso significa que não vamos mais usar o connection.query no arquivo noticias. Pois isso será feito, somente uma única vez no arquivo noticiasModel.js dentro do this.getNoticias.

    module.exports = function() {

        this.getNoticias = function(connection, callback) {
            connection.query('select * from noticias', callback);
        }

        return this;
    }

Isso significa que o getNoticias, acaba servindo de uma função única para realizar a requisição.

Analogamente, realizamos isso em noticia.js criando uma outra função getNoticia em noticiasModel.js.

Assim, ao olharmos no localhost:3000 e irmos colocando as rotas respectivas de noticias e noticia, tudo estará funcionando como queremos.

No caso, vimos que o noticiasModel.js serviu de um centro onde podemos definir formas de requisições onde podemos chamar as tais tipos de requisições em respectivas rotas que queremos, em vez de ao criarmos as rotas ficarmos toda hora definindo uma requisição. O que tornaria muito caotico quando tivermos que gerenciar as requisições de um conjunto gigante de números de rotas.

## Aula 7 - Opcional - Download dos arquivos portal de notícias:
Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos parciais do projeto portal de notícias no estado em que se encontram até a aula anterior.

Bons estudos ;)