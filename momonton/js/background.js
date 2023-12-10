function setBackground(src) {
  const bodyContainer = document.querySelector("body");
  bodyContainer.style.backgroundImage = `url(${src})`;
}

setBackground("assets/imgs/0.jpeg");
