const express = require('express');
const app = express();
/////////////socket io/////////////////
const server = require('http').Server(app);
//change origin if you want to put your socialnetwork  online
const io = require('socket.io')(server, { origins: 'localhost:8080' });
////////////////////////////////////////////////////////7
const compression = require('compression');
// const cookieSession = require('cookie-session');
const db = require('./db');
const bcrypt = require('./bcrypt');
const csurf = require('csurf');
const s3 = require('./s3');
// app.use(cookieSession({
//     secret: `Token that the request came from my own site! :D`,
//     maxAge: 1000 * 60 * 60 * 24 * 14
// }));
/////////////////////////////////////socket/////////
const cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

//////////////////////////////////////
app.use(require('body-parser').json());
app.use(compression());
app.use(express.static('./public'));
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

//////////////////////////////////////////////
const multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
const config= require('./config');

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
///////////////////////////////////
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
/////////////////////////////////////
//actually put the files in the uploadedfiles
//directory and changes name of the files
//to be some unique 24 charaqcter string
app.post('/profilePic/upload',uploader.single('uploadedFile'),s3.upload,(req, res)=>{
    console.log(" /profilePic/upload req.body", req.body);
    //req.file is object that describes the file we just uploaded
    console.log("/profilePic/upload req.file",req.file);
    // next steps: save filename, title, description, name in the image table
    //make new imge render automatically on screen(without reloading the image)
    // res.render('images', ());
    db.addImage(
        config.s3Url + req.file.filename, req.session.userId
    ).then(
        ({rows})=>{
            res.json({
                image:rows[0].img_url
            });
        }) .catch(err => {
        console.log('err in post upload:', err);
    });
});
/////////////////////////////////////////////////////
app.get('/welcome', (req, res) => {
    console.log("req.session",req.session);
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});
////////////////////////////////////////////////////////
app.get('/user', (req, res)=>{
    console.log(req.session.userId);
    return db.getUserInfo(req.session.userId).then(results=>{
        console.log("/user result:",results);
        res.json(results);
    }).catch(err => {
        console.log("error in /user: ", err);
    });
});
///////////////////////////////////////////////////////
app.post('/welcome/register', (req, res) => {
    console.log(req.session.id);
    bcrypt.hash(req.body.password).then(hashedPassword => {
        return db.registerUser(req.body.first, req.body.last, req.body.email, hashedPassword);
    }).then(({rows}) => {
        req.session.userId = rows[0].id;
        res.json({success: true});
    }).catch(function(err) {
        console.log("error in registration: ", err);
        res.json({success: false});
    });
});
/////////////////////////////////////////////////////
app.post('/welcome/login', (req, res)=>{
    console.log(req.body.email);
    var userId;
    console.log('req.session /welcome/login', req.session);
    console.log("req.body.email",req.body.email);
    return db.getLoginInfo(req.body.email).then(loginInfo =>{
        if(loginInfo.rows[0].id){
            userId = loginInfo.rows[0].id;
            return bcrypt.compare(req.body.password,loginInfo.rows[0].password);

        } else {
            res.json({notregistered: true});
        }
    }).then(()=> {
        req.session.userId = userId;
        res.json({success: true});
    }).catch(error =>{
        console.log("error in login page", error);
        res.json({success: false});
    });
});
/////////////////////////////////////////////
app.post('/updatebio', (req, res) => {
    const bio = req.body.biodraft;
    console.log('/updatebio userid hello:',req.session.userId);
    db.updateBio(bio, req.session.userId).then((data) => {
        res.json(data.rows[0].bio);
    }).catch(err => {
        console.log("error while updating bio: ", err);
        res.json({error: true});
    });


});
/////////////////////////////////////////////
app.get('/user/:id.json', (req, res)=>{
    console.log('req.params.id', req.params.id);
    if(req.session.userid== req.params.id){
        return res.json({redirectTo:'/'});
    }
    db.getUserInfo(req.params.id).then(data=>{
        console.log('data hjjhjkh:',data);
        res.json(data);
    }).catch(error=>{
        console.log('error in getting /user/:id.json:', error);
    });
});

///////////////////////////////////
app.get('/get-initial-status/:id',(req, res)=>{
    db.getInitialFriendship(req.session.userId,req.params.id).then((results)=>{
        console.log('resultsssssssssssss', results);
        res.json(results);
    }).catch(error=>{
        console.log('error in getInitialFriendship:', error);
    });
});
///////////////////////////////////////////
app.post('/addfriendship/:id', (req, res) => {
    console.log('in the friendship route');
    console.log('req.session.userI daddddddddddddddddddddd',req.session.userId);
    console.log('req.params.id please add ', req.params.id);
    db.addfriendship(req.session.userId, req.params.id).then((results) => {
        console.log("RESULTS resultssssssssssss",results);

        res.json(results);
    });
});
////////////////////////////////////
app.post('/deletefriendship/:id', (req, res) => {
    console.log('delete the friendship ');
    db.deletefriendship(req.session.userId, req.params.id).then((results) => {
        console.log(results);
        res.json(results);
    });
});
////////////////////////////
app.post('/acceptfriendship/:id', (req, res) => {
    console.log('accept the friendships');
    db.acceptfriendship(req.session.userId, req.params.id).then((results) => {
        console.log(results);
        res.json(results);
    });
});
////////////////////////////////////////////7
app.get('/friends/list', (req, res) => {
    db.getFriendshipLists(req.session.userId).then(results => {
        console.log('results in friendsList', results);
        res.json(results);
    }).catch(err => {
        console.log("error while getting friendshiplists: ", err);
    });
});
///////////////////////////////////
app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome');
});
/////////////////////////////////////////////////////
app.get('*', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});
////////////////////////////////////////////////////////////
server.listen(8080, function() {
    console.log("I'm listening.");
});
////////////////////////////socket////////////
//part 8 this obj will keep track of whos online right now
let onlineUsers ={};

// all of your server-side socket code
//goes inside here io.on
io.on('connection', function(socket){
//whenever a user logs in or register
// this calll back will run!!!
//part8 all the stuff you had in your session object should be
    console.log('socket.request.session:',socket.request.session);// everysocket we can assign then need id. so we can check what that id looks like.
    // socket is a object that represent the connection that just happen
    ////////////////////////////////





    onlineUsers[socket.id]= socket.request.session.userId;
    console.log('onlineUsers:',onlineUsers);
    let userIds = object.values(onlineUsers);
    //object.values takes all values out of an object
    // and puts them in array
    console.log('userIds:', userIds);

    db.getUsersByIds(userIds).then(results=>{

        //results then should be the first, last and profile pics of every user in the userIds arary
        //our endgoal is to put results in redux
    });
//user joined data flo
//new person joins. goto db and get loginInfo of the user just join
//once you have the object, BroadCast it.









//user left dataflow
socket.on('disconnect', function(){
    //when this function runs, that means some one has just left our webside
    // remove disconnected peron from onlineUsers Obj and remove them from redux
    // we have to every one know that person has just left
    //io.sockets.emit
    // so everybody update the redux accordingly
    //

});
////////////////////////////////////////
//     //send message from server to client using sockets
//     //emit ensds message from server to client
//     //first arg = name of the message we want to send
//     // second arg = the actual message we wnt too send
//
//     //emit sends a message to the socket that just connected
//     socket.emit('MyFirstEmit',{
//         name:'ivana'
//     });
//     //boardcast sends message to every connected socket
//     // EXCEPT the one that just connected
//     socket.broadcast.emit('myBroadcast', {
//         food:'sirnica'
//     });
//     // io.sckets.emit sends a message to everyone
//     io.sockets.emit('checkyourmessage', {
//         message:'you are loved'
//     });
// });
