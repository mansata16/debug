const express = require('express');
const swig = require('swig');
const path = require('path');
const mongoose = require('mongoose');
const { chain } = require('lodash');
const app = express();

 app.use(express.logger());
 app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname+'/views');

mongoose.connect('mongodb+srv://nana:uF5ZgPkgUylZSIqf@cluster0.9vqlvqd.mongodb.net/Blog'); 
const Article = mongoose.model('Article', {title: String, content: String, updated: Date});

app.get('/', function(req, res){
    data = {title: 'Mon premier blog'};
    res.render('index', data); 
}); 


app.get('/create', function(req, res){
    var data = {title: 'Ajouter un article'};
    res.render('Create', data);
});

app.post('/store', function(req, res){
    var article = new Article({
        title: req.body.titre,
        content: req.body.contenu,
        updated: new Date()
    });
    article.save(function(err, article){
        if(err){throw err;}
        res.render('created');
    });
});

app.listen(3000); 
 console.log('App running http://localhost:3000')
 