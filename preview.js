const adFrames = Array.from(document.querySelectorAll('.preview__frame'));
const loadedFrames = new Set();
let startSent = false;

const sendStartWhenReady = () => {
  if (startSent || loadedFrames.size !== adFrames.length) {
    return;
  }

  startSent = true;
  adFrames.forEach((frame) => {
    frame.contentWindow.postMessage('start-ad', '*');
  });
};

if (adFrames.length !== 3) {
  throw new Error('Preview requires exactly three ad iframes.');
}

adFrames.forEach((frame) => {
  frame.addEventListener('load', () => {
    loadedFrames.add(frame);
    sendStartWhenReady();
  }, { once: true });
});

window.addEventListener('load', () => {
  adFrames.forEach((frame) => loadedFrames.add(frame));
  sendStartWhenReady();
}, { once: true });
