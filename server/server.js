const app = require("express")();
const httpServer = require("http").createServer(app);
const port = process.env.port || 4002;
const options = { 
  cors: {
    origin: '*',
  }, 
};
const io = require("socket.io")(httpServer, options);

let players = [];

io.on("connection", socket => { 

  socket.on('addPlayer', data => {

    const { room, user } = data;
    socket.join(room);
    players.push({
      room: room,
      name: user.name,
      id: socket.id,
      point: 0,
      qualified: false
    });
    socket.emit('updateUser', {
      room: room,
      name: user.name,
      id: socket.id,
      point: 0,
      qualified: false
    });
    broadcastPlayers(room);
  });

  socket.on('selectCard', (data) => {

    const { room, point } = data;
    players.forEach(player => {
      if (player.id === socket.id) {
        player.point = point;
        player.qualified = true;
      }
    });
    broadcastPlayers(room);
  });

  socket.on('cleanPoints', (data) => {

    const { room } = data;
    const showEstimates = true;
    players.forEach(player => {
      if (player.room === room) {
        player.point = 0;
        player.qualified = false;
      }
    });
    io.sockets.in(room).emit('onShowEstimates', showEstimates);
    broadcastPlayers(room);
  });

  socket.on('deletePlayers', (data) => {

    const { room } = data;
    console.log(room);
    players = players.filter(player => player.room !== room);
    broadcastPlayers(room);
  });

  socket.on('showEstimates', (data) => {
    const { room, showEstimates } = data;
    io.sockets.in(room).emit('onShowEstimates', showEstimates);
  });

  socket.on("disconnect", (data) => {

    players = players.filter(player => player.id !== socket.id);

  });

});

const broadcastPlayers = ( room ) => {

  let playersFilter = players.filter(player => player.room === room);
  io.sockets.in(room).emit('onGetPlayers', playersFilter);
}




httpServer.listen(port, (err) => {
  if(err) console.log(err.message);
  console.log(`App listen in port ${ port }`);
});



