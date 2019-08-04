var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.origins("*:*")
// io.origins('http://localhost:8100/*')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    
})

    

    io.on('connection', function(socket){
        socket.on('chat message', function(msg){
           io.emit('chat message', msg);
        socket.broadcast.emit('hi');
         });
         socket.on('disconnect', function(){
           console.log('user disconnected');
         });
        });
        

app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html');
  // return res.send({message:'true'})
});


http.listen(3000, function(){
 console.log('listening on *:3000');
});


// let app = require('express')();
// let http = require('http').Server(app);
// let io = require('socket.io')(http);
 
// io.on('connection', (socket) => {
  
//   socket.on('disconnect', function(){
//     io.emit('users-changed', {user: socket.nickname, event: 'left'});   
//   });
 
//   socket.on('set-nickname', (nickname) => {
//     socket.nickname = nickname;
//     io.emit('users-changed', {user: nickname, event: 'joined'});    
//   });
  
//   socket.on('add-message', (message) => {
//       console.log(message , "")
//     io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
//   });
// });
 
// var port = process.env.PORT || 3000;
 
// http.listen(port, function(){
//    console.log('listening in http://localhost:' + port);
// });