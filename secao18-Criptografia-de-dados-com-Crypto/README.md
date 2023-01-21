# Seção 18 - Criptografia de dados com Crypto:
## Aula 1 - Introdução a criptografia de dados:
Criptografias Unidirecionais:

-MD5:

    https://www.devmedia.com.br/criptografia-md5/2944
    
    https://www.avast.com/pt-br/c-md5-hashing-algorithm

    https://pt.wikipedia.org/wiki/MD5
    
    https://pt.stackoverflow.com/questions/113378/usar-md5-%C3%A9-a-maneira-mais-segura-de-se-criptografar-senhas-no-php

-SHA1:

    https://nstecnologia.com.br/blog/hash-sha1/

    https://calculareconverter.com.br/sha1-ecrypt-e-decrypt/

    https://pt.stackoverflow.com/questions/104713/como-descriptografar-md5-e-sha1

Criptografia Bidirecional:

-Base64:

    https://www.4devs.com.br/codificar_decodificar_base64

    https://pt.wikipedia.org/wiki/Base64

    https://developer.mozilla.org/pt-BR/docs/Glossary/Base64

## Aula 2 - NPM - Instalando o Crypto:
Vamos instalar o módulo Crypto com npm no projeto mmorpg_got.

    npm install crypto --save

## Aula 3 - Criptografando senhas de usuários com MD5:
Vamos agora usar o crypto.

No caso, dentro do crypto já esta o MD5 que é o método de criptografia que iremos utilizar.

No caso, vamos realizar a tal implementação para o arquivo UsuariosDAO.js de models, nas funções inserirUsuario e autenticar.

    var crypto = require('crypto');

    function UsuariosDAO(connection) {
        // console.log('Mostrar conexão antes: ', connection);
        this._connection = connection();
        // console.log('Mostrar conexão depois: ', this._connection);
    }

    UsuariosDAO.prototype.inserirUsuario = function(usuario) {
        // console.log(usuario);
        // console.log(usuario.senha);
        // insert(usuario);
        // this._connection.open( function(err, mongoclient){
        //     mongoclient.collection('usuarios', function(err, collection){
        //         collection.insert(usuario);
        //     });
        // } );
        var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
        usuario.senha = senha_criptografada;
        // console.log(senha_criptografada);

        this._connection.collection('usuarios').insertOne(usuario);
    }

    UsuariosDAO.prototype.autenticar = function(usuario, req, res) {
        // console.log(usuario);
        // this._connection.collection('usuarios').find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}});
        var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
        usuario.senha = senha_criptografada;
        this._connection.collection('usuarios').find(usuario).toArray(function(err, result){
            console.log(result);
            if(result[0] != undefined) {
                // Lembra quando colocamos o middleware express-session em server.js?
                req.session.autorizado = true;

                req.session.usuario = result[0].usuario;
                req.session.casa = result[0].casa;
            }

            if(req.session.autorizado) {
                // res.send('Usuário foi encontrado no banco de dados!');
                res.redirect("jogo");
            } else {
                // res.send('Usuário não existe no banco de dados!');
                res.render("index", {validacao: {}});
            }
        });
        // this._connection.close();
    }

    module.exports = function(){
        return UsuariosDAO;
    }
    
Agora, todas as senhas estão guardadas de forma criptografadas.