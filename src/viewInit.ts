export default function viewInit() {
  const msg = document.querySelector('.message');
  if (msg?.scrollHeight)
    msg.scrollTop = msg?.scrollHeight;
}