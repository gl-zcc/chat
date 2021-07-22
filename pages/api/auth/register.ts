// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../unit/mongodb';

type Data = {
  msg: string,
  success: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { db } = await connectToDatabase();
  const insertResult = await db.collection("user")
    .insertMany([{
      userName: req.body.userName,
      password: req.body.password
    }])
  if (insertResult.insertedCount) {
    res.status(200).json({ success: true, msg: '注册成功' })
  } else {
    res.status(200).json({ success: false, msg: '注册失败' })
  }
}
