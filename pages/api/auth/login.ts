export default function login(req: any, res: any) {
  res.status(200)
  if (req.body.userName === 'zcc' && req.body.password === 'zcc') {
    res.json({ success: true, msg: '登录成功' });
  } else {
    res.json({ success: false, msg: '登录失败、检查账号密码' });
  }
}