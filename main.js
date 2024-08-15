const container = document.getElementById("container");
const imageOne = document.querySelector(".image-1");
const imageTwo = document.querySelector(".image-2");
const btnYes = document.querySelector(".btn-yes");
const btnNo = document.querySelector(".btn-no");
const floatingMessagesContainer = document.getElementById("floating-messages");

let messageIndex = 0;
let btnNoActive = true;
const floatingMessages = [
  "Oh vamos Choi dale al sí 2 veces, no quieres ver mis tetas",
  "Na Choi, si no lo haces en 20 segundos solo aparecera la contraseña",
  "Que le des al Sí 2 veces ptmr, por algo me tome foto a escondidas 😭 ",
  "Se le va el tiempooo, vete a vrg Choi... ni mas me tomare fotos para ti",
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveButton() {
  if (!btnNoActive) return;

  const containerHeight = container.getBoundingClientRect().height;
  const containerWidth = container.getBoundingClientRect().width;
  const btnHeight = btnNo.getBoundingClientRect().height;
  const btnWidth = btnNo.getBoundingClientRect().width;
  const btnTop = btnNo.getBoundingClientRect().top;
  const btnLeft = btnNo.getBoundingClientRect().left;

  let newTop = btnTop;
  let newLeft = btnLeft;

  while (Math.abs(newTop - btnTop) < containerHeight / 3) {
    newTop = getRandomNumber(0, containerHeight - btnHeight);
  }

  while (Math.abs(newLeft - btnLeft) < containerWidth / 3) {
    newLeft = getRandomNumber(0, containerWidth - btnWidth);
  }

  btnNo.style.top = Math.floor(newTop) + "px";
  btnNo.style.left = Math.floor(newLeft) + "px";
}

btnNo.addEventListener("mouseover", moveButton);
btnNo.addEventListener("touchstart", moveButton);

function showFloatingMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.className = "floating-message";
  messageElement.innerHTML = `
    <span>${message}</span>
    <button class="close-btn">X</button>
  `;

  floatingMessagesContainer.appendChild(messageElement);

  const closeButton = messageElement.querySelector(".close-btn");
  closeButton.addEventListener("click", () => {
    floatingMessagesContainer.removeChild(messageElement);
  });

  setTimeout(() => {
    if (floatingMessagesContainer.contains(messageElement)) {
      floatingMessagesContainer.removeChild(messageElement);
    }
  }, 5000);
}

function handleMessages() {
  if (messageIndex < floatingMessages.length) {
    showFloatingMessage(floatingMessages[messageIndex]);
    messageIndex++;
    setTimeout(handleMessages, 10000);
  } else {
    activateBtnNo();
  }
}

function activateBtnNo() {
  btnNoActive = false;
  btnNo.style.transition = "none";
  btnNo.removeEventListener("mouseover", moveButton);
  btnNo.removeEventListener("touchstart", moveButton);

  btnNo.addEventListener("click", () => {
    showSuccessMessage();
  });
}

function showSuccessMessage() {
  const successMessage = document.createElement("div");
  successMessage.id = "success-message";
  successMessage.innerHTML = `
    <img src="assets/Fayeowo1.jpg" alt="Success" />
    <p>Choii nouuuu 🤧 aqui estarian mis tetas, pero te demorastes una eternidad, que le costaba darle al Si 2 veces unu... ahh pero Faye tienes unas tetas mas ricas que las mías aaaaa ni modo la contraseña es:</p>
    <p>Amigasporsiempre</p>
    <br>
    <a href="https://yeimi-owo.github.io/login_Choi/" class="return-link">Volver</a>
  `;


  document.body.appendChild(successMessage);
  successMessage.style.display = "block";
}

setTimeout(handleMessages, 10000);
