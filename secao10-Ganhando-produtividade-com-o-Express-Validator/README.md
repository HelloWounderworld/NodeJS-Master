# Seção 10 - Ganhando produtividade com o Express Validator:
## Aula 1 - Introdução Express Validator:
Todo dado que é imputado no sistema, ela passa por uma validação de dados.
No caso, vamos usar o express validator, que é um middleware, que funciona exatamente para validar dados.

    https://programandosolucoes.dev.br/2020/11/10/valida-api-express-validator/

    https://www.freecodecamp.org/portuguese/news/como-simplificar-e-deixar-limpa-a-validacao-de-entrada-na-aplicacao-do-express-js/#:~:text=o%20express%2Dvalidator%20%C3%A9%20um,valida%C3%A7%C3%A3o%20e%20sanitiza%C3%A7%C3%A3o%20do%20validator

## Aula 2 - NPM- Instalando o Express Validator:
Vamos instalar o express validator.

No diretório projeto, bastaria colocar

    npm install express-validator --save

mas tome cuidado que essa instalação ela colocará a última versão do express-validator, ao ponto de executar a função dela, após o require, a sintaxe não corresponda ao modo clássico.

Por hora, para compatibilizar na modificação abaixo coloque
    
    npm install --save express-validator@3.2.0 -E

Agora, por ser um middleware, vamos precisar incluir ela  no server.js.

    var expressValidator = require('express-validator');
    app.use(expressValidator());

OBS: Por algum motivo, no nodemon, ele está mostrando que a forma de execução está inválida...

## Aula 3 - Refactoring do projeto prático portal de notícias com Express Validator:
Depois que adicionamos o express-validator, vamos refatorar o projeto.

Pelo terminal, depois que ativado a conexão com o banco de dados
    mysql -u root -p

vamos colocar mais alguns dados no banco de dados portal_noticias criado.

OBS: Eu estou usando o DBeaver para possibilitar tais alterações diretamente no banco de dados mysql.

Agora, vamos criar uma tabela que permita validação de mais informações.
No caso, apenas digite

    alter table noticias add column resumo varchar(100);
    
    alter table noticias add column autor varchar(30);
    
    alter table noticias add column data_noticia date;

Agora, vamos implementar os campos criados no formulário, form_add_noticia.ejs.

    <label>Resumo</label>
    <input type="text" id="resumo" name="resumo" placeholder="Resumo da notícia" />
    <br/>
    <label>Nome autor</label>
    <input type="text" id="autor" name="autor" placeholder="Autor da notícia" />
    <br/>
    <label>Data dos fatos</label>
    <input type="date" id="data_noticia" name="data_noticia" placeholder="Data da notícia" />
    <br/>

No arquivo NoticiasDAO.js, no prototype salvarNoticia, podemos colocar um console.log para verificar a noticia que é chamado, mais para verificar se não está acontecendo algum problema de conflito na hora do teste de inclusão.

    NoticiasDAO.prototype.salvarNoticia = function (noticia, callback) {
        console.log(noticia)
        this._connection.query('insert into noticias set ? ', noticia, callback);
    }

Depois que enviamos uma informação nova, "Estatística" valor add, então no arquivo admin.js e nela vamos nos aproveitar do recurso do express-validator.

    console.log(noticia)
    // Utilizando os recursos do express validator para validação
    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 à 100 caracteres.').len(10, 100);
    req.assert('autor', 'Autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'Data é obrigatório').notEmpty().isDate({form: 'YYYY-MM-DD'});
    req.assert('noticia', 'Noticia é obrigatório').notEmpty();

    // Como fazer um teste de validação
    var erros = req.validationErrors();

    if (erros) {
        res.render("admin/form_add_noticia");
        // O fato de dar um return eu faço parar completamente o processo.
        return;
    }

Agora, tenta testar não satisfazendo alguns dos critérios acima de validação e satisfazendo as validações acima.

O próximo passo é exibir os erros de validações quando a pessoa estiver preenchendo os dados.

## Aula 4 - Exibindo erros de validação com express-validator:
Vamos aprender a pegar as infomações de validações e exibi-las para o usuário que estiver preenchendo o campo das informações.

Inicialmente, no arquivo admin.js, vamos colocar

    console.log(erros);

para verificar que tipo de erro é exibido pelo console.

Lembrando que o nodemon tbm exibi o console.log.

Note que, na tela formulario_inclusao_noticia, quando não preenchemos as validações necessárias, o console.log que colocamos é exibido em objeto.

Daí, podemos passar isso dentro do res.render no admin.js um objeto.

    res.render("admin/form_add_noticia", { validacao: erros });

Feito isso, no form_add_noticia, podemos imprimir a validação acima em formato de lista.

    <% if(validacao) { %>
        <ul>
            <% for(var i = 0; i < validacao.length; i++) { %>
                <li>
                    <%= validacao[i].msg %>
                </li>
            <% } %>
        </ul>
    <% } %>

No caso, os parâmetros que são exibidos são os que foram mostrado no console.log(erros).

## Aula 5 - Mantendo o preenchimento do formulário:
Vamos aprender a manter as informações preenchidas, mesmo que não preenchemos todos os campos de forma validada.

Mas antes disso, note que a tela formulario_inclusao_noticia não está reconhecendo o parâmetro "validacao" que foi colocado no form_add_noticia.ejs.

No caso, para corrigir esse erro, bastaria irmos no arquivo admin.js e no
    
    res.render('admin/form_add_noticia');
    
acrescentar um parâmetro objeto.

    res.render('admin/form_add_noticia', {validacao: {} });

Feito a mudança acima, podemos visitar a tela formulario_inclusao_noticia novamente.

Agora, quando colocamos as informações para notícia, mesmo que não preenchido todas elas de forma validada, como mantermos as informações preenchidas mantidas?

No caso, bastaríamos usar no arquivo admin.js e nela acrescentarmos mais um parâmetro dentro do objeto que foi colocado no

    res.render("admin/form_add_noticia", { validacao: erros });

junto com a validacao.

    res.render("admin/form_add_noticia", { validacao: erros, noticia: noticia });

Donde a noticia é a variável noticia que é igual ao body.

Em seguida, no arquivo form_add_noticia.ejs colocamos nos values para o valores que aparecem em js.

    <form action="/noticias/salvar" method="post">
        <label>Título</label>
        <input type="text" id="titulo" name="titulo" value="<%=noticia.titulo%>" placeholder="Título da notícia" />
        <br/>
        <label>Resumo</label>
        <input type="text" id="resumo" name="resumo" value="<%=noticia.resumo%>" placeholder="Resumo da notícia" />
        <br/>
        <label>Nome autor</label>
        <input type="text" id="autor" name="autor" value="<%=noticia.autor%>" placeholder="Autor da notícia" />
        <br/>
        <label>Data dos fatos</label>
        <input type="date" id="data_noticia" name="data_noticia" value="<%=noticia.data_noticia%>" placeholder="Data da notícia" />
        <br/>
        <label>Notícia</label>
        <textarea id="noticia" name="noticia" value="<%=noticia.noticia%>" rows="5" cols="30"></textarea>
        <br/>
        <input type="submit" value="Enviar"/>
    </form>

Assim, mesmo que vc coloque as informações de forma que não seja validado, as abas preenchidas terão sido todas elas preenchidas.

O mesmo parâmetro "noticia" que foi colocado no

    res.render("admin/form_add_noticia", { validacao: erros });

deverá ser colocado em
    
    res.render('admin/form_add_noticia', {validacao: {} });
    
pois se não, novamente, a tela de formulario_inclusao_noticia não será possível acessar.

    res.render('admin/form_add_noticia', {validacao: {}, noticia: {} });