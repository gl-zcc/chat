import { NextApiRequest, NextApiResponse } from "next";
import { withIronSession, Session } from "next-iron-session";
type NextIronRequest = NextApiRequest & { session: Session };

export default withIronSession(async function login(req: NextIronRequest, res: NextApiResponse): Promise<void> {
  res.status(200)
  if ((req.body.userName === 'zcc' || req.body.userName === 'gl') && req.body.password === 'zcc') {
    req.session.set("user", {
      id: req.body.userName,
      userName: req.body.userName,
      admin: true,
    });
    await req.session.save();
    res.json({ success: true, msg: '登录成功' });
  } else {
    res.json({ success: false, msg: '登录失败、检查账号密码' });
  }
}, {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "chat_token",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
})