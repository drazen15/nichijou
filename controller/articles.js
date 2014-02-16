/**
 * Created by Ricter on 14-2-15.
 */

var Article = require('../models/articles'),
    User = require('../models/users'),
    Auth = require('authorization');


function ArticleHandler() {
    //Article Handlers
}

ArticleHandler.list_articles = function(req, res) {
    Article.getAll(function(err, articles_list){
        if (err) {
            res.json(500, {message: err});
        }
        res.json(200, articles_list);
    });
};

ArticleHandler.get_a_article = function(req, res) {
    Article.get(req.param('id'), function(err, article) {
        if (err) {
            res.json(500, {message: err});
        }
        if (!article) {
            res.json(404, {message: "Not found."})
        }
        res.json(200, article);
    });
}

ArticleHandler.add_article = function(req, res) {
    article = new Article({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
    });
    article.save(function(err, article) {
        if (err) {
            res.json(500, {message: err});
        }
        res.json(201, article);
    });
};

ArticleHandler.modify_article = function(req, res) {
    Article.update(req.param('id'), req.body.title, req.body.tags, req.body.content,
        function(err, article){
            if (err) {
                res.json(500, {message: err});
            }
            if (!article) {
                res.json(404, {message: "Not found."})
            }
            res.json(200, {message: "OK"});
    });
};

ArticleHandler.remove_article = function(req, res) {
    Article.remove(req.param('id'), function(err) {
        if (err) {
            res.json(500, {message: err});
        }
        res.json(204, {message: 'No Content'});
    });
}

module.exports = ArticleHandler;