// Uma outra alternativa que podemos fazer para colocar seria
// var express = require('express')();
// O formato abaixo é uma forma didática, pois primeiro fizemos o require e depois, por via da variável app, expressamos-a na forma de uma função
// var express = require('express');
// Recuperando o módulo que foi definido no mod_teste.js
// var msg = require('./mod_teste');
// Na forma como a variável msg está acima, quando implementado uma função dentro do módulo, ele não será executado a própria função (basta ver que o console.log(msg) retorna a function e não o que a função retorna)
// Para executar precisa acrescentar o ()
// var msg = require('./mod_teste')();
// Uma outra alternativa para isso seria colocar console.log(msg())
// var msg = require('./mod_teste');

// var app = express();

// Tô informando ao express que o ejs vai ser implementado e que será usado em conjunto
// app.set('view engine', 'ejs');

//app.get('/tecnologia', function(req, res){
    // res.send('<html><body>Notícias de Tecnologia</body></html>');
    // Chamando o ejs dentro do subdiretório secao do diretório views
    // Note que, não precisamos especificar a extensão .ejs, pois já foi sinalizado pelo app.set acima
    //res.render('secao/tecnologia');
//});

// Chamando os arquivos modularizados
var app = require('./config/server');

// A forma para evitar o Cannot GET, mas sem conseguir atender as rotas que criamos em noticias.js
// app.get('/', function(req, res){
//     // res.send('<html><body>Portal de notícias</body></html>');
//     res.render('home/index');
// });

// app.get('/formulario_inclusao_noticia', function(req, res) {
//     res.render('admin/form_add_noticia');
// });

// app.get('/noticias', function(req, res) {
//     res.render('noticias/noticias');
// });

// Forma opcional
// var rotaHome = require('./app/routes/home')(app);
var rotaHome = require('./app/routes/home');
rotaHome(app);

var rotaFormularioInclusaoNoticia = require('./app/routes/formulario_inclusao_noticia');
rotaFormularioInclusaoNoticia(app);

var rotaNoticias = require('./app/routes/noticias');
rotaNoticias(app);

app.listen(3000, function() {
    // console.log('Servidor rodando com express');
    // console.log(msg);
    // console.log(msg());
    console.log(' Server ON');
});