

import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import ProTip from '../src/ProTip';
// import Link from '../src/Link';
// import Copyright from '../src/Copyright';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        {/* <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright /> */}
      </Box>
    </Container>
  );
}

/* import Header from './components/layout/head';
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
  const [groupName, setgroupName] = useState('')
  const [groupId, setGroupId] = useState('')
  const [groupMsg, setGroupMsg] = useState('')
  const [receiveText, setReceiveText] = useState<MsgInfo[]>([])
  const [userList, setUserList] = useState<UserInfo[]>([])
  const [selectUserList, setSelectUserList] = useState<UserInfo[]>([])


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

    socket.on('joinGroup', res => {
      socket.emit('joinGroup', res);
      setGroupId(res.id);
      setgroupName(res.groupName);
    })

    socket.on('groupMsg', res => {
      console.log(res);
      setGroupMsg(groupMsg + " " + res.userName +':'+ res.msg);
    })

    socket.on('private message', (userName, msg) => {
      setReceiveText([{ userName, msg }, ...receiveText])
    })

    return () => {
      socket.off('userList');
      socket.off('joinGroup');
      socket.off('groupMsg');
      socket.off('private message');
    }
  }, [receiveText,groupMsg]);




  return (
    <div>
      <Header />
      <main>
        我是{curUserName}
        <ul>
          {userList.map(item =>
            <li
              key={item.id}
              onClick={() => {
                setUserName(item.name);
                setUserNameId(item.id);
                setSelectUserList([item, ...selectUserList]);
              }} >
              {item.name}
            </li>)
          }
        </ul>
        <span>已选人员</span><button onClick={() => {
          let groupName = prompt("组名字", "组1");
          if (groupName) {
            socket.emit('createGroup', {
              groupName,
              selectUserList
            });
          }
        }}>创建房间</button>
        <ul>
          {selectUserList.map(item =>
            <li
              key={item.id}
              onClick={() => {
                setSelectUserList(selectUserList.filter(user => user.name !== item.name));
              }} >
              {item.name}
            </li>)
          }
        </ul>
        <div>
          <span>房间名称：{groupName}</span>
          <div>
            <span>房间消息：</span>
            {groupMsg}
          </div>
        </div>

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
        <button onClick={()=>{
           socket.emit('sendGroupMsg', {
            id: groupId,
            userName: curUserName,
            msg: sendText
          })
        }}>发送给组</button>
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
 */