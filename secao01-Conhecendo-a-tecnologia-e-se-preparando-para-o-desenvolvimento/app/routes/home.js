module.exports = function(app) {
    app.get('/', function(req, res){
        // res.send('<html><body>Portal de notícias</body></html>');
        res.render('home/index');
    });
};