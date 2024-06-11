var http = require('http');
console.log("Com a forma como criamos o servidor abaixo, com o 'res', finalmente, conseguimos criar uma resposta para o sevidor");
console.log("Dessa forma, ao batermos na porta 3000, agora, ela ira devolver alguma resposta no navegador.");

var server = http.createServer(function(req, res){

    console.log("Me mostre o que tem dentro do res: ", res);
    console.log("Mostrarei algumas das informacoes que podemos extrair dentro do res");
    console.log("Mostre a conexao: ", res.req.rawHeaders[0]);
    console.log("Mostre qual a porta em que esta sendo chamado: ", res.req.rawHeaders[1]);
    console.log("Mostre qual o tipo de chamada: ", res.req.rawHeaders[2]);
    console.log("Mostre qual o navegador esta sendo aberto do host: ", res.req.rawHeaders[5]);
    console.log("Mostre qual sistema operacional esta sendo executado: ", res.req.rawHeaders[11]);
    console.log("Mostre por qual metodo esta sendo devolvido a resposta: ", res.req.method);
    console.log("Mostre por qual caminho na qual a resposta esta sendo devolvido: ", res.req.url);
    console.log("Mostre o status do codigo da resposta: ", res.statusCode);
    console.log("Mostre o status do codigo da requisicao: ", res.req.statusCode);
    console.log("Mostre o status da mensagem: ", res.req.statusMessage);

    res.end(); // o res, seguido do metodo end(), ela nos devolve alguma resposta ao navegador
});

server.listen(3000);
console.log('Abrir localhost:3000');