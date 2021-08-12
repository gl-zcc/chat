import http from '../pages/components/http'

async function getMessage(id: string) {
  let res = await http.get('api/message/getMessage', {
    params: {
      receiveId: id,
      sendUserId: id
    }
  });
  return res.data.data;
}

export {
  getMessage
}