let prevMin;
function setClock() {
  const clockContainer = document.querySelector("#clockContainer");
  const date = new Date();

  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  if (prevMin == null || minute != prevMin) {
    prevMin = minute;
    clockContainer.innerText = `${hour}:${minute}`;
  }
}

setClock();
setInterval(setClock, 1000);
