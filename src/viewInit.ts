export default function viewInit() {
  const msg = document.querySelector('.message');
  console.log(msg?.scrollHeight);
  if(msg?.scrollHeight) {
    msg.scrollTop = msg?.scrollHeight;
  }
}