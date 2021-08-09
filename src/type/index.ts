import { Color } from '@material-ui/lab/Alert';

export type UserInfo = {
  userId: string
  userName: string
  socketId: string
}

export type ViewInfo = {
  disabled?: boolean
  sendText?: string
}

export type MsgType = {
  sendText?: string
  toSockedId?: string
  receiveId?: string
  receiveUser?: string
  sendUser?: string
  sendUserId?: string
}

export type Msg = {
  [propName: string]: MsgType[]
}

export type User = {
  id: string,
  userName?: string
  toSockedId?: string
}

export type Alart = {
  open: boolean
  msg: string
  severity: Color
}