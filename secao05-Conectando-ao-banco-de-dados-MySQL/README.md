# Seção 5 - Conectando ao banco de dados MySQL:

## Aula 1 - NPM - Instalando o modulo de conexão do MySQL:
Vamos agora trabalhar com um banco de dados. No caso, existem vários bancos de dados. Para essa aula, vamos usar o MySQL. 

No caso, vamos precisar instalar o MySQL jogando no terminal 

    npm install mysql --save

Feito a instalação acima, podemos ver que no node_modules vai aparecer um diretório mysql que indica que temos recursos para conseguirmos estabelecer a conexão com o banco de dados MySQL.

# Aula 2 - Extra - Instalando o banco de dados MySQL:
Agora, vamos verificar se temos ou não o banco de dados MySQL instalado no computador, pois mesmo realizando a instalação dos recursos que permitem a conexão com o banco de dados no processo anterior, nada de adianta se não tivermos um banco de dados do tipo para o uso.

    https://www.mysql.com/ -> MySQL Community (GPL) Downloads　-> MySQL Installer for Windows -> Windows (x86, 32-bit), MSI Installer

Será necessário criar um cadastro de usuário no site do mysql.

As instruções de instalação acima, servem para Windows, então para o Mac será um outro pacote. 

    https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/osx-installation-pkg.html

ou

    https://dev.mysql.com/downloads/mysql/

### Importante: 

Durante a instalação, na etapa de configuração, marque a opção "Use Legacy Password Encryption".

## Aula 3 - Extra - Instalando o banco de dados MySQL no OSX (Mac) - Criando e populando o banco de dados do projeto prático portal de notícias:
Agora, instalado o MySql no seu computador, vamos rodar ela. Para o Windows existem uma série de quesitos que precisam ser satisfeitas para a sua execução. No caso, precisaria entrar até a pasta bin onde está localizado o mysql.exec, tudo pelo terminal, e, finalmente, rodar o comando 

    mysql -u root -p

No Linux ou Mac, bastaria, após o mysql instalado, rodar o seguinte comando pelo terminal

    sudo mysql -u root -p
ou

    mysql -u -root -p

Agora, rodando o mysql vamos verificar quais tipos de bancos de dados nela já possui.

Bastaria colocar o comando 

    show databases;

Podemos criar um banco de dados tbm usando o comando

    create database (nome do banco de dados que vc pode denotar);

Agora, para acessar o banco de dados que vc queira bastaria colocar o comando

    use (nome do banco de dados existente)

Dentro do banco de dados, podemos criar tabelas.

Para constar, ao colocarmos o comando

    show tables;

mostrará que está vazio.

Assim, para criar uma tabela podemos digitar

    create table (nome da tabela que vc quer criar)<
    
e isso aparecerá um 

    ->

Nela vc coloca os elementos que vão para a tabela, um exemplo,

    id_noticias int not null primary key auto_increment,

Na próxima linha podemos colocar

    titulo varchar<100>,

Na terceira linha colocar

    noticia text,

E na quarta, e última, colocamos

    data_criacao timestamp default current_timestamp>;
    
onde finalmente fechamos o ">" que foi iniciado no começo.

Obs: Aqui foi usado "<" e ">" para representar os parentes. Mas isso só vale no windows. Para o Linux precisa ser "(" e ")".

Agora, selecionando uma linha criada 

    select * from noticias;
    
vamos ver que essa linha está vazia.

Assim, para colocar alguma informação precisamos colocar

    insert into noticias(titulo, noticias)values('titulo da noticia', 'conteudo da noticia');

Novamente, colocar

    select * from noticias;

para verificar o que tem dentro de noticias, vamos poder ver que há um registro que foi coloado acima.

## Aula 4 - Criando a conexão com o MySQL e recuperando dados:
Nessa aula, vamos criar conexão com o banco de dados MySql e de lá realizar a requisição das informações que registramos nela.

Antes de tudo, precisamos ver se já temos o módulo de mysql instalado no node_modules.

Agora, no arquivo noticias.js vamos fazer a requisição do banco de dados mysql por lá.

    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'portal_noticias'
    });

    connection.query('select * from noticias',function(error, result) {
        res.send(result);
    });

No caso, acima seriam os parâmetros que precisamos para estabelecermos a conexão com o banco de dados MySql e conseguirmos realizar a requisição precisa das informações que consta no banco de dados.

## Aula 5 - EJS - Criando views dinâmicas com JavaScript:
Agora, vamos criar os views dinâmicas com JavaScript. No caso, no arquivo noticias.js vamos colocar um código res.render, onde ela permite que o arquivo que corresponde a rota definida pelo arquivo noticias.js, consiga acessar e manipular as informações requisitadas pelo banco de dados.

No caso, o arquivo correspondente é o noticias.ejs e nela, pela tag table, iremos mostrar tais informações que foram requisitadas.

## Aula 6 - Refactoring do método de conexão com o banco de dados MySQL:
Agora, vamos fazer uma refatoração do método de conexão com o banco de dados MySQL.

No caso, note que, a requisição feita para o banco de dados MySQL foi feito isoladamente dentro do arquivo noticias.js.

Entretanto, essa conexão com o banco de dados, quando vista para um projeto gigante, não é eficiente, pois sempre que criarmos uma rota será necessário criar uma conexão com o banco de dados.

No caso, seria mais fácil que somente um arquivo realize a tal conexão com o banco de dados e, nas rotas criadas, chamarmos a conexão sempre que for necessário. Assim, caso o banco de dados acabar indo de local para nuvem, bastaria mudar essa configuração nesse arquivo onde estabelece essa conexão e assim as rotas que chamam a conexão para realizar a tal requisição não será necessário realizar nenhuma alteração. Todas elas estarão vendo na mesma conexão da nuvem.

O arquivo que será feito isso, estará dentro da pasta config com o nome dbConnection.js. E no arquivo noticias.js iremos pegar a linha

    var mysql = require('mysql');
            
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database: 'portal_noticias'
    });

que é o que estabelece a conexão com o banco de dados MySQL e iremos transferir para esse arquivo dbConnection.js.

Por fim, no arquivo noticias.js iremos chamar esse arquivo dbConnection pelo require.