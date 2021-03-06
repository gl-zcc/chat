import { NextApiRequest, NextApiResponse } from "next";
import { withIronSession, Session } from "next-iron-session";
import { connectToDatabase } from "../../../unit/mongodb";
type NextIronRequest = NextApiRequest & { session: Session };

export default withIronSession(async function login(req: NextIronRequest, res: NextApiResponse): Promise<void> {
  res.status(200)
  const { db } = await connectToDatabase();
  const queryResult = await db.collection("user")
    .find({
      userName: req.body.userName,
      password: req.body.password
    }).toArray();
  if (queryResult.length) {
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