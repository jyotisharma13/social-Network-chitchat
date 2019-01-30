const db = require('./db');
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
app.use(compression());

app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
app.use(express.static("public"));

app.get('/welcome', function(req, res){
    console.log('req.body get from  welcome route:',req.body);
    if(req.body.userId){
        res.redirect('/');
        console.log('logged');
    }else {
        console.log('notlogged');
        res.sendFile(__dirname + '/index.html');
    }
});
//checked it that the user are login or logout the application
/////////////////////////////////////

app.post('/welcome/register', (req, res) => {
    db.registerUser(req.body.first, req.body.last, req.body.email
    ).then(({rows}) => {
        req.body.userId = rows[0].id;
        res.json({success: true});
    }).catch(function(err) {
        console.log("error in registration: ", err);
        res.json({success: false});
    });
});

app.get('*', function(req, res) {
    if (!req.body.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});
app.listen(8080, function() {
    console.log("I'm listening.");
});
