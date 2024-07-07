const logOutBtn = document.querySelector(".logOut-btn")

logOutBtn.addEventListener("click", () => {
   sessionStorage.clear()

   window.open("../index.html", "_self")
})

const createQuizDiv = document.querySelector(".create-div")
const attendQuizDiv = document.querySelector(".attend-div") 
const responsesDiv = document.querySelector(".responses-div")
const resultsDiv = document.querySelector(".results-div")

attendQuizDiv.addEventListener("click", () => {
   console.log("attend a quiz")
})

createQuizDiv.addEventListener("click", () => {
   window.open("../create-quiz/create.html", "_self")
})

responsesDiv.addEventListener("click", () => {
   console.log("see responses")
})

resultsDiv.addEventListener("click", () => {
   console.log("check results")
})