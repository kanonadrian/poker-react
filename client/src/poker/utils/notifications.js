import io from 'socket.io-client';

let socket;
export const initiateSocket = (room, user) => {
    socket.emit('addPlayer', { room, user });

}
export const disconnectSocket = () => {
  if(socket) socket.disconnect();
}
//EMIT
export const selectCard = ( room, point, user ) => {

    socket.emit('selectCard', { room, point, user });
}
export const emitShowEstimates = (room, showEstimates) => {

  socket.emit('showEstimates', { room, showEstimates });

}
export const deleteEstimates = (room, showEstimates) => {
  socket.emit('cleanPoints', { room });
}
export const deletePlayers = ( room ) => {
  socket.emit('deletePlayers', { room });
}
//ON
export const onGetPlayers = (cb) => {
    if (!socket) return(true);
    socket.on('onGetPlayers', (data) => {
      return cb(data);
    });
}
export const onUpdateUser = (cb) => {
    if (!socket) return(true);
    socket.on('updateUser', (data) => {
      return cb(data);
    });
}

export const onShowEstimates = (cb) => {
    if (!socket) return(true);
    socket.on('onShowEstimates', (data) => {
      return cb(data);
    });
}



export const sendMessage = (room, message) => {
//   if (socket) socket.emit('chat', { message, room });
}