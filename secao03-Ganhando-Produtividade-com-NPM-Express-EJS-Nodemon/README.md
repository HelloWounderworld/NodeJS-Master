# Seção 3 - Ganhando produtividade com o NPM, Express, EJS e Nodemon:
## Aula 1 - Visão geral do NPM, Express, EJS e Nodemon:      
Ao baixar o node, o npm já vem incluso, para verificar isso bastaria digitar
    
    npm -v 

para verificar a sua versão instalada.

Para iniciarmos o npm, precisamos ir no terminal e colocar o comando 

    npm init
    
Ao realizarmos isso e preenchendo as resquições que lhe são solicitadas, no final, será criado um arquivo chamado package.json.

## Aula 2 - Iniciando o NPM em nosso projeto:
Agora, vamos instalar o Express usando o npm. No caso, podemos jogar no terminal

    npm install express --save

A verdade é que podemos digitar somente o

    npm install express

mas o motivos de colocarmos o '--save' está no fato de que podemos trazer os arquivos instalados dentro da nossa máquina, vide o node_modules eo package-lock.json que apareceu quando colocamos o tal comando no terminal.

As boas práticas sugerem que tais comandos para que fizemos acima para criarmos o package.json e o node_module sejam feitas dentro do diretório projeto seu.

## Aula 3 - NPM - Instalando o Express:
No caso, com o express já instalado precisamos fazer uma refatoração do projeto. No caso, no arquivo app.js precisamos fazer require do express.

## Aula 4 - Refactoring do projeto prático portal de notícias com Express:
Agora, instalamos o EJS usando o npm. No caso, esse recurso vaimos permitir escrever páginas html juntamente com instruções do JavaScript.

Basta colocar o comando pelo terminal acessado o seu diretório projeto

    npm install ejs --save

Depois disso podemos ver que o ejs está disponível dentro de node_modules.

Agora, precisamos ir no arquivo app.js e informar para o express que foi implementado um novo recurso ejs e que será trabalhado em conjunto com o express.

Para melhor organização vamos criar um diretório novo chamado views e dentro dele colocar arquivos htmls e chamar-las no app.js.

## Aula 5 - NPM - Instalando o EJS - Download das views do projeto prático portal de notícias - Refactoring do projeto prático portal de notícias com EJS:
Depois que instalamos o recurso ejs vamos refatorar o nosso código. Vamos substituir pelo diretório view que foi baixado que já tem os ejs prontos. E realizar as devidas modificações no app.js que considere tais refatorações.
Utilize o link disponibilizado como recurso dessa aula para fazer o download das views do projeto prático portal de notícias.

Bons estudos ;)

Recursos

## Aula 6 - NPM - Instalando e testando o Nodemon:
Agora, vamos instalar e testar o Nodemon usando o npm. No caso, ele servirá para que a cada alteração que realizamos no nosso projeto que ele seja renderizado sem a necessidade manula de ter quer parar a renderização para depois renderizar novamente o nosso projeto pelo terminal.

Para a instalação basta rodar o comando pelo diretório projeto

    npm install -g nodemon

Assim, em seguida, rode o comando nodemon (nome do arquivo sem a extensão), nodemon app.

Dessa forma, qualquer alteração que ocorrer no seu script, o nodemon captará automaticamente e será feito o restart automático.