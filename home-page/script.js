const logOutBtn = document.querySelector(".logOut-btn")
const IDelement = document.querySelector(".ID-el span")

const userName = JSON.parse( sessionStorage.getItem("ID") )

if ( !userName ) {
   window.open("../index.html", "_self")
}

IDelement.textContent += userName

logOutBtn.addEventListener("click", () => {
   sessionStorage.clear()

   window.open("../index.html", "_self")
})

const createQuizDiv = document.querySelector(".create-div")
const attendQuizDiv = document.querySelector(".attend-div") 
const responsesDiv = document.querySelector(".responses-div")
const resultsDiv = document.querySelector(".results-div")

attendQuizDiv.addEventListener("click", () => {
   window.open("../attend-quiz/attend.html", "_self")
})

createQuizDiv.addEventListener("click", () => {
   window.open("../create-quiz/create.html", "_self")
})

responsesDiv.addEventListener("click", () => {
   window.open("../responses-page/responses.html", "_self")
})

resultsDiv.addEventListener("click", () => {
   window.open("../results-page/results.html", "_self")
})