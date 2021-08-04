
import http from '../pages/components/http'
import { io } from 'socket.io-client'
import router from 'next/router'

const socket = io();

function message(props: any) {
  async function getUser() {
    let res = await http('api/user');
    if (res.data.user) {
      socket.emit('connectUser', res.data.user);
      props.getCurUser(res.data.user);
    } else {
      router.push('/login')
    }
  }
  getUser()
  socket.on('userList', res => {
    props.getUserList(res);
  })

  socket.on('joinGroup', res => {
    // socket.emit('joinGroup', res);
    // setGroupId(res.id);
    // setgroupName(res.groupName);
  })

  socket.on('groupMsg', res => {
    // console.log(res);
    // setGroupMsg(groupMsg + " " + res.userName +':'+ res.msg);
  })

  socket.on('private message', (msg) => {
    props.receiveMsg(msg)
  })
}

function sendMsg(props: any) {
  socket.emit('private message', props)
}

function cancelMessage() {
  socket.off('userList');
  socket.off('joinGroup');
  socket.off('groupMsg');
  socket.off('private message');
}

export {
  message,
  cancelMessage,
  sendMsg
}