var Auth = require('../controller/authorization'),
    ArticleHandler = require('../controller/articles');


// Auth.auth is a middleware of Token Authorization.

module.exports = function(app) {
    // router of index
    app.get('/', function(req, res){res.end("Hello world!")});

    // router of /article
    app.get('/articles', ArticleHandler.list_articles);
    app.post('/articles', Auth.auth, ArticleHandler.add_article);

    // router of /article/(.*)
    app.put('/articles/:id', Auth.auth, ArticleHandler.modify_article);
    app.get('/articles/:id', ArticleHandler.get_a_article);
    app.delete('/articles/:id', Auth.auth, ArticleHandler.remove_article);

    // router of /api-auth
    app.post('/api-auth', Auth.get_token);
    app.get('/users', Auth.getAllUsers);

    // router of /tags
};