# Seção 8 - Recebendo dados de formulários com Body-parser:
## Aula 1 - Criando um formulário de cadastro de notícias:
Vamos apenas criar um formulário que vai permitir um envio de dados ao servidor. No caso, o arquivo que vamos usar é o formulario_inclusao_noticia.ejs.

    <form action="/noticias/salvar" method="post">
        <label>Título</label>
        <input type="text" id="titulo" name="titulo" placeholder="Título da notícia" />
        <br/>
        <label>Notícia</label>
        <textarea id="noticia" name="noticia" rows="5" cols="30"></textarea>
        <br/>
        <input type="submit" value="Enviar"/>
    </form>

## Aula 2 - Extra - Resolvendo conflitos de encoding:
Vamos ajustar alguns problemas de encoding. Bastaria ir no

    Code -> Preferences -> Settings -> Command + f

e procurar pela palavra encoding.

## Aula 3 - Extra - Resolvendo conflitos de encoding [SUBLIME TEXT 3]:
Extra - Resolvendo conflitos de encoding [SUBLIME TEXT 3]
Para configurar o encoding no Sublime Text 3  abra o menu "Preferences / Settings" conforme imagem abaixo:

Repare que as preferências do Sublime Text 3 agora estão separadas entre as configurações default (quadrante esquerdo) e as configurações do usuário (quadrante direito).

As configurações default (quadrante esquerdo) podem ser vistas, mas não podem ser modificadas. Para modificar um comportamento default do Sublime Text 3 você precisará aplicar essa modificação nas configurações do usuário (quadrante direito), para fazer isso basta informar o JSON com os valores atualizados separados por vírgura conforme imagem acima.

*Basicamente falando, as preferências do usuário sobrescrevem as preferências default do Sublime Text 3.

Bons estudos.

## Aula 4 - Recebendo dados de formulários via POST com Body-parser:
Vamos querer submeter os textos do formulario_inclusao_noticia.js. No caso, vamos renomear esse arquivo para admin.js e daí criamos uma outra rota dentro desse arquivo.

    app.post('/noticias/salvar', function(req, res) {
        res.send('Chegou na pagina');
    });
    E moldamos para
    app.post('/noticias/salvar', function(req, res) {
        var noticias = req.body;
        res.send(noticias);
    });

Mas para que a forma como requisitamos o body acima funciona, precisamos que esteja instalado o body-parser.

Instalando o body-parser
    
    npm install body-parser --save

Para conferir se foi ou não instalado, bastaria verificar no package.json e no node_module.

Assim, precisamos parametrizar o body-parser no express. Para isso, precisamos ir no arquivo server.js e realizar a implementação.

Lembrando, o body-parser é um tipo de middleware, então ela precisa ficar entre o express e o consign para poder realizar a implementação.

    var express = require('express');
    var consign = require('consign');
    var bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));

    consign()
        .include('app/routes')
        .then('config/dbConnection.js')
        .then('app/models')
        .into(app);

    module.exports = app;

## Aula 5 - Inserindo registros no banco de dados MySQL:
No caso, vamos inserindo registros no banco de dados MySQL. No caso, no admin.js, na rota noticias/salvar, será necessário recuperar a conexão.

Além disso, vamos criar uma nova conexão chamada salarNoticia no arquivo noticiasModel.js, onde, no arquivo admin.js, vamos chamar.

    this.salvarNoticia = function(noticia, connection, callback) {
        // Note que, a forma como fazemos o insert aqui é diferente com o que fizemos pelo terminal.
        // Neste caso é fundamental que o JSON possua como rotulo das variáveis o mesmo nome que as colunas da tabela.
        connection.query('insert into noticias set ? ', noticia, callback)
    }
    app.post('/noticias/salvar', function(req, res) {
    var noticia = req.body;
    // res.send('Chegou na pagina');
    // res.send(noticias);

    // conexao
    // model

    // salvarNoticia
    var connection = app.config.dbConnection();
    var noticiasModel = app.app.models.noticiasModel;

    noticiasModel.salvarNoticia(noticia, connection, function(error, result) {
            res.render("noticias/noticias", {noticias: result});  // Basicamente, essa condição vai nos permitir acessar as informações dos arrays pelo arquivo .ejs correspondente dessa rota.
        });
    });

Após isso, podemos visitar a tela formulario_inclusao_noticia e nela add noticia, mas, não será identificado a adição, mas mesmo assim a notícia terá sido incluído direito.

Bastaria conferir isso visitando o banco de dados MySQL.

No caso, faltaria ajustar o /noticias/salvar. Resolvemos isso, colocando o redirect.

    noticiasModel.salvarNoticia(noticia, connection, function(error, result) {
        // res.render("noticias/noticias", {noticias: result});  // Basicamente, essa condição vai nos permitir acessar as informações dos arrays pelo arquivo .ejs correspondente dessa rota.
        res.redirect('/noticias');
    });
    
O redirect acima serve para quando vc fazer um refresh da página, não correr o risco de inserir a mesma informação novamente.