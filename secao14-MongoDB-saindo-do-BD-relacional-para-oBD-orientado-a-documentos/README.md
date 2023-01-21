# Seção 14 - MongoDB - Saindo do BD relacional para o BD orientado a documentos:

Modo de uso do MongoDB: 

    https://www.mongodb.com/docs/manual/introduction/

Obs: O formato de uso do MongoDB tem uita similaridade com o Firebase, que é um outro banco de dados não relacional.

## Aula 1 - Introdução ao MongoDB:
Para entender a utilidade boa do bando de dados Mongo Db, precisamos entender melhor a diferença entre bando de dados relacionais e não relacionais.

Banco de dados:

    https://www.devmedia.com.br/conceitos-fundamentais-de-banco-de-dados/1649

    https://www.homehost.com.br/blog/tutoriais/mysql/o-que-e-um-banco-de-dados/

Banco de dados relacionais:

    https://pt.wikipedia.org/wiki/Banco_de_dados_relacional

    https://www.devmedia.com.br/bancos-de-dados-relacionais/20401

    https://kondado.com.br/blog/blog/2022/09/05/entenda-o-que-e-um-banco-de-dados-relacional/

Banco de dados não relacionais:

    https://learn.microsoft.com/pt-br/azure/architecture/data-guide/big-data/non-relational-data

    https://www.digitalhouse.com/br/blog/banco-de-dados-relacional-e-nao-relacional/

    https://kondado.com.br/blog/blog/2022/11/10/o-que-e-um-banco-de-dados-nao-relacional/

Banco de dados relacional vs não relacional:

    https://natahouse.com/pt/bancos-relacionais-x-bancos-nao-relacionais-quando-usar-cada-um

    https://pt.stackoverflow.com/questions/191919/banco-de-dados-n%C3%A3o-relacionais-vs-banco-de-dados-relacionais#:~:text=Vantagens%20dos%20bancos%20Relacionais%3A,%C3%A9%20a%20estrutura%20menos%20flexivel.

    https://mundodevops.com/blog/bancos-nosql-vs-relacionais/

Basta ler e entender!

O Mongo DB, no caso, se encaixa dentro do banco de dados não relacionais!

## Aula 2 - Instalando o banco de dados MongoDB:

Vamos instalar o banco de dados MongoDB.

    https://www.mongodb.com/home

Como eu uso Linux, teria que acessar para a versão certa do Ubuntu:

    https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

    https://www.cherryservers.com/blog/how-to-install-and-start-using-mongodb-on-ubuntu-20-04

Instalado e iniciado acima, bastaria acessar a porta 27017.

Os comandos para manipular o banco de dados:

    https://docs.mongodb.com/mongodb-shell/

## Aula 3 - Exibindo, criando e removendo bancos de dados:
Vamos aprender a manipular um pouco sobre esse banco de dados.

Comandos:

    - show dbs - Serve para verificar quais tipos de banco de dados temos dentro:

        test> show dbs
        admin   40.00 KiB
        config  60.00 KiB
        local   72.00 KiB

    - use - Serve para alternar entre banco de dados e tbm para criar uma.

        test> use curso_mongodb
        switched to db curso_mongodb

    O comando acima pede para alternar em um banco de dados que nem existe.

    Disso, será criado uma, mas quando damos o show dbs não será ainda exibido, pois seria necessário inserir algum conteúdo dentro dela.

    - db.alunos.insertOne( {Nome: 'Leonardo'} ) - Isso irá inserir um conteúdo dentro do banco de dados e depois podemos ver ao digitarmos show dbs depois que colocamos o conteúdo.

        curso_mongodb> db.alunos.insertOne( {Nome: 'Leonardo'} )
        {
        acknowledged: true,
        insertedId: ObjectId("639f98992b9848ba15849bff")
        }
        curso_mongodb> show dbs
        admin           40.00 KiB
        config         108.00 KiB
        curso_mongodb    8.00 KiB
        local           72.00 KiB

    - db.dropDatabase() - Serve para eliminar o banco de dados em que vc está conectado.

        curso_mongodb> db.dropDatabase()
        { ok: 1, dropped: 'curso_mongodb' }
        curso_mongodb> show dbs
        admin    40.00 KiB
        config  108.00 KiB
        local    72.00 KiB

## Aula 4 - Exibindo, criando e removendo coleções:
Vamos aprender a criar e manipular as coleções dentro do banco de dados.

Comandos:

    - use (nome do banco de dados)

    - db.createCollection("colocar o nome da coleção") - Permite criar uma coleção dentro do banco de dados que vc criou.

        curso_mongodb> use curso_mongodb
        already on db curso_mongodb
        curso_mongodb> db.createCollection("alunos")
        { ok: 1 }

    - db.getCollectionNames() - permite exibit quais coleções esse banco de dados possui.

        curso_mongodb> db.getCollectionNames()
        [ 'alunos' ]
        curso_mongodb> 
        (To exit, press Ctrl+C again or Ctrl+D or type .exit)
        curso_mongodb> db.createCollection("cursos")
        { ok: 1 }
        curso_mongodb> db.getCollectionNames()
        [ 'alunos', 'cursos' ]

    - db.nome da coleção.drop() - Serve para remover a coleção que vc criou dentro do banco de dados.

        curso_mongodb> db.cursos.drop()
        true
        curso_mongodb> db.getCollectionNames()
        [ 'alunos' ]

## Aula 5 - Inserindo documentos:
Vamos agora aprender a inserir documentos dentro do banco de dados.

Um pouco de conceitos sobre inserção de documentos dentro do banco de dados MongoDB:

    https://4linux.com.br/o-que-e-mongodb/

    https://www.alura.com.br/artigos/mongodb-o-banco-baseado-em-documentos

    https://felipetoscano.com.br/inserir-documento-no-mongodb/

    http://db4beginners.com/blog/incluir-e-excluir-dados-mongodb/

Comandos:

    - Seguir o artigo
        
        https://felipetoscano.com.br/inserir-documento-no-mongodb/

## Aula 6 - Consultando documentos com operadores de comparação:
Vamos aprender a consultar os documentos.

    https://www.mongodb.com/docs/manual/reference/method/js-collection/

## Aula 7 - Consultando documentos com operadores lógicos:
Basta estudar por aqui:

    https://www.mongodb.com/docs/manual/reference/operator/query-logical/

## Aula 8 - Atualizando documentos:
Bastar estudar por aqui:

    https://www.mongodb.com/docs/manual/tutorial/update-documents/

## Aula 9 - Removendo documentos:
Basta estudar por aqui:

    https://www.mongodb.com/docs/mongodb-shell/crud/delete/

## Aula 10 - Extra - Como mapear um path no Windows:
No caso do Linux Ubuntu bastaria configurar por mongosh.

O fato de eu puder estar digitando o comando sudo systemctl start mongod já é um indicativo de que foi mapeado.

## Aula 11 - Extra - Interface gráfica nativa do MongoDB (Informações administrativas):
Procurar em como rodar o mongod --rest na versão Ubuntu, pois isso parece que tem para windows.

Basta seguir esse link:

    https://www.cherryservers.com/blog/how-to-install-and-start-using-mongodb-on-ubuntu-20-04

    https://www.w3resource.com/mongodb/connections.php

    https://www.mongodb.com/docs/v4.2/tutorial/install-mongodb-on-ubuntu/#run-mongodb-community-edition

## Aula 12 - Atividades para fixação do conteúdo:
Atividades para fixação do conteúdo

- 1) Crie um banco de dados chamado biblioteca


- 2) Crie uma coleção (collection) chamada livros


- 3) Crie os seguintes documentos:

    título: Introdução a linguagem de marcação HTML
    valor: 25.00
    Autor: João

    --

    título: NodeJS do básico ao avançado
    valor: 280.00
    Autor: Jorge

    --

    título: Android - criando apps reais
    valor: 290.00
    Autor: Jamilton

    --

    título: PHP e MySQL
    valor: 190.00
    Autor: Fernando

    --

    título: Lógica de Programação
    valor: 20.00
    Autor: Maria

- 4) Crie as seguintes consultas:

    Crie uma consulta que retorne apenas os documentos de livros com valores superiores a 200.00

    Crie uma consulta que retorne apenas os documentos com valores entre 10 e 30

    Crie uma consulta que retorne todos os documentos, executo aqueles cujo autor seja Fernando


- 5) Atualize os seguintes documentos:

    Atualize o documento cujo o título é PHP e MySQL, passando seu valor de 190.00 para 175.00

    Atualize o documento cujo autor é Jorge, passando seu título para Curso Completo de NodeJS

    Atualize todos os documentos cujo valor são iguais ou inferiores a 25.00 para o valor 27.00

- 6) Remove os seguintes documentos:

    Remova o documento cujo autor é João

    Remova todos os documentos cujo valor é superior a 280.00

    Remova todos os documentos cujo valor é inferior a 30.00
