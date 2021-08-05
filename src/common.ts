export function displayBottom() {
  setTimeout(function() {
    const msg = document.querySelector('.message');
    if (msg?.scrollHeight)
      msg.scrollTop = msg?.scrollHeight;
  })
}