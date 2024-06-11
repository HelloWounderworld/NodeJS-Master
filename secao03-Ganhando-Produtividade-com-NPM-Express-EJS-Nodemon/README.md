# Seção 3 - Ganhando produtividade com o NPM, Express, EJS e Nodemon:
## Aula 1 - Visão geral do NPM, Express, EJS e Nodemon - Iniciando o NPM em nosso projeto:      
Ao baixar o node, o npm já vem incluso, para verificar isso bastaria digitar
    
    npm -v 

para verificar a sua versão instalada.

Para iniciarmos o npm, precisamos ir no terminal e colocar o comando 

    npm init
    
Ao realizarmos isso e preenchendo as resquições que lhe são solicitadas, no final, será criado um arquivo chamado package.json.

No package.json que for gerado, no elemento "main" trocamos o "index.js" para "noticias.js" e deixamos esse arquivo no mesmo nivel do package.json.

- express: Um framework NodeJS para aplicacoes WEB

- EJS: Uma linguagem de modelagem para criacao de paginas HTML utilizando JavaScript

- Nodemon: Um utilitario que reinicia automaticamente o servidor NodeJS quando houver qualquer alteracao em nossos scripts

- npm: Um gerenciador de pacotes JavaScript

Irei criar um repositorio independente desse repositorio em que estou utilizando. Considere esse repositorio, apenas para conseguirmos realizar alguns testes ou mostrar alguns codigos e explica-los melhor e anotacoes de aulas.

Iremos seguir com o seguinte repositorio abaixo para darmos o comando npm init. 

    https://github.com/HelloWounderworld/curso-nodejs

Obs: Cada estudante pode criar o seu proprio repositorio para realizar os mesmos passo a passo para iniciarmos os estudos

Feito a criacao, entramos no repositorio pelo terminal e colocamos o comando

    npm init

sera mostrado a seguinte tela

    This utility will walk you through creating a package.json file.
    It only covers the most common items, and tries to guess sensible defaults.

    See `npm help init` for definitive documentation on these fields
    and exactly what they do.

    Use `npm install <pkg>` afterwards to install a package and
    save it as a dependency in the package.json file.

    Press ^C at any time to quit.
    package name: (curso-nodejs)

Colocamos o nome

    portal_noticias

Na versao, apenas damos o enter para considerar a versao padrao que ele sugere

    version: (1.0.0)

Na descricao, colocamos "Site de Noticias" e damos o enter

    description: Site de Noticias

No entry point: (index.js), deixamos como o padrao tbm e damos o enter.

E vamos dando o enter ate chegarmos em author, onde vc colocara o seu nome e dara o enter

Em license: (ISC) deixamos como o padrao e, por fim, em "Is this Ok? (yes)" digitamos "yes" e damos o enter.

Isso ira criar o package.json no seu repositorio e, com isso, conseguimos dar o nosso primeiro passo para iniciarmos com o nosso projeto.

## Aula 2 - Iniciando o NPM em nosso projeto:
Agora, vamos instalar o Express usando o npm. No caso, podemos jogar no terminal

    npm install express --save

A verdade é que podemos digitar somente o

    npm install express

mas o motivos de colocarmos o '--save' está no fato de que podemos trazer os arquivos instalados dentro da nossa máquina, vide o node_modules e o package-lock.json que apareceu quando colocamos o tal comando no terminal.

As boas práticas sugerem que tais comandos para que fizemos acima para criarmos o package.json e o node_module sejam feitas dentro do diretório projeto seu.

## Aula 3 - NPM - Instalando o Express:
No caso, com o express já instalado precisamos fazer uma refatoração do projeto. No caso, no arquivo app.js precisamos fazer require do express.

Criamos o arquivo, app.js, e nela colocamos o seguinte

    let express = require('express');
    let app = express();

    app.listen(3000, function(){
        console.log("Servidor rodando com express!");
    });

Agora, basta rodar o comando pelo terminal

    node app.js

que isso ira rodar o express.

Bom, vamos precisar informar, ao app.js, as configuracoes de noticias que foi implementadas nela.

Entao, no arquivo app.js realizamos o seguinte 

    app.get('/', function(req, res) {
        res.send("<html><body>Portal de noticias</body></html>");
    });

No caso, o codigo inteiro ficaria

    let express = require('express');
    let app = express();

    app.get('/', function(req, res) {
        res.send("<html><body>Portal de noticias</body></html>");
    });

    app.listen(3000, function(){
        console.log("Servidor rodando com express!");
    });

As funcoes que vem dentro dos metodos sao chamadas de funcoes de call-back. 

Ao rodarmos o app.js pelo terminal e analisarmos o localhost:3000 conseguirmos, agora, acessar as paths de forma mais direta e a construcao do codigo em si, com o express, fica mais simples, comparado ao arquivo noticias.js.

## Aula 4 - Refactoring do projeto prático portal de notícias com Express:
Agora, instalamos o EJS usando o npm. No caso, esse recurso vai nos permitir escrever páginas html juntamente com instruções do JavaScript.

Basta colocar o comando pelo terminal acessado o seu diretório projeto

    npm install ejs --save

Depois disso podemos ver que o ejs está disponível dentro de node_modules.

Agora, precisamos ir no arquivo app.js e informar para o express que foi implementado um novo recurso ejs e que será trabalhado em conjunto com o express.

Para melhor organização vamos criar um diretório novo chamado views e dentro dele colocar arquivos htmls e chamar-las no app.js.

## Aula 5 - NPM - Instalando o EJS - Download das views do projeto prático portal de notícias - Refactoring do projeto prático portal de notícias com EJS:
Depois que instalamos o recurso ejs vamos refatorar o nosso código. Vamos substituir pelo diretório view que foi baixado que já tem os ejs prontos. E realizar as devidas modificações no app.js que considere tais refatorações.
Utilize o link disponibilizado como recurso dessa aula para fazer o download das views do projeto prático portal de notícias.

Bons estudos ;)

Recursos

## Aula 6 - NPM - Instalando e testando o Nodemon:
Agora, vamos instalar e testar o Nodemon usando o npm. No caso, ele servirá para que a cada alteração que realizamos no nosso projeto que ele seja renderizado sem a necessidade manula de ter quer parar a renderização para depois renderizar novamente o nosso projeto pelo terminal.

Para a instalação basta rodar o comando pelo diretório projeto

    npm install -g nodemon

Assim, em seguida, rode o comando nodemon (nome do arquivo sem a extensão), nodemon app.

Dessa forma, qualquer alteração que ocorrer no seu script, o nodemon captará automaticamente e será feito o restart automático.