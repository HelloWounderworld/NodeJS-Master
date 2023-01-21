# Seção 12 - Utilizando recursos estáticos como imagens, arquivos de estilo e scripts:
## Aula 1 - Download de HTMLs e assets do projeto prático portal de notícias:
Download de HTMLs e assets do projeto prático portal de notícias
Utilize o link disponibilizado como recurso dessa aula para fazer o download dos arquivos HTMLs e assets para darmos continuidade ao desenvolvimento do projeto prático portal de notícias.

Bons estudos ;)

## Aula 2 - Incluindo recursos estáticos:
Primeiro:

    - Criamos um novo diretório, dentro do diretório app, com o nome public.
    Dentro desse diretório, colocamos as pastas css, image e js, do arquivo portal_noticias_html_e_assets.

Segundo:

    - Pegamos o arquivo index.html, da pasta portal_noticias_html_e_assets, e copiamos todos os conteúdos dela e sobrescrevemos o conteúdo do arquivo index.ejs que está no diretório home.

Terceiro:

    - No server.js vamos mapear os arquivos necessários em que aparece como erro no console da página home.

        app.use(express.static('./app/public'));

Quarto:

    - Pegamos o arquivo form_add_noticia.ejs que está no diretório admin e nela sobrescrevemos com todos os conteúdos do arquivo formulario_inclusao_noticia.html da pasta portal_noticias_html_e_assets.
    A mesma coisa faremos para os dois arquivos notícias.ejs e noticia.ejs.

Assim, teminamos as refatorações necessárias da contruição de todo o visual.

## Aula 3 - Reaplicando a lógica de back-end - parte 1:
Vamos aplicar toda a regra de back-end que aprendemos até agora para esse novo layout do nosso projeto.

No caso, no arquivo home.js, vamos criar uma conexão que precisamos

    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection);

    noticiasModel.get5UltimasNoticias(function(error, result) {
        console.log(result);
        res.render("home/index", {noticias: result});
    });

    Assim, em NoticiasDAO definimos o protótipo get5UltimasNoticias.
    NoticiasDAO.prototype.get5UltimasNoticias = function (callback) {
        this._connection.query('select * from noticias order by data_criacao desc limit 5', callback);
    }

Agora, no arquivo index.ejs, vamos identar o código js dentro do html chamando as alterações que fizemos acima.

    <div class="row">
        <div class="col-md-8">
            <div class="noticia_wrapper">
                <span class="noticia_autor"><%= noticias[0].autor %></span>
                <a href="noticia.html" class="noticia_titulo"><%= noticias[0].titulo %></a>
                <span class="noticia_data"><%= noticias[0].data_noticia %></span>
                <br />
                <p class="noticia_resumo">
                    <%= noticias[0].resumo %>
                </p>
            </div>
        </div>

        <div class="col-md-4">
            <div class="noticia_wrapper">
                <span class="noticia_autor"><%= noticias[1].autor %></span>
                <a href="noticia.html" class="noticia_titulo">"><%= noticias[1].titulo %></a>
                <span class="noticia_data"><%= noticias[1].data_noticia %></span>

                <br />
                <p class="noticia_resumo">
                    <%= noticias[1].resumo %>
                </p>
            </div>
        </div>
    </div>

    <div class="row">
        <% for(var i = 2; i < noticias.length; i++) { %>
            <div class="col-md-4">
                <div class="noticia_wrapper">
                    <span class="noticia_autor"><%= noticias[i].autor %></span>
                    <a href="noticia.html" class="noticia_titulo"><%= noticias[i].noticia %></a>
                    <span class="noticia_data"><%= noticias[i].data_noticia %></span>
                    <br />
                    <p class="noticia_resumo">
                        <%= noticias[i].resumo %>
                    </p>
                </div>
            </div>
        <% } %> 
    </div>

## Aula 4 - Reaplicando a lógica de back-end - parte 2:
Vamos agora trabalhar com o formulario_inclusao_noticia.

No caso, o arquivo form_add_noticia.ejs vamos precisar colocar o action no form.

    <form action="/noticias/salvar" method="post">

Só para conseguirmos linkar com a rota definido no admin.js do routes.

Novamente, vamos colocar as condicionais do expressValidator para avisar o que precisa ser ou não preenchido corretamente no formulario_inclusao_noticia.

Então, no arquivo form_add_noticia.ejs.

    <% if (validacao.length > 0) { %>
        <div class="row">
            <div class="col-md-12">
                <div class="alert alert-danger">
                    <strong>Atenção!</strong>
                    <ul>
                        <% for(var i = 0; i < validacao.length; i++) { %>
                            <li><%= validacao[i].msg %></li>
                        <% } %>
                    </ul>
                </div>
            </div>
        </div>
    <% } %>

## Aula 5 - Reaplicando a lógica de back-end - parte 3:
No caso, vamos implementar o que precisa vir em noticias.ejs.

    <div class="container">
        <% if(noticias.length > 0) { %>
            <% for(var i = 0; i < noticias.length; i++) { %>
                <div class="row">
                    <div class="col-md-12">
                        <div class="noticia_wrapper">
                            <span class="noticia_autor"><%= noticias[i].autor %></span>
                            <a href="noticia.html" class="noticia_titulo"><%= noticias[i].titulo %></a>
                            <span class="noticia_data"><%= noticias[i].data_noticia %></span>
                            <br />
                            <p class="noticia_resumo">
                                <%= noticias[i].resumo %>
                            </p>
                        </div>
                    </div>
                </div>
            <% } %>
        <% } %>
    </div>

Além disso, note que, ao visitarmos a tela /noticias, a ordem de exibição delas estarão em ordem crescente. Precisamos colocar em ordem decrescente e para isso precisamos alterar o protótipo getNoticias do NoticiasDAO.js.

    NoticiasDAO.prototype.getNoticias = function(callback) {
        this._connection.query('select * from noticias order by data_criacao desc', callback);
    }

Além disso, note que, na tela /noticias em cada tabela de exibição está sendo possível clicar nelas para serem direcionadas na página noticia.html.

Entretanto, no formato como está agora não será possível isso, pois no momento está fixa. Na próxima aula vamos dinamiza-los.

Mas, por hora, no arquivo noticias.ejs, bastaria apagar o .html no href.

    <a href="noticia" class="noticia_titulo"><%= noticias[i].titulo %></a>

O mesmo para noticias.html, do index.ejs.

Agora, no arquivo noticia.ejs, por hora, vamos fazer o seguinte.

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="noticia_wrapper">
                    <span class="noticia_autor"><%= noticia[0].autor %></span>
                    <a href="noticia/1" class="noticia_titulo"><%= noticia[0].titulo %></a>
                    <span class="noticia_data"><%= noticia[0].data_noticia %></span>
                    <br />
                    <p class="noticia_resumo">
                        <%= noticia[0].resumo %>
                    </p>
                </div>
            </div>
        </div>
    </div>

## Aula 6 - Enviando e recebendo parâmetros (request.query):
Vamos customizar a tela noticias.ejs e index.ejs.

No index.ejs, vamos colocar a alteração seguinte:

    href="noticia?id_noticia=<%= noticias[0].id_noticias %>"

Faremos isso, analogamente, para outras tags do mesmo arquivo index.ejs.

Outra alteração que vamos fazer é no arquivo noticias.ejs, o mesmo que foi feito para o index.ejs acima.

    <div class="container">
        <% if(noticias.length > 0) { %>
            <% for(var i = 0; i < noticias.length; i++) { %>
                <div class="row">
                    <div class="col-md-12">
                        <div class="noticia_wrapper">
                            <span class="noticia_autor"><%= noticias[i].autor %></span>
                            <a href="noticia?id_noticia=<%= noticias[i].id_noticias %>" class="noticia_titulo"><%= noticias[i].titulo %></a>
                            <span class="noticia_data"><%= noticias[i].data_noticia %></span>
                            <br />
                            <p class="noticia_resumo">
                                <%= noticias[i].resumo %>
                            </p>
                        </div>
                    </div>
                </div>
            <% } %>
        <% } %>
    </div>

Além disso, no noticias.js que está no controller, vamos colocar o console.log no module.export.noticia para verificar o que está sendo devolvido na requisição/request (req).

Note que, no console.log, quando filtramos a busca do req pelo query, podemos ver que nela mostra exatamente o índice que é selecionado quando aparece no path.

Logo, com essa query, podemos mandar esse índice para a função getNoticia.

    var id_noticia = req.query;
    // console.log(req.query);

    noticiasModel.getNoticia(id_noticia, function(error, result) {
        res.render("noticias/noticia", {noticia: result});
    });

Agora, em NoticiasDAO.js, no protótipo getNoticia definido, podemos passar dentro dela o parâmetro id_noticia que foi definido.

    NoticiasDAO.prototype.getNoticia = function(id_noticia, callback) {
        console.log(id_noticia.id_noticia);
        this._connection.query('select * from noticias where id_noticias = ' + id_noticia.id_noticia, callback);
    }

Assim, tanto a tela de noticias quanto a tela de home estão ajustados.

## Aula 7 - Opcional - Download dos arquivos portal de notícias:
Opcional - Download dos arquivos portal de notícias

Utilize o link disponibilizado como recurso dessa aula para fazer o download do projeto portal de notícias completo.

Bons estudos ;)