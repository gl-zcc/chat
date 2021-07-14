import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { io } from 'socket.io-client'
import http from './components/http';
import { useState } from 'react';
import router from 'next/router';

const socket = io();

let curUserName = '';

getUser()

async function getUser() {
  let res = await http('api/user');
  res.data.user ?
    socket.emit('userName', curUserName = res.data.user?.userName) :
    router.push('/login')
}

interface UserInfo {
  id: string,
  name: string
}

interface MsgInfo {
  userName: string,
  msg: string
}

export default function Home() {
  const [userName, setUserName] = useState('')
  const [sendText, setSendText] = useState('')
  const [userNameId, setUserNameId] = useState('')
  const [receiveText, setReceiveText] = useState<MsgInfo[]>([])
  const [userList, setUserList] = useState<UserInfo[]>([])

  socket.on('userList', res => {
    setUserList(JSON.parse(res));
    console.log(res);
  })

  socket.on('private message', (userName, msg) => {
    console.log(userName, msg);
    
    setReceiveText([{userName,msg},...receiveText])
    console.log(receiveText);
  })


  return (
    <div className={styles.container}>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        我是首页{curUserName}
        <ul>
          {userList.map(item => <li onClick={() => {
            setUserName(item.name);
            setUserNameId(item.id);
          }} key={item.id}>{item.name}</li>)}
        </ul>
        <p>当前发送给：{userName}</p>
        <input type="text" value={sendText} onChange={e => setSendText(e.target.value)} />
        <button onClick={() => {
          socket.emit('private message', {
            socketId: userNameId,
            userName: curUserName
          }, sendText)
        }}>发送</button>
        {receiveText.map(item=><><span style={{fontWeight: 'bold'}}>{item.userName}:</span>给你发:<span style={{fontWeight: 'bold'}}>{item.msg}</span><br /></>)}
        <button onClick={() => {
          socket.emit('removeUser', userName)
        }}>断开</button>
      </main>
    </div >
  )
}
