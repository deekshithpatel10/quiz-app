

const logOutBtn = document.querySelector(".logOut-btn")

logOutBtn.addEventListener("click", () => {
   sessionStorage.clear()

   window.open("../index.html", "_self")
})