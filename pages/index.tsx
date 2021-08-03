import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

import viewInit from '../src/viewInit'
import { message, cancelMessage, sendMsg } from '../src/message';

type UserInfo = {
  id: string,
  name: string
}

export default function Index() {

  const [userList, setUserList] = useState<UserInfo[]>([])
  const [receiveUser, setReceiveUser] = useState({
    id: '',
    userName: ''
  })
  const [curUser, setCurUser] = useState({
    id: '',
    userName: ''
  })
  const [msg, setMsg] = useState({})
  const [sendText, setSendText] = useState('')

  useEffect(() => {
    viewInit()
    message({
      getCurUser: (res: any) => {
        setCurUser({
          id: '',
          userName: res
        })
      },
      getUserList: (res: any) => {
        setUserList(res)
      },
      receiveMsg: (msg: any) => {
        console.log(msg)
        if (!msg[receiveUser.id]) {
          msg[receiveUser.id] = [];
        }
        msg[receiveUser.id].push(msg);
      }
    });
    return () => {
      cancelMessage();
    };
  }, []);

  return (
    <Container className={'chat'} maxWidth="md">
      <Grid container>
        <Grid item xs={1}>
          <div className={'user-info'}>
            <Avatar variant="rounded" alt="zcc" src="" />
            <div className={'status normal'}></div>
          </div>
        </Grid>
        <Grid className={'user-list'} item xs={3}>
          <div className={'search-view'}>
            <InputBase className={'search-input'} placeholder="搜索" />
          </div>
          <List>
            {
              userList.map(item =>
                <ListItem key={item.id}
                  button
                  onClick={() =>
                    setReceiveUser({
                      id: item.id,
                      userName: item.name
                    })
                  }
                  alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar variant="rounded" alt="" src="" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary=""
                  />
                </ListItem>
              )
            }
          </List>
        </Grid>
        <Grid item xs={8}>
          <div className={'msg-header'}>
            {receiveUser.userName}
          </div>
          <div className={'message'}>
            {msg[receiveUser.id]?.map((item: any, key: number) => {
              const direction = item.sendUser === curUser.userName ? 'right' : 'left'
              return (<div key={key} className={`msg-${direction}`}>
                <Avatar style={{
                  float: direction
                }} variant="rounded" alt="" src="" />
                <div style={{
                  textAlign: direction
                }} className={'msg-user'}>
                  {item.sendUser}
                </div>
                <div className={'msg-content'}>
                  {item.sendText}
                </div>
              </div>)
            })}
            {/* <div className={'msg-left'}>
              <Avatar style={{
                float: 'left'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div>
            <div className={'msg-right'}>
              <Avatar style={{
                float: 'right'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div>
            <div className={'msg-left'}>
              <Avatar style={{
                float: 'left'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div>
            <div className={'msg-right'}>
              <Avatar style={{
                float: 'right'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div>
            <div className={'msg-left'}>
              <Avatar style={{
                float: 'left'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div>
            <div className={'msg-right'}>
              <Avatar style={{
                float: 'right'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div>
            <div className={'msg-left'}>
              <Avatar style={{
                float: 'left'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div>
            <div className={'msg-right'}>
              <Avatar style={{
                float: 'right'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div>
            <div className={'msg-left'}>
              <Avatar style={{
                float: 'left'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div>
            <div className={'msg-right'}>
              <Avatar style={{
                float: 'right'
              }} variant="rounded" alt="zcc" src="" />
              <div className={'msg-content'}>
                消息1消息1消息1消息1消息1消息1消息1
              </div>
            </div> */}
          </div>
          <div className={'send-info'}>
            <textarea
              value={sendText}
              onChange={e => setSendText(e.target.value)}
              style={{
                width: '100%'
              }} name="" id="" cols="30" rows="10"></textarea>
            <div style={{
              float: 'right'
            }}>
              <Button onClick={e => {
                let sendInfo = {
                  sendText,
                  receiveId: receiveUser.id,
                  receiveUser: receiveUser.userName,
                  sendUser: curUser.userName
                }
                sendMsg(sendInfo);
                if (!msg[receiveUser.id]) {
                  msg[receiveUser.id] = [];
                }
                msg[receiveUser.id].push(sendInfo);
                setMsg(msg);
              }} variant="contained" color="primary">
                发送
              </Button>
            </div>
          </div>

        </Grid>
      </Grid>
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