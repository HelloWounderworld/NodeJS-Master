# Seção 1  - Conhecendo a tecnologia e se preparando para o desenvolvimento:
## Aula 1 - Introdução ao NodeJS:

Temos 4 recursos que serão essenciais e úteis para melhor produtividade como programador profissional:

-express : Um framework NodeJS para aplicações WEB

-EJS - Uma linguagem de modelagem para criação de paginas HTML utilizando JavaScript

-Nodemon - Um utiliário que reinicia automaticamente o servidor NodeJS quando houver qualquer alteração em nossos scripts

-npm - Um gerenciador de pacotes JavaScript

- Nas classes, em todos os momentos será usado o bootstrap.

## Aula 2 - [Extra] Canais de comunicação:
O Curso Completo do Desenvolvedor NodeJS e MongoDB possui um grupo no Facebook, a proposta é criar uma espaço colaborativo, possibilitando a troca de conhecimentos e experiências entre os participantes do curso, uma ótima oportunidade para conhecer pessoas com os mesmos objetivos profissionais que você!

Vale lembrar porém que o grupo não é dedicado ao suporte de dúvidas do curso, as dúvidas deverão ser postadas aqui no fórum da Udemy normalmente.

Link do grupo:

https://www.facebook.com/groups/458536931149217/

Aguardamos você lá.

## Aula 3 - Entendendo o conceito client-server e a dinâmica de aplicações web: 
Aqui vc precisa entender sobre o conceito de cliente servidor. Seguir o link de leitura:

https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/First_steps/Client-Server_overview

## Aula 4 - Download e instalação do NodeJS:
Download e Instalação do node. Basta visitar a página nodejs.org.

## Aula 5 - Instalação do NodeJS:

### [Linux]:
[Linux] - Instalação do NodeJS
Artigo dedicado a usuários do sistema operacional Linux

Introdução

Nesse artigo você aprenderá a como instalar o Node.js e o NPM no Sistema Operacional Ubuntu 16.04.

Como Instalar Utilizando o NVM

Nesse artigo iremos usar uma ferramenta chamada nvm, que significa "Node.js version manager" ou "Gerenciador de Versão do Node.js" para realizar a instalação do NodeJS e do NPM.

Usando o nvm você poderá controlar o seu ambiente de desenvolvimento mais facilmente, com ele teremos acesso a uma série de versões da plataforma NodeJS de tal modo a possibilitar a instalação da que for mais apropriada para as nossas necessidades.

Para começar, precisaremos obter os pacotes de software do nosso repositório Ubuntu que nos permitirão compilar pacotes de fontes. O script nvm aproveitará estas ferramentas para construir os componentes necessários. Para começar vamos abrir o Terminal do Linux, em seguida vamos rodar os seguintes comandos no Terminal:

    sudo apt-get update

    sudo apt-get install build-essential libssl-dev

Segue abaixo as imagens da execução dos comandos acima concluídos.

Uma vez que os pacotes requeridos estejam instalados, você poderá baixar o script de instalação do nvm com o curl.

É importante que antes da execução você mude o diretório no terminal para a Área de Tabalho (desktop), pois do contrário o script de instalação não será baixado, e para mudar o diretório do Terminal você pode usar o comando

    cd (change directory) 

e na sequência usar o comando abaixo para baixar o script de instalação:

    curl –sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh

Na sequência, quando o terminal for liberado para digitação novamente, utilize o comando

    ls (list) 

para verificar se foi criado um arquivo install_nvm.sh na pasta em que você está.

Agora que o script de instalação foi criado, devemos executá-lo, e podemos fazer isso através do comando bash, ficando da seguinte maneira:

    bash install_nvm.sh

Basta esperar a execução do comando finalizar e já temos o NVM instalado em nossa máquina.

Abaixo temos uma imagem com o processo descrito acima:

Agora para podermos acessar as funções do NVM temos que reiniciar o Terminal, é só fechá-lo e abri-lo novamente. Feito isso podemos instalar o NodeJS.

Se você usar o comando:

    nvm ls-remote

Será listado no terminal todas as versões disponíveis do NodeJS, como mostra a imagem abaixo:

No momento da escrita desse artigo a última versão disponível era a v8.1.2.

Decidimos instalar a versão 6.11.0 do NodeJS por ser a versão mais estável no momento, para realizar a instalação basta você usar o comando:

    nvm install 6.11.0

Assim que a execução do comando terminar você já terá o NodeJS na versão 6.11.0 e o NPM 3.10.10 instalados na sua máquina. Para listar as versões do NodeJS instaladas através do NVM basta usar o comando:

    nvm ls

Esse comando deverá listar apenas a versão 6.11.0 e mostra-la como a versão padrão.

A imagem abaixo mostra o processo de instalação do NodeJS através do NVM e a listagem das versões instaladas:

E pronto! Você já tem o NVM o NodeJS e o NPM instalados em sua máquina. Para garantir que o NodeJs e o NPM estejam funcionando você pode fazer o teste com os seguintes comandos:

    node –v

    npm –v

Os comandos acima deverão ter como resultado algo como a imagem abaixo:

Qualquer dúvida ou sugestão é informar ;)

Bons estudos!!!

### [Windows]:
1. Visite o site oficial do Node.js: Acesse nodejs.org.

2. Baixe o instalador: Na página inicial, você verá opções para baixar o Node.js. Geralmente, há duas versões disponíveis: a versão LTS (Long Term Support), que é mais estável e suportada por um período mais longo, e a versão Current, que possui os recursos mais recentes. Para a maioria dos usuários, recomenda-se baixar a versão LTS.

3. Execute o instalador: Após o download, execute o arquivo baixado. Isso abrirá o assistente de instalação do Node.js.

4. Siga as instruções do instalador: O instalador irá guiá-lo através de várias etapas. Aceite o contrato de licença, escolha o diretório de instalação e selecione os componentes que deseja instalar. É recomendável manter as opções padrão, que incluem o NPM (Node Package Manager).

5. Finalize a instalação: Após selecionar as opções desejadas, continue com a instalação. O instalador configurará o Node.js e o NPM no seu sistema.

6. Verifique a instalação:
    Para verificar se o Node.js foi instalado corretamente, abra o Prompt de Comando (cmd) e digite:

           node -v

    Isso deve exibir a versão do Node.js instalada. Você também pode verificar a instalação do NPM com:

           npm -v

Atualize o NPM (opcional):
    Para garantir que você tenha a versão mais recente do NPM, você pode atualizá-lo usando o seguinte comando no Prompt de Comando:

        npm install npm@latest -g

Com esses passos, você terá o Node.js e o NPM instalados e prontos para uso no Windows.

## Aula 6 - Instalando o sublime text para criação/edição de scripts:
Instalar o VSCode ou Cursor AI ou algum outro sublime text que esteja em alta do momento.