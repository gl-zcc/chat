import Header from './components/layout/head';
import styles from '../styles/Home.module.css'
import { io } from 'socket.io-client'
import http from './components/http';
import { useEffect, useState } from 'react';
import router from 'next/router';

const socket = io();

interface UserInfo {
  id: string,
  name: string
}

interface MsgInfo {
  userName: string,
  msg: string
}

async function logout(curUserName: string) {
  let res = await http('api/auth/logout')
  socket.emit('removeUser', curUserName);
  res.data.success ? router.push('/login') : '';
}

export default function Home() {
  const [userName, setUserName] = useState('')
  const [curUserName, setCurUserName] = useState('')
  const [sendText, setSendText] = useState('')
  const [userNameId, setUserNameId] = useState('')
  const [receiveText, setReceiveText] = useState<MsgInfo[]>([])
  const [userList, setUserList] = useState<UserInfo[]>([])


  useEffect(() => {

    async function getUser() {
      let res = await http('api/user');
      if (res.data.user) {
        socket.emit('userName', res.data.user?.userName);
        setCurUserName(res.data.user?.userName);
      } else {
        router.push('/login')
      }
    }

    getUser()

    socket.on('userList', res => {
      setUserList(res);
    })

    socket.on('private message', (userName, msg) => {
      setReceiveText([{ userName, msg }, ...receiveText])
    })

    return () => {
      socket.off('userList');
      socket.off('private message');
    }
  }, [receiveText]);




  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        我是{curUserName}
        <ul>
          {userList.map(item =>
            <li
              key={item.id}
              onClick={() => {
                setUserName(item.name);
                setUserNameId(item.id);
              }} >
              {item.name}
            </li>)
          }
        </ul>
        <p>当前发送给：{userName}</p>
        <input type="text" value={sendText} onChange={e => setSendText(e.target.value)} />
        <button
          onClick={() =>
            socket.emit('private message', {
              socketId: userNameId,
              userName: curUserName
            }, sendText)
          }>
          发送
        </button>
        {
          receiveText.map((item, key) =>
            <div key={key}>
              <span
                style={{ fontWeight: 'bold' }}>
                {item.userName}:
              </span>
              给你发:
              <span
                style={{ fontWeight: 'bold' }}>
                {item.msg}
              </span>
              <br />
            </div>)
        }
        <button
          onClick={() => {
            logout(curUserName);
          }}>
          退出
        </button>
      </main>
    </div >
  )
}
