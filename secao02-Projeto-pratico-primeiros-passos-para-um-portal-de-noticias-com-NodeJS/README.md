# Seção 2 - Projeto prático - primeiros passos para um portal de notícias com NodeJS:
## Aula 1 - Executando arquivos JavaScript no NodeJS:
Para executar o arquivo JavaScript no NodeJS, bastaria, pelo terminal, entrar na pasta projeto seu e nela digitar

    node nomeDoArquivo.js
    
## Aula 2 - Respondendo requisições HTTP com NodeJS:
Respondendo requisições HTTP com NodeJS. Basta seguir o arquivo noticias.js.

Nesse arquivo havera um servidor HTTP simples criado usando o modulo "http" do NodeJS.

Basicamente, no codigo temos o seguinte

1. Importação do módulo HTTP:

        var http = require('http');

    Esta linha carrega o módulo http que é uma parte integrante do Node.js, usado para criar servidores HTTP.

2. Criação do servidor:

        var server = http.createServer(function(req, res){

            var categoria = req.url;

            if (categoria == '/tecnologia') {
                res.end('<html><body>Notícias de Tecnologia</body></html>');

            } else if (categoria == '/moda') {
                res.end('<html><body>Notícias de Moda</body></html>');

            } else if (categoria == '/beleza') {
                res.end('<html><body>Notícias de Beleza</body></html>');

            } else {
                res.end('<html><body>Portal de notícias</body></html>');
            }
        });

    Aqui, um servidor HTTP é criado. A função passada para createServer é chamada sempre que uma requisição HTTP é recebida. req representa a requisição do cliente, e res é o objeto usado para enviar uma resposta de volta ao cliente.

3. Manipulação de rotas com base na URL:

    Dentro da função do servidor, a URL da requisição é analisada para determinar como responder:

        var categoria = req.url;

    A variável categoria armazena o caminho da URL acessada pelo usuário.

    - Rota:

            var categoria = req.url;

            if (categoria == '/tecnologia') {
                res.end('<html><body>Notícias de Tecnologia</body></html>');

            } else if (categoria == '/moda') {
                res.end('<html><body>Notícias de Moda</body></html>');

            } else if (categoria == '/beleza') {
                res.end('<html><body>Notícias de Beleza</body></html>');

            } else {
                res.end('<html><body>Portal de notícias</body></html>');
            }
        
4. Inicinado o servidor:

        server.listen(3000);

    O servidor começa a escutar na porta 3000. Uma mensagem é exibida no console para indicar que o servidor está rodando e pode ser acessado através de http://localhost:3000 no navegador.

Este código é um exemplo básico de como criar um servidor web com Node.js que responde de maneira diferente com base na URL acessada pelo usuário.

## Aula 3 - Respondendo requisições com base na url requisitada:
Respondendo requisições com base na url requisitada. Basta seguir o arquivo noticias.

## Aula 04 - O que e Host?
Em termos de programação e redes, o termo "host" refere-se a um computador ou outro dispositivo conectado a uma rede que hospeda ou fornece serviços e recursos para outros dispositivos na rede. Aqui estão alguns contextos em que o termo "host" é comumente usado:

1. Servidor Web: Em desenvolvimento web, um host é um servidor que armazena os arquivos de um site e os serve para os usuários através da Internet. Por exemplo, quando você acessa um site, você está se conectando a um host que envia os dados necessários para o seu navegador.

2. Host de Rede: Qualquer dispositivo que pode enviar ou receber dados em uma rede pode ser considerado um host. Isso inclui computadores, smartphones, tablets, e até mesmo dispositivos IoT (Internet das Coisas).

3. Hostname: O nome de um dispositivo em uma rede. É usado para identificar o dispositivo em uma rede e pode ser resolvido para um endereço IP através de serviços como DNS (Domain Name System).

4. Host Virtual (Virtual Host): Em servidores web, um host virtual é uma configuração que permite a um único servidor hospedar múltiplos domínios ou sites. Cada site no servidor pode ter seu próprio nome de domínio e conteúdo, apesar de compartilharem o mesmo hardware físico.

5. Host Local (localhost): Refere-se ao dispositivo que você está usando atualmente. Em desenvolvimento, acessar "localhost" em um navegador geralmente aponta para um servidor ou serviço rodando no próprio computador do usuário, usado frequentemente para testes e desenvolvimento.

O conceito de "host" é fundamental para entender como as redes e a Internet funcionam, permitindo a comunicação e o compartilhamento de recursos entre dispositivos.