import router  from 'next/router'
import { useState } from 'react'
import http from '../components/http'

export default function About() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userList, setUserList] = useState('');
  async function login() {
    let result = await http.post('api/auth/login',{userName,password});
    alert(result.data.msg)
    if(result.data.success) {
      router.push('/')
    }
  }
  async function getUserList() {
    let result = await http.get('api/user');
    console.log(result);
    setUserList(result.data);
  }
  return (
    <div>
      <input value={userName} onChange={(event) => setUserName(event.target.value)} />
      <br />
      <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
      <br />
      <button onClick={login}>登录</button>
      <button onClick={getUserList}>获取登录用户</button>
      {/* {userList} */}
    </div>
  )
}
