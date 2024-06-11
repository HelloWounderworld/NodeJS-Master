var http = require('http');
console.log("Com a forma abaixo que eu criei o servidor, como eu nao defini a resposta, no navegador, ao bater da porta 3000 ela ficara so carregando")

var server = http.createServer(function(req){

    // console.log("Me mostra o que vem no req: ", req);
    console.log("O req (request) e um objeto que caracteriza o tipo de requisicao")
    console.log("Me mostra que tipo de requisicao ela vem: ", req.method);
    console.log("Me mostra qual a url configurada nela: ", req.url);
    console.log("Me mostra o status do codigo: ", req.statusCode);
    console.log("Me mostra o status da mensagem: ", req.statusMessage);

    var categoria = req.url;

    console.log("Me mostre o que vem na categoria: ", categoria);
});

server.listen(3000)
console.log('Abrir localhost:3000');