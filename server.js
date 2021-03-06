const server = require('http').createServer((req, res) => {
  handle(req, res, req.url)
});
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let userList = [];

app.prepare().then(() => {

  server.listen(3333, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3333')
  })

  io.on('connection', socket => {
    console.log(socket.id)
    socket.on('connectUser', user => {
      console.log(`${user.userName}连接进来`);
      if (user) {
        if (!userList.map(item => item.userId).includes(user.id)) {
          userList.unshift({
            userName: user.userName,
            userId: user.id,
            socketId: socket.id
          });
        } else {
          userList.splice(userList.map(item => item.userId).indexOf(user.id), 1, {
            userName: user.userName,
            userId: user.id,
            socketId: socket.id
          });
        }
      }
      io.emit('userList', userList);
    })

    socket.on('removeUser', name => {
      console.log(`${name}连接断开`);
      if (userList.map(item => item.name).includes(name)) {
        userList.splice(userList.map(item => item.name).indexOf(name), 1);
      }
      io.emit('userList', userList);
    })

    socket.on("private message", (msg) => {
      console.log(msg);
      socket.volatile.to(msg.toSockedId).emit("private message", msg);
    });

    socket.on('event', data => {
      console.log('event', data);
    });

    socket.on('disconnect', (data) => {
      console.log('disconnect', data);
    });

    socket.on('createGroup', ({ groupName, selectUserList }) => {
      let id = +new Date()
      selectUserList.forEach(item => io.to(item.id).emit('joinGroup', {
        groupName,
        id
      }))
    })

    socket.on('joinGroup', res => {
      socket.join(res.id);
      console.log("加入群组：" + res.id);
    })

    socket.on('sendGroupMsg', res => {
      console.log(res);
      io.to(res.id).emit('groupMsg', res)
    })
  });

})

