# Seção 11 - Implementando controllers e entendendo o designer pattern MVC:
## Aula 1 - Implementando controllers:
Vamos implementar os controllers para melhor arquitetura da nossa aplicação.
No momento, quem está fazendo o papel de controller são as rotas.

Por início, vamos olhar para os dois arquivos noticia.js e noticias.js e passar o conteúdo de noticia.js dentro de noticias.js.

Isso faz sentido, pois no subdiretório noticias do diretório view se encontram dois arquivos noticia.ejs e noticias.ejs.

Daí o arquivo noticia.js podemos excluir.

Agora, vamos implementar o nosso controller.

No caso, dentro do diretório app vamos criar um novo diretório controllers.

Dentro do diretório controllers, criamos mais um arquivo chamado admin.js.

Agora, em parelelo com o arquivo admin.js que está dentro da pasta routes, vamos indo criar os controllers.

Daí, no arquivo server.js precisamos dizer que os arquivos do routes estão implementandos as funcionalidades de controllers, com ajuda de consign.

    consign()
        .include('app/routes')
        .then('config/dbConnection.js')
        .then('app/models')
        .then('app/controllers')
        .into(app);
    
E dentro do admin.js do diretório routes colocamos a aplicação que fizemos no controllers.

    app.get('/formulario_inclusao_noticia', function(req, res) {
        // res.render('admin/form_add_noticia', {validacao: {}, noticia: {} });
        app.app.controllers.admin.formulario_inclusao_noticia(app, req, res);
    });

A princípio, parece que colocamos mais códigos comparado ao formato como estava antes.

Mas, seguindo a mesma implementação feita acima, vamos fazer para a tela "noticias/salvar" para verificarmos como vai ficar.

Assim, em admin.js do controllers resultará.

    module.exports.formulario_inclusao_noticia = function(app, req, res) {
        res.render('admin/form_add_noticia', {validacao: {}, noticia: {} });
    }

    module.exports.noticias_salvar = function(app, req, res) {
        var noticia = req.body;
        // res.send('Chegou na pagina');
        // res.send(noticias);

        // conexao
        // model

        // Utilizando os recursos do express validator para validação
        req.assert('titulo', 'Título é obrigatório').notEmpty();
        req.assert('resumo', 'Resumo é obrigatório').notEmpty();
        req.assert('resumo', 'Resumo deve conter entre 10 à 100 caracteres.').len(10, 100);
        req.assert('autor', 'Autor é obrigatório').notEmpty();
        req.assert('data_noticia', 'Data é obrigatório').notEmpty().isDate({form: 'YYYY-MM-DD'});
        req.assert('noticia', 'Noticia é obrigatório').notEmpty();

        // Como fazer um teste de validação
        var erros = req.validationErrors();

        // console.log(erros);

        if (erros) {
            res.render("admin/form_add_noticia", { validacao: erros, noticia: noticia });
            // O fato de dar um return eu faço parar completamente o processo.
            return;
        }

        // salvarNoticia
        var connection = app.config.dbConnection();
        // var noticiasModel = app.app.models.noticiasModel;
        var noticiasModel = new app.app.models.NoticiasDAO(connection);

        // noticiasModel.salvarNoticia(noticia, connection, function(error, result) {
        //     // res.render("noticias/noticias", {noticias: result});  // Basicamente, essa condição vai nos permitir acessar as informações dos arrays pelo arquivo .ejs correspondente dessa rota.
        //     res.redirect('/noticias');
        // });

        noticiasModel.salvarNoticia(noticia, function(error, result) {
            // res.render("noticias/noticias", {noticias: result});  // Basicamente, essa condição vai nos permitir acessar as informações dos arrays pelo arquivo .ejs correspondente dessa rota.
            res.redirect('/noticias');
        });
    }

E no arquivo admin.js do routes resultará no seguinte.

    module.exports = function (app) {
        app.get('/formulario_inclusao_noticia', function(req, res) {
            // res.render('admin/form_add_noticia', {validacao: {}, noticia: {} });
            app.app.controllers.admin.formulario_inclusao_noticia(app, req, res);
        });

        // Esse código aqui não vai funcionar pois ele está na requisição get, sendo que foi definido, pelo form_add_noticia.ejs em form, uma requisição via post.
        // app.get('/noticias/salvar', function(req, res) {
        //     res.send('Chegou na pagina');
        // });

        app.post('/noticias/salvar', function(req, res) {
            app.app.controllers.admin.noticias_salvar(app, req, res);
        });
    };

Feito essa mudança, note que, tudo ainda estará funcionando normalmente.

A mesma lógica podemos implementar para outros arquivos .js que estão no routes.

No caso, iremos fazer isso para noticias.js e home.js
Veremos que mesmo assim, tudo continua funcionando normalmente.

## Aula 2 - Designer pattern Model-View-Controller (MVC):
Conteúdos para leitura:

    https://www.geeksforgeeks.org/mvc-design-pattern/

    http://www.linhadecodigo.com.br/artigo/2367/abordando-a-arquitetura-mvc-e-design-patterns-observer-composite-strategy.aspx

    https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller

## Aula 3 - Opcional - Download dos arquivos portal de notícias:
Opcional - Download dos arquivos portal de notícias.

Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos parciais do projeto portal de notícias no estado em que se encontram até a aula anterior.

Bons estudos ;)