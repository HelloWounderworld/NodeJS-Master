var http = require('http');
console.log('Vamos entender melhor uma request');
console.log('O request irá servir quando vc quiser colocar algum component de rota');

var server = http.createServer(function(req, res){

    var categoria = req.url;

    console.log("Mostre a variavel categoria: ", categoria)

    if (categoria == '/tecnologia') {
        res.end('<html><body>Notícias de Tecnologia</body></html>');

    } else if (categoria == '/moda') {
        res.end('<html><body>Notícias de Moda</body></html>');

    } else if (categoria == '/beleza') {
        res.end('<html><body>Notícias de Beleza</body></html>');

    } else {
        res.end('<html><body>Error 404.</body></html>');
    }
});

server.listen(3000);
console.log('Abrir localhost:3000');