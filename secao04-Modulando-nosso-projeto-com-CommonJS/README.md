# Seção 4 - Modulando nosso projeto com CommonJS:
## Aula 1 - O que são módulos e o que é CommonJS?:
Módulos - Permitem organizar melhor os nossos códigos de tal modo que isole uma determinada lógica nossa e que a mesma seja usada de forma recorrente para outras finalidades. Um exemplo de módulos seria as classes que aparecem nas programações orientadas à objetos.

CommonJS - é que permite definir o formato da construção desses módulos.

Uma estrutura de escrita que seja implementado no node de forma natural.

Para experimentarmos tais recursos usamos vamos criar o arquivo mod_teste.js e dentro dela colocar um exemplo simples.

Feito isso precisa-se ser recuperado na aplicação app.js.

No caso, o módulo pode retornar qualquer coisa (objeto, string, booleano, classe, etc...).

Um caso mais comum que se retorna do módulo é uma função.

## Aula 2 - Criando um módulo para configurações do servidor:
Agora, para não ficar exaustivo, tais módulos podemos encontrar dentro do node_module se verificarmos nas biblioteca (lib). Uma delas no diretório ejs/lib

## Aula 3 - Reestruturando a aplicação e criando um módulo para definição das rotas:
Vamos agora aprender a modularizar as nossas aplicações. No caso, as requires que temos nos arquivos app.js podemos organizar melhor colocando-as dentro do diretório config que vamos criar e, dentro dela, no arquivo server.js.

É necessário colocar o module.exports e especificar quem vc está retornando.

Deixarei comentado os requires do app.js e nela apenas irei fazer um require que é vinda do diretório config e arquivo server.js.

Vamos modularizar um pouco mais as nossas aplicações, para a melhor organização. 

Para isso, vamos criar um diretório app e dentro dela mover o diretório view. 

Além disso, dentro do diretório app, vamos criar o outro diretório routes e movemos o diretório view dentro do diretório app.

Daí, dentro do diretório routes vamos criar três arquivos .js que representam as respectivas rotas de cada página.

Após feito isso, vamos precisar apontar os respectivos caminhos que foram feito. E tal caminho vamos configurar no server.js.

Note que, na configuração dentro do server.js, temos que configurar como se estivessemos no app.js, então os níveis das paths precisam ser levadas em consideração ao app.js e não o arquivo server.js, app.set('views', './app/views');

Para os arquivos .js que foram criado dentro do routes, precisamos exportar o módulo para que seja possível importar o mesmo no app.js, como podemos ver pelas variáveis que referencia as rotas que criadas, var rotaNoticias = require('./app/routes/noticias');

Bastaria rodar nodemon app para verificar na porta indicada do localhost para verificar que as rotas funcionam perfeitamente.