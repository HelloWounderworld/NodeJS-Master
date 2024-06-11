# Seção 4 - Modulando nosso projeto com CommonJS:
## Aula 1 - O que são módulos e o que é CommonJS?:
Módulos - Permitem organizar melhor os nossos códigos de tal modo que isole uma determinada lógica nossa e que a mesma seja usada de forma recorrente para outras finalidades. Um exemplo de módulos seria as classes que aparecem nas programações orientadas à objetos.

CommonJS - é que permite definir o formato da construção desses módulos.

Uma estrutura de escrita que seja implementado no node de forma natural.

Para experimentarmos tais recursos usamos vamos criar o arquivo mod_teste.js e dentro dela colocar um exemplo simples.

Feito isso precisa-se ser recuperado na aplicação app.js.

No caso, o módulo pode retornar qualquer coisa (objeto, string, booleano, classe, etc...).

Um caso mais comum que se retorna do módulo é uma função.

### Módulos
Módulos em JavaScript são uma forma de dividir o código de um programa em partes separadas, cada uma encapsulando uma funcionalidade específica. Essa divisão ajuda a manter o código mais organizado, facilita a manutenção, a reutilização de código e a gestão de dependências. Os módulos são fundamentais em aplicações JavaScript de grande escala, pois permitem que os desenvolvedores trabalhem em diferentes partes do código de forma independente.

#### Características dos Módulos JavaScript:
1. Encapsulamento: Cada módulo tem seu próprio escopo. Variáveis, funções, classes e outros elementos definidos em um módulo não são visíveis ou acessíveis fora dele, a menos que sejam explicitamente exportados.

2. Exportação e Importação: Módulos podem exportar partes de seu código (como funções, objetos, classes) para serem usados em outros módulos. Da mesma forma, podem importar funcionalidades de outros módulos.

3. Reutilização de Código: Módulos podem ser reutilizados em diferentes partes de uma aplicação ou mesmo entre diferentes projetos, promovendo a reutilização de código.

4. Manutenção: Com o código dividido em módulos focados em funcionalidades específicas, torna-se mais fácil gerenciar e atualizar o código.

#### Tipos de Módulos em JavaScript:

##### CommonJS:
Utilizado principalmente no Node.js, usa require() para importar módulos e module.exports para exportar. As importações são síncronas, o que é adequado para servidores.

##### ES Modules (ESM):
Introduzido na especificação ECMAScript 2015, é o sistema de módulos padrão para JavaScript moderno no navegador e também suportado no Node.js. Usa import e export para manipulação de módulos e suporta importações assíncronas.

#### Exemplo de Módulo ES:

##### Exportando:

    // arquivo: math.js
    export function soma(a, b) {
        return a + b;
    }

    export const PI = 3.14159;

##### Importando:

    // arquivo: app.js
    import { soma, PI } from './math.js';

    console.log(soma(2, 3));  // Saída: 5
    console.log(PI);          // Saída: 3.14159

#### Vantagens dos ES Modules:
- Carregamento Assíncrono: Suporta import() dinâmico que permite carregar módulos de forma assíncrona, útil para aplicações web para reduzir o tempo de carregamento inicial.

- Compatibilidade com Navegadores: ES Modules são suportados nativamente pela maioria dos navegadores modernos sem a necessidade de ferramentas adicionais.

- Análise Estática: Facilita a análise estática do código, permitindo otimizações como tree shaking, que remove código não utilizado.

#### Conclusão:
Módulos são essenciais para desenvolver aplicações JavaScript escaláveis e manuteníveis. Com a evolução dos padrões ECMAScript, os ES Modules tornaram-se a forma recomendada de trabalhar com módulos em JavaScript, tanto no servidor quanto no navegador, oferecendo uma sintaxe mais limpa e recursos mais poderosos para o desenvolvimento moderno.

### CommonJS
CommonJS é uma especificação de padrão para modularização de código JavaScript, inicialmente concebida para ser utilizada em ambientes de servidor, como o Node.js. A ideia por trás do CommonJS é permitir a reutilização de código e facilitar a manutenção ao encapsular funcionalidades em módulos separados, que podem ser importados e utilizados conforme necessário.

#### Características do CommonJS:
1. Modularidade: Cada arquivo em um projeto Node.js é tratado como um módulo separado. Isso significa que variáveis e funções definidas em um arquivo não são acessíveis em outros arquivos, a menos que sejam explicitamente exportadas e importadas.

2. Sincronia: As importações de módulos via CommonJS são geralmente síncronas. Isso significa que o código é carregado e executado imediatamente quando o método require() é chamado. Isso é adequado para servidores onde os módulos são lidos do sistema de arquivos local e não há grandes preocupações com a latência que isso possa causar.

3. Exportação e Importação: Os módulos podem exportar objetos, funções, classes ou qualquer outro tipo de dado usando module.exports e podem ser importados em outros módulos usando a função require().

#### Exemplo de Uso:

##### Exportando um módulo:

    // arquivo: math.js
    function soma(a, b) {
        return a + b;
    }

    module.exports = soma;

##### Importando um módulo:

    // arquivo: app.js
    const soma = require('./math');

    console.log(soma(2, 3));  // Saída: 5

#### Relação entre CommonJS e Módulos:
- Encapsulamento: Cada módulo em CommonJS tem seu próprio escopo. Isso significa que variáveis, funções, classes, etc., definidas em um módulo não poluem o escopo global.

- Reutilização de Código: Os módulos podem ser reutilizados em diferentes partes de uma aplicação ou entre diferentes projetos. Isso promove a reutilização de código e reduz a duplicação.

- Gerenciamento de Dependências: CommonJS trata das dependências de forma explícita através do uso de require(). Isso torna as dependências claras e gerenciáveis.

#### Impacto no Desenvolvimento de Aplicações:
O uso de CommonJS no Node.js revolucionou o desenvolvimento de aplicações JavaScript no servidor, permitindo que os desenvolvedores utilizem a mesma linguagem tanto no cliente quanto no servidor, e gerenciem suas dependências de forma eficaz.

#### Limitações:
Carregamento Síncrono: O carregamento síncrono pode ser um problema para aplicações executadas no navegador, onde o carregamento de módulos do servidor pode causar atrasos perceptíveis. Isso levou ao desenvolvimento de alternativas como AMD (Asynchronous Module Definition) e, mais tarde, ao padrão ES Modules, que suporta carregamento assíncrono e é agora suportado por navegadores modernos e Node.js.

Em resumo, CommonJS é fundamental para a modularização em Node.js, facilitando a organização do código, a manutenção e a escalabilidade das aplicações.

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