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
  const { sendText, receiveId, receiveUser, sendUser, sendUserId, sendTime } = req.body;
  const insertResult = await db.collection("message")
    .insertMany([{
      sendText,
      receiveId,
      receiveUser,
      sendUser,
      sendUserId,
      sendTime
    }])
  if (insertResult.insertedCount) {
    res.status(200).json({ success: true, msg: '操作成功' })
  } else {
    res.status(200).json({ success: false, msg: '操作失败' })
  }
}
