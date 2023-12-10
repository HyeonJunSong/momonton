//0 : folded
//1 : signin form
//2 : welcome
let user_mode = 0;

function init() {
  const loggedInUser = window.localStorage.getItem("loggedInUser");
  if (loggedInUser !== null && loggedInUser.length > 0) {
    document.querySelector("#mode2").innerText = `Welcome, ${loggedInUser}!`;
    changeUserMode(2);
  }
}
init();

function changeUserMode(mode) {
  const userContainer = document.querySelector("#userContainer");
  userContainer.className = `userMode${mode}`;

  for (let i = 0; i < 3; i++) {
    if (i == mode) {
      userContainer.querySelector(`#mode${i}`).className = "";
    } else {
      userContainer.querySelector(`#mode${i}`).className = "hide";
    }
  }
}

function setMode0Event() {
  const img = document.querySelector("#userContainer #mode0 img");
  img.addEventListener("click", () => {
    changeUserMode(1);
  });
}
function setMode1Event() {
  function trySignIn({ username, password }) {
    const users = JSON.parse(window.localStorage.getItem("users"));

    //username exists
    if (users !== null && users[username] !== undefined) {
      if (users[username] === password) {
        return true;
      } else {
        alert("incorrect password");
        return false;
      }
    }
    //username doesn't exist
    else {
      //user table doesn't exist
      if (users === null) {
        const newUsers = {};
        newUsers[username] = password;
        window.localStorage.setItem("users", JSON.stringify(newUsers));
      }
      //usertable exists
      else {
        users[username] = password;
        window.localStorage.setItem("users", JSON.stringify(users));
      }

      return true;
    }
  }

  const img = document.querySelector("#userContainer #mode1 img");
  img.addEventListener("click", () => {
    changeUserMode(0);
  });

  document
    .querySelector("#userContainer #mode1 form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const username = event.target.querySelector(".username").value;
      const password = event.target.querySelector(".password").value;

      if (trySignIn({ username, password })) {
        event.target.querySelector(".username").value = "";
        event.target.querySelector(".password").value = "";

        document.querySelector("#mode2").innerText = `Welcome, ${username}!`;

        window.localStorage.setItem("loggedInUser", username);
        changeUserMode(2);
      }
    });
}
function setMode2Event() {
  document.querySelector("#mode2").addEventListener("click", () => {
    changeUserMode(0);
    window.localStorage.setItem("loggedInUser", "");
  });
}
setMode0Event();
setMode1Event();
setMode2Event();
