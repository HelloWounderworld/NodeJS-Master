# Seção 4 - Modulando nosso projeto com CommonJS:
## Aula 1 - O que são módulos e o que é CommonJS?:
Módulos - Permitem organizar melhor os nossos códigos de tal modo que isole uma determinada lógica nossa e que a mesma seja usada de forma recorrente para outras finalidades. Um exemplo de módulos seria as classes que aparecem nas programações orientadas à objetos.

CommonJS - é que permite definir o formato da construção desses módulos.

Uma estrutura de escrita que seja implementado no node de forma natural.

Para experimentarmos tais recursos usamos vamos criar o arquivo mod_teste.js e dentro dela colocar um exemplo simples.

Feito isso precisa-se ser recuperado na aplicação app.js.

No caso, o módulo pode retornar qualquer coisa (objeto, string, booleano, classe, etc...).

Um caso mais comum que se retorna do módulo é uma função.

### Módulos
Módulos em JavaScript são uma forma de dividir o código de um programa em partes separadas, cada uma encapsulando uma funcionalidade específica. Essa divisão ajuda a manter o código mais organizado, facilita a manutenção, a reutilização de código e a gestão de dependências. Os módulos são fundamentais em aplicações JavaScript de grande escala, pois permitem que os desenvolvedores trabalhem em diferentes partes do código de forma independente.

#### Características dos Módulos JavaScript:
1. Encapsulamento: Cada módulo tem seu próprio escopo. Variáveis, funções, classes e outros elementos definidos em um módulo não são visíveis ou acessíveis fora dele, a menos que sejam explicitamente exportados.

2. Exportação e Importação: Módulos podem exportar partes de seu código (como funções, objetos, classes) para serem usados em outros módulos. Da mesma forma, podem importar funcionalidades de outros módulos.

3. Reutilização de Código: Módulos podem ser reutilizados em diferentes partes de uma aplicação ou mesmo entre diferentes projetos, promovendo a reutilização de código.

4. Manutenção: Com o código dividido em módulos focados em funcionalidades específicas, torna-se mais fácil gerenciar e atualizar o código.

#### Tipos de Módulos em JavaScript:

##### CommonJS:
Utilizado principalmente no Node.js, usa require() para importar módulos e module.exports para exportar. As importações são síncronas, o que é adequado para servidores.

##### ES Modules (ESM):
Introduzido na especificação ECMAScript 2015, é o sistema de módulos padrão para JavaScript moderno no navegador e também suportado no Node.js. Usa import e export para manipulação de módulos e suporta importações assíncronas.

#### Exemplo de Módulo ES:

##### Exportando:

    // arquivo: math.js
    export function soma(a, b) {
        return a + b;
    }

    export const PI = 3.14159;

##### Importando:

    // arquivo: app.js
    import { soma, PI } from './math.js';

    console.log(soma(2, 3));  // Saída: 5
    console.log(PI);          // Saída: 3.14159

#### Vantagens dos ES Modules:
- Carregamento Assíncrono: Suporta import() dinâmico que permite carregar módulos de forma assíncrona, útil para aplicações web para reduzir o tempo de carregamento inicial.

- Compatibilidade com Navegadores: ES Modules são suportados nativamente pela maioria dos navegadores modernos sem a necessidade de ferramentas adicionais.

- Análise Estática: Facilita a análise estática do código, permitindo otimizações como tree shaking, que remove código não utilizado.

#### Conclusão:
Módulos são essenciais para desenvolver aplicações JavaScript escaláveis e manuteníveis. Com a evolução dos padrões ECMAScript, os ES Modules tornaram-se a forma recomendada de trabalhar com módulos em JavaScript, tanto no servidor quanto no navegador, oferecendo uma sintaxe mais limpa e recursos mais poderosos para o desenvolvimento moderno.

### CommonJS
CommonJS é uma especificação de padrão para modularização de código JavaScript, inicialmente concebida para ser utilizada em ambientes de servidor, como o Node.js. A ideia por trás do CommonJS é permitir a reutilização de código e facilitar a manutenção ao encapsular funcionalidades em módulos separados, que podem ser importados e utilizados conforme necessário.

#### Características do CommonJS:
1. Modularidade: Cada arquivo em um projeto Node.js é tratado como um módulo separado. Isso significa que variáveis e funções definidas em um arquivo não são acessíveis em outros arquivos, a menos que sejam explicitamente exportadas e importadas.

2. Sincronia: As importações de módulos via CommonJS são geralmente síncronas. Isso significa que o código é carregado e executado imediatamente quando o método require() é chamado. Isso é adequado para servidores onde os módulos são lidos do sistema de arquivos local e não há grandes preocupações com a latência que isso possa causar.

3. Exportação e Importação: Os módulos podem exportar objetos, funções, classes ou qualquer outro tipo de dado usando module.exports e podem ser importados em outros módulos usando a função require().

#### Exemplo de Uso:

##### Exportando um módulo:

    // arquivo: math.js
    function soma(a, b) {
        return a + b;
    }

    module.exports = soma;

##### Importando um módulo:

    // arquivo: app.js
    const soma = require('./math');

    console.log(soma(2, 3));  // Saída: 5

#### Relação entre CommonJS e Módulos:
- Encapsulamento: Cada módulo em CommonJS tem seu próprio escopo. Isso significa que variáveis, funções, classes, etc., definidas em um módulo não poluem o escopo global.

- Reutilização de Código: Os módulos podem ser reutilizados em diferentes partes de uma aplicação ou entre diferentes projetos. Isso promove a reutilização de código e reduz a duplicação.

- Gerenciamento de Dependências: CommonJS trata das dependências de forma explícita através do uso de require(). Isso torna as dependências claras e gerenciáveis.

### Aplicando os conceitos
No projeto, curso-nodejs, criamos um novo arquivo na raiz, mod_teste.js, e nela inserimos o seguinte

    let msg = "Este modulo contem apenas uma string.";

Agora, no arquivo, app.js, nela inserimos o seguinte

    let msg = require('./mod_teste');

Ao executarmos, usando o nodemon, o app.js e visitando o localhost:3000, vamos ver que nao temos nenhuma resposta pelo terminal.

A maneira como configuramos o arquivo, mod_teste.js, nao quer dizer nada. Precisamos colocar algo que, de fato, corresponda ao require

    let msg = "Este modulo contem apenas uma string.";

    module.exports = msg;

Agora, vamos conseguir ver que no, nodemon, o arquivo, app.js, esta devolvendo o que queremos, que e a mensagem que definimos acima.

O modo mais frequente de usarmos o module.exports, e que ela retorne uma funcao, como seguinte 

    module.exports = function() {
        let msg = "Este modulo contem apenas uma string.";
        return msg;
    };

Ao analisarmos o que e retornado pelo terminal, vamos ver que e retornado uma function, [Function (anonymous)]. Ou seja, sinifica que precisamos que essa funcao retornado seja executado, como seguinte

    let msg = require('./mod_teste');

    app.listen(3000, function(){
        // console.log("Servidor rodando com express!");
        console.log(msg());
    });

O codigo inteiro do app.js, fica

    // Instalei o Nodemon. Rode no terminal: nodemon app
    let express = require('express');
    let msg = require('./mod_teste');

    let app = express();

    app.set('view engine', 'ejs');

    app.get('/', function(req, res) {
        res.render("home/index");
    });

    app.get('/formulario_inclusao_noticia', function(req, res) {
        res.render("admin/form_add_noticia");
    });

    app.get('/noticia', function(req, res) {
        res.render("noticias/noticias");
    });

    app.listen(3000, function(){
        // console.log("Servidor rodando com express!");
        console.log(msg());
    });

#### Impacto no Desenvolvimento de Aplicações:
O uso de CommonJS no Node.js revolucionou o desenvolvimento de aplicações JavaScript no servidor, permitindo que os desenvolvedores utilizem a mesma linguagem tanto no cliente quanto no servidor, e gerenciem suas dependências de forma eficaz.

#### Limitações:
Carregamento Síncrono: O carregamento síncrono pode ser um problema para aplicações executadas no navegador, onde o carregamento de módulos do servidor pode causar atrasos perceptíveis. Isso levou ao desenvolvimento de alternativas como AMD (Asynchronous Module Definition) e, mais tarde, ao padrão ES Modules, que suporta carregamento assíncrono e é agora suportado por navegadores modernos e Node.js.

Em resumo, CommonJS é fundamental para a modularização em Node.js, facilitando a organização do código, a manutenção e a escalabilidade das aplicações.

## Aula 2 - Criando um módulo para configurações do servidor:
Agora, para não ficar exaustivo, tais módulos podemos encontrar dentro do node_module se verificarmos nas biblioteca (lib). Uma delas no diretório ejs/lib.

Bom, vamos precisar criar um diretorio chamado "config", onde dentro dela, estara todas as configuracoes necessarias que vamos precisar para o lado do servidor

    let express = require('express');
    let app = express();
    app.set('view engine', 'ejs');

    module.exports = app;

E no arquivo, app.js, realizamos a seguinte mudanca

    let app = require('./config/server');

    app.get('/', function(req, res) {
        res.render("home/index");
    });

    app.get('/formulario_inclusao_noticia', function(req, res) {
        res.render("admin/form_add_noticia");
    });

    app.get('/noticia', function(req, res) {
        res.render("noticias/noticias");
    });

    app.listen(3000, function(){
        console.log('Servidor ON');
    });

Ou seja, o que fizemos aqui, seria em transferir todas as configuracoes de servidor para o arquivo server.js. Assim, por diante, qualquer require que esteja ligado, diretamente com o server, iremos configurar dentro do arquivo, server.js.

## Aula 3 - Reestruturando a aplicação e criando um módulo para definição das rotas:
Vamos modularizar um pouco mais as nossas aplicações, para a melhor organização. 

Para isso, vamos criar um diretório app e dentro dela mover o diretório view.

O diretorio app sera onde ficara o nosso codigo de aplicacao e o diretorio, config, sera onde ficara o nosso codigo de configuracao de servidor.

Além disso, dentro do diretório app, vamos criar o outro diretório routes.

Daí, dentro do diretório routes vamos criar três arquivos .js que representam as respectivas rotas de cada página, form_inclusao_noticia.js, home.js e noticias.js.

Dai, para cada arquivo do routes que foi criado, vamos enviar as paths de cada trecho do arquivo app.js, como seguinte

Para form_inclusao_noticia.js

    module.exports = function(app){
        app.get('/formulario_inclusao_noticia', function(req,res){
            res.render('admin/form_add_noticia');
        });
    }

Para home.js

    module.exports = function(app){
        app.get('/', function(req,res){
            res.render('home/index');
        });
    }

Para noticias.js

    module.exports = function(app){
        app.get('/noticias', function(req,res){
            res.render('noticias/noticias');
        });
    }

Feito isso, no arquivo, app.js, vamos precisar realizar as seguintes requires

    let app = require('./config/server');

    let rotaNoticias = require('./app/routes/noticias')(app);

    let rotaHome = require('./app/routes/home')(app);

    let rotaFormInclusaoNoticia = require('./app/routes/form_inclusao_noticia')(app);

    app.listen(3000, function(){
        console.log('Servidor ON');
    });

Após feito isso, vamos precisar apontar os respectivos caminhos que foram feito. E tal caminho vamos configurar no server.js.

    let express = require('express');
    let app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    module.exports = app;

Note que, na configuração dentro do server.js, temos que configurar como se estivessemos no app.js, então os níveis das paths precisam ser levadas em consideração ao app.js e não o arquivo server.js, app.set('views', './app/views');

Para os arquivos .js que foram criado dentro do routes, precisamos exportar o módulo para que seja possível importar o mesmo no app.js, como podemos ver pelas variáveis que referencia as rotas que criadas, var rotaNoticias = require('./app/routes/noticias');

Bastaria rodar nodemon app para verificar na porta indicada do localhost para verificar que as rotas funcionam perfeitamente.