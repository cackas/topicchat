import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            socket.on('joinRoom', (topic) => {
                socket.join(topic);
            });

            socket.on('leaveRoom', (topic) => {
                socket.leave(topic);
            });

            socket.on('message', ({ topic, text }) => {
                io.to(topic).emit('message', { text });
            });
        });
    }
    res.end();
}
