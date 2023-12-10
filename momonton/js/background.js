function setBackground(src) {
  const bodyContainer = document.querySelector("body");
  bodyContainer.style.backgroundImage = `url(${src})`;
}

const IMG_NUM = 10;

function setRandomBackground() {
  const randomNum = Math.floor(Math.random() * IMG_NUM);
  setBackground(`assets/imgs/${randomNum}.jpeg`);
}
setRandomBackground();
