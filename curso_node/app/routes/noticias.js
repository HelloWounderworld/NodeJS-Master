var dbConnection = require('../../config/dbConnection');

module.exports = function(app) {

    var connection = dbConnection();

    app.get('/noticias', function(req, res) {

        // var mysql = require('mysql');
        
        // var connection = mysql.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     password: '123456789',
        //     database: 'portal_noticias'
        // });

        connection.query('select * from noticias', function(error, result) {
            // res.send(error);
            // res.send(result);
            res.render("noticias/noticias", {noticias: result});  // Basicamente, essa condição vai nos permitir acessar as informações dos arrays pelo arquivo .ejs correspondente dessa rota.
        });

        // res.render('noticias/noticias');
    });
};