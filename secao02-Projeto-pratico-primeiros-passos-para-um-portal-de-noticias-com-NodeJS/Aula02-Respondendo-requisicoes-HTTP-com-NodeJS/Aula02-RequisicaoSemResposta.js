// Dessa forma como construi a requiscao http, ele vai ficar so pensando e nunca carregar o navegador no localhost:3000
var http = require('http');
console.log("Com a forma que eu criei o servidor abaixo, ao bater na porta 3000, ela so ficara carregando eternamente")

var server = http.createServer()

server.listen(3000)
console.log('Abrir localhost:3000');
