const shareBox = document.querySelector(".share-box");
const shareButton = document.querySelector(".share-btn");

shareButton.addEventListener("click", () => {
  shareBox.classList.toggle("hide");
});
