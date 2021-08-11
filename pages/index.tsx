import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

import viewInit from '../src/viewInit'
import { displayBottom } from '../src/common'
import http from '../pages/components/http'
import { io } from 'socket.io-client'
import router from 'next/router'
import { UserInfo, ViewInfo, MsgType, Msg, User } from '../src/type'

import img1 from '../styles/images/1.jpg'

const socket = io();

export default function Index() {

  const [userList, setUserList] = useState<UserInfo[]>([])
  const [receiveUser, setReceiveUser] = useState<User>({
    id: ''
  })
  const [curUser, setCurUser] = useState<User>({
    id: ''
  })
  const [msg, setMsg] = useState<Msg>({})
  const [curMsg, setCurMsg] = useState<MsgType[]>([])
  const [viewState, setViewState] = useState<ViewInfo>({
    disabled: true,
    sendText: ''
  })

  useEffect(() => {
    viewInit()
    socket.on('userList', res => {
      setUserList(res.filter((item: { userId: string; }) => item.userId !== curUser.id))
    })
    socket.on('private message', (res) => {
      if (!msg[res.sendUserId]) {
        msg[res.sendUserId] = [];
      }
      msg[res.sendUserId].push(res);
      setMsg(msg);
      if (res.sendUserId === receiveUser.id) {
        curMsg.push(res);
        setCurMsg(curMsg.slice());
        displayBottom();
      }
    })
    return () => {
      socket.off('userList');
      socket.off('private message');
    };
  }, [receiveUser, curMsg, msg, curUser]);

  useEffect(() => {
    async function getUser() {
      let res = await http('api/user');
      if (res.data.user) {
        socket.emit('connectUser', res.data.user);
        const { id, userName } = res.data.user;
        setCurUser({
          id,
          userName
        })
        getMessage(id);
      } else {
        router.push('/login')
      }
    }
    async function getMessage(id: string) {
      let res = await http.get('api/message/getMessage', {
        params: {
          receiveId: id,
          sendUserId: id
        }
      });
      res.data.data.forEach((item: MsgType) => {
        if (item.receiveId === id) {
          if (!msg[item.sendUserId]) {
            msg[item.sendUserId] = [];
          }
          msg[item.sendUserId].push(item);
        } else {
          if (!msg[item.receiveId]) {
            msg[item.receiveId] = [];
          }
          msg[item.receiveId].push(item);
        }
      })
      setMsg(Object.assign(msg));
    }
    getUser()
  }, [msg])

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
                <ListItem key={item.userId}
                  button
                  onClick={() => {
                    setReceiveUser({
                      id: item.userId,
                      userName: item.userName,
                      toSockedId: item.socketId
                    })
                    setCurMsg(msg[item.userId] ? msg[item.userId].slice() : [])
                    displayBottom();
                    setViewState({
                      disabled: false
                    })
                  }}
                  alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar variant="rounded" alt="" src="" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.userName}
                    secondary={msg[item.userId] ? msg[item.userId][msg[item.userId].length - 1].sendText : ''}
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
            {
              curMsg.map((item: any, key: number) => {
                const direction = item.sendUserId === curUser.id ? 'receiver' : 'sender'
                return (<div key={key} className={`chat-${direction}`}>
                  <div>
                    <img alt="" src={img1.src} />
                  </div>
                  <div>{item.sendUser}</div>
                  <div>
                    <div className={`chat-${direction}-triangle`}></div>
                    <span>{item.sendText}</span>
                  </div>
                </div>)
              })
            }
          </div>
          <div className={'send-info'}>
            <textarea disabled={viewState.disabled}
              value={viewState.sendText}
              onChange={e => setViewState({
                sendText: e.target.value
              })}
              style={{
                width: '100%'
              }} name="" id="" cols={30} rows={8}></textarea>
            <div style={{
              float: 'right'
            }}>
              <Button disabled={!Boolean(viewState.sendText)} onClick={() => {
                let sendInfo = {
                  sendText: viewState.sendText,
                  toSockedId: receiveUser.toSockedId,
                  receiveId: receiveUser.id,
                  receiveUser: receiveUser.userName,
                  sendUser: curUser.userName,
                  sendUserId: curUser.id,
                  sendTime: +new Date()
                }
                socket.emit('private message', sendInfo)
                if (!msg[receiveUser.id]) {
                  msg[receiveUser.id] = [];
                }
                msg[receiveUser.id].push(sendInfo);
                curMsg.push(sendInfo);
                setMsg(msg);
                setCurMsg(curMsg.slice());
                displayBottom();
                setViewState({
                  sendText: ''
                })
                http.post('api/message/sendMessage', sendInfo)
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