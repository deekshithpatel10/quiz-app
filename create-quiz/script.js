const homeBtn = document.querySelector(".home-btn")
const IDelement = document.querySelector(".ID-el span")

const userName = JSON.parse( sessionStorage.getItem("ID") )
IDelement.textContent += userName

homeBtn.addEventListener("click", () => {
   window.open("../home-page/home.html", "_self")
})