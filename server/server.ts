import express, { Application } from 'express';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

const path = require('path');

export class Server {
  private httpServer: HTTPServer;
  private app: Application;
  private io: SocketIOServer;
  private nameToSocket: Map<string, string> = new Map();
  private activeCalls: Map<string, string> = new Map();

  private readonly DEFAULT_PORT = process.env.PORT || 5000;

  private readonly namegenConfig: Config = {
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2,
  };

  constructor() {
   this.app = express();
   this.httpServer = createServer(this.app);
   this.io = socketIO(this.httpServer);

   this.configureApp();
   this.handleSocketConnection();
  }

  public listen(callback: (port: string|number) => void): void {
   this.httpServer.listen(this.DEFAULT_PORT, () =>
     callback(this.DEFAULT_PORT)
   );
  }

  private handleSocketConnection(): void {
   this.io.on('connection', socket => {
      var nickname = uniqueNamesGenerator(this.namegenConfig);

      while (this.nameToSocket.get(nickname) !== undefined) {
        nickname = uniqueNamesGenerator(this.namegenConfig);
      }
      this.nameToSocket.set(nickname, socket.id);

      socket.emit('update-user-name', {
        name: nickname
      });

      socket.on('call-user', (data: any) => {
        const socketId = this.nameToSocket.get(data.to);
        if (socketId === undefined) {
          socket.emit('called-offline-user', {});
          return;
        }

        socket.emit('called-online-user', {});
        socket.to(socketId!).emit('call-made', {
          offer: data.offer,
          name: nickname
        });
        this.activeCalls.set(data.to, nickname);
        this.activeCalls.set(nickname, data.to);
      });

      socket.on('share-screen', (data: any) => {
        const socketId = this.nameToSocket.get(data.to);
        if (socketId === undefined) return;

        socket.to(socketId!).emit('share-screen-made', {
          offer: data.offer,
        });
      });

      socket.on('make-share-screen-answer', (data: any) => {
        const socketId = this.nameToSocket.get(data.to);
        if (socketId === undefined) return;

        socket.to(socketId!).emit('share-screen-answer-made', {
          answer: data.answer,
        });
      });

      socket.on('end-share-screen', (data: any) => {
        const socketId = this.nameToSocket.get(data.to);
        if (socketId === undefined) return;

        socket.to(socketId!).emit('share-screen-ended', {});
      });

      socket.on('make-answer', data => {
        const socketId = this.nameToSocket.get(data.to);
        if (socketId === undefined) return;

        socket.to(socketId!).emit('answer-made', {
          name: nickname,
          answer: data.answer
        });
      });

      socket.on('reject-call', data => {
        const socketId = this.nameToSocket.get(data.from);
        if (socketId === undefined) return;

        socket.to(socketId!).emit('call-rejected', {});
        this.activeCalls.delete(data.from);
        this.activeCalls.delete(nickname);
      });

      socket.on('end-call', data => {
        const socketId = this.nameToSocket.get(data.name);
        if (socketId === undefined) return;

        socket.to(socketId!).emit('end-call', {});
        this.activeCalls.delete(data.name);
        this.activeCalls.delete(nickname);
      });

      socket.on('disconnect', () => {
        this.nameToSocket.delete(nickname);
        const callee = this.activeCalls.get(nickname);
        if (callee !== undefined) {
          const socketId = this.nameToSocket.get(callee);
          if (socketId !== undefined) {
            socket.to(socketId!).emit('end-call', {});
          }
          this.activeCalls.delete(callee);
        }
        this.activeCalls.delete(nickname);
      });
    });
  }

  private httpsRedirect(req: express.Request, res: express.Response,
    next: express.NextFunction) {

    if (process.env.NODE_ENV === 'production') {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        res.redirect('https://' + req.hostname + req.originalUrl);
      }
      else {
        next();
      }
    } else {
      next();
    }
  }

  private configureApp(): void {
    this.app.use(this.httpsRedirect);
    this.app.use(express.static(path.join(__dirname, '../client/build')));
  };
}
