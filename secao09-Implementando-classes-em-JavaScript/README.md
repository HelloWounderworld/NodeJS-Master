# Seção 9 - Implementando classes em JavaScript:
## Aula 1 - Classes convencionais x classes JavaScript:
Vamos aprender a implementar uma classe em JavaScript, assim como eu havia aprendido isso em python. Ou seja, é uma orientacão à objetos.

Se quiser aprofundar mais ainda na ideia da orientação à objetos, bastaria ler sobre teoria de categoria e/ou revisar sobre POO do curso python que eu fiz!

No caso, em JS, o formato de classe tem de dois tipos. A de protótipo e a forma clássica similar o que foi visto em python.

## Aula 2 - Refactoring do projeto prático portal de notícias - implementando classes:
Vamos aplicar o conceito de classes para manipular as informações do banco de dados.

No caso, em noticiasModel.js faremos essa mudança.

    function Noticias() {

    }

    Noticias.prototype.getNoticias = function(connection, callback) {
        connection.query('select * from noticias', callback);
    }

    Noticias.prototype.getNoticia = function(connection, callback) {
        connection.query('select * from noticias where id_noticia = 2', callback);
    }

    Noticias.prototype.salvarNoticia = function (noticia, connection, callback) {
        connection.query('insert into noticias set ? ', noticia, callback);
    }

    module.exports = function() {

        // this.getNoticias = function(connection, callback) {
        //     connection.query('select * from noticias', callback);
        // }

        // this.getNoticia = function(connection, callback) {
        //     connection.query('select * from noticias where id_noticias = 2', callback);
        // }

        // this.salvarNoticia = function(noticia, connection, callback) {
        //     // Note que, a forma como fazemos o insert aqui é diferente com o que fizemos pelo terminal.
        //     // Neste caso é fundamental que o JSON possua como rotulo das variáveis o mesmo nome que as colunas da tabela.
        //     connection.query('insert into noticias set ? ', noticia, callback)
        // }

        // return this;
        return Noticias;
    }

Depois disso, no arquivo noticias.js e admin.ja na variável noticiasModel e /noticias/salvar, respectivamente, iremos colocar o operador new.

    var noticiasModel = new app.app.models.noticiasModel;
    var noticiasModel = new app.app.models.noticiasModel;

Note que, com tais modificações mesmo assim as telas continuam funcionando corretamente.

Além disso, podemos deixar o código do noticiasModel.js de forma mais clean. Por exemplo, a variável connection que toda hora é chamado em cada prototype.

Em vez de fazer isso, podemos definir uma única vez dentro da função Noticias e depois apenas os chamá-las em cada prototype que vc queira usar.

    function Noticias(connection) {
        this._connection = connection;
    }

    Noticias.prototype.getNoticias = function(callback) {
        this._connection.query('select * from noticias', callback);
    }

    Noticias.prototype.getNoticia = function(callback) {
        this._connection.query('select * from noticias where id_noticia = 2', callback);
    }

    Noticias.prototype.salvarNoticia = function (noticia, callback) {
        this._connection.query('insert into noticias set ? ', noticia, callback);
    }

    module.exports = function() {

        // this.getNoticias = function(connection, callback) {
        //     connection.query('select * from noticias', callback);
        // }

        // this.getNoticia = function(connection, callback) {
        //     connection.query('select * from noticias where id_noticias = 2', callback);
        // }

        // this.salvarNoticia = function(noticia, connection, callback) {
        //     // Note que, a forma como fazemos o insert aqui é diferente com o que fizemos pelo terminal.
        //     // Neste caso é fundamental que o JSON possua como rotulo das variáveis o mesmo nome que as colunas da tabela.
        //     connection.query('insert into noticias set ? ', noticia, callback)
        // }

        // return this;
        return Noticias;
    }

Feito a mudaça acima, vamos precisar mudar tbm para o arquivo noticias.js e admin.js a forma como está sendo feito a connection.

    var noticiasModel = new app.app.models.noticiasModel(connection);
    var noticiasModel = new app.app.models.noticiasModel(connection);

Além disso, precisaria tirar a variável connection em cada função abaixo:

    noticiasModel.getNoticias(function(error, result) {
        res.render("noticias/noticias", {noticias: result});  // Basicamente, essa condição vai nos permitir acessar as informações dos arrays pelo arquivo .ejs correspondente dessa rota.
    });

    noticiasModel.salvarNoticia(noticia, function(error, result) {
        // res.render("noticias/noticias", {noticias: result});  // Basicamente, essa condição vai nos permitir acessar as informações dos arrays pelo arquivo .ejs correspondente dessa rota.
        res.redirect('/noticias');
    });

Analogamente, no arquivo noticia.js.

Podemos ver com isso que tudo continua funcionando corretamente.

Vamos mudar o nome do aquivo noticiasModel.js para NoticiasDAO.js.

Com isso, vamos ter que mudar para cada arquivo que chamamos esse arquivo.

    function NoticiasDAO(connection) {
        this._connection = connection;
    }

    NoticiasDAO.prototype.getNoticias = function(callback) {
        this._connection.query('select * from noticias', callback);
    }

    NoticiasDAO.prototype.getNoticia = function(callback) {
        this._connection.query('select * from noticias where id_noticia = 2', callback);
    }

    NoticiasDAO.prototype.salvarNoticia = function (noticia, callback) {
        this._connection.query('insert into noticias set ? ', noticia, callback);
    }

    module.exports = function() {

        // this.getNoticias = function(connection, callback) {
        //     connection.query('select * from noticias', callback);
        // }

        // this.getNoticia = function(connection, callback) {
        //     connection.query('select * from noticias where id_noticias = 2', callback);
        // }

        // this.salvarNoticia = function(noticia, connection, callback) {
        //     // Note que, a forma como fazemos o insert aqui é diferente com o que fizemos pelo terminal.
        //     // Neste caso é fundamental que o JSON possua como rotulo das variáveis o mesmo nome que as colunas da tabela.
        //     connection.query('insert into noticias set ? ', noticia, callback)
        // }

        // return this;
        return NoticiasDAO;
    }
