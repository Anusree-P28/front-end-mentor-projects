const newsLetterCard = document.querySelector(".newsletter-card");
const successMsgContainer = document.querySelector(".success-msg-container");
const inputField = document.querySelector("#email");
const subscriptionBtn = document.querySelector(".sub-btn");
const dismissBtn = document.querySelector(".dismiss-btn");
const validEmail = document.getElementsByTagName("span")[0];

function isValidEmail(email) {
  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

subscriptionBtn.addEventListener("click", () => {
  const email = inputField.value;

  if (email === "" || !isValidEmail(email)) {
    validEmail.classList.remove("hide");
    inputField.style.backgroundColor = "hsla(4, 100%, 67%, 0.2)";
    inputField.style.border = "1px solid hsla(4, 100%, 67%, 1)";
    inputField.style.color="var(--tomato)"
  } else {
    newsLetterCard.classList.add("hide");
    successMsgContainer.classList.remove("hide");
    validEmail.classList.add("hide");
    inputField.style.backgroundColor = "var(--white)";
    inputField.style.border = "0.5px solid var(--grey)";
    
  }
});

dismissBtn.addEventListener("click", () => {
  newsLetterCard.classList.remove("hide");
  successMsgContainer.classList.add("hide");
  inputField.value = "";
});
