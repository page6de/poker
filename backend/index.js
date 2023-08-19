const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);1
const cors = require('cors');
const { Server } = require("socket.io");


const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.static('public'));

app.get('/room/:roomId', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/createRoom', (req, res) => {
  const sockets = io.of('/').adapter.rooms;
  res.send({
    roomId: '123456abc'
  })
});


let users = {};

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', (payload) => {
    console.log('user disconnected', socket.id);
    if (users[socket.id]) {
      const roomId = users[socket.id].room;
      delete users[socket.id];
      updateUserForRoom(roomId)
    }
  });

  socket.on('enterRoom', (msg) => {
    const user = { id: socket.id, room: msg.room, name: msg.name, vote: '' };
    socket.join(msg.room)
    users[socket.id] = user;
    updateUserForRoom(user.room);
  });

  socket.on('vote', (msg) => {
    let user = users[socket.id];
    if (user) {
      user.vote = msg;
      io.to(user.room).emit('vote', user);
    }
  });

  socket.on('showCards', (payload) => {
    let user = users[socket.id];
    // id Admin
    if (user) {
      io.to(user.room).emit('showCards', payload );
    }
  });

  socket.on('resetVotes', (payload) => {
    let user = users[socket.id];
    if (user) {
      let usersInRoom = getUserInRoom(user.room) 
      // if Admin
      for(let i in usersInRoom) {
        usersInRoom[i].vote = '';
      };
      io.to(user.room).emit('resetVotes', { users: usersInRoom });
    }
  });

});






// Events
/*
connect
disconnect
enterRoom <-
usersUpdate ->
-> showCards -> 
-> reset -> 

*/


server.listen(3000, () => {
  console.log('listening on *:3000');
});



// SocketHelper
function getUserInRoom(roomId) {
  let roomUser = []
  io.of('/').adapter.sids.forEach((set) => {
    const [sid, rid] = set;
    if (users[sid] && users[sid].room == roomId) roomUser.push(users[sid]);
  });
  return roomUser
}

function updateUserForRoom(roomId) {
  const roomUser = getUserInRoom(roomId);
  io.to(roomId).emit('updateUser', { users: roomUser });
} 