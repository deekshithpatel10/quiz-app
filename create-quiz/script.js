// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js'
import { getFirestore, collection, getDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ0PiBT41ebpjkfvcbMUU9ivd0PGn2IEE",
  authDomain: "quiz-webapp-247fd.firebaseapp.com",
  projectId: "quiz-webapp-247fd",
  storageBucket: "quiz-webapp-247fd.appspot.com",
  messagingSenderId: "817263869607",
  appId: "1:817263869607:web:0e7ab1ef985017f7c92582",
  measurementId: "G-82CMDT3L8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

//redirecting to home and checking if login is done
const homeBtn = document.querySelector(".home-btn")
const IDelement = document.querySelector(".ID-el span")

const userName = JSON.parse( sessionStorage.getItem("ID") )
IDelement.textContent += userName

homeBtn.addEventListener("click", () => {
   window.open("../home-page/home.html", "_self")
})

//actual logic for page
const saveQuestionBtn = document.querySelector(".save-btn")
const deleteQuestionBtn = document.querySelector(".delete-btn")
const saveQuizBtn = document.querySelector(".save-quiz-btn")

const questionInput = document.getElementById("question-input")
const optionOneInput = document.getElementById("one-input")
const optionTwoInput = document.getElementById("two-input")
const optionThreeInput = document.getElementById("three-input")
const optionFourInput = document.getElementById("four-input")
const correctOptionInput = document.querySelector(".correct-option")

let numOfQuestions = 0
let questionsArray = []

saveQuestionBtn.addEventListener("click", () => {
   //validate all input 
   const question = questionInput.value 
   const optionOne = optionOneInput.value
   const optionTwo = optionTwoInput.value
   const optionThree = optionThreeInput.value
   const optionFour = optionFourInput.value
   const correctOption = correctOptionInput.value

   if( question && optionOne && optionTwo && optionThree && optionFour && correctOption ) {
      questionsArray.push( [question, optionOne, optionTwo, optionThree, optionFour, correctOption] )
      numOfQuestions += 1;

      questionInput.value = "" 
      optionOneInput.value = ""
      optionTwoInput.value = ""
      optionThreeInput.value = ""
      optionFourInput.value = ""
      correctOptionInput.value = ""

      console.log( questionsArray )

      const questionListDiv = document.querySelector(".questions-list")
      const newQuestionButton = document.createElement("button")

      newQuestionButton.textContent = numOfQuestions

      questionListDiv.appendChild( newQuestionButton )

   } else {
      showFieldEmpty()
   }
})

saveQuizBtn.addEventListener("click", () => {
   if ( numOfQuestions ) {

   } else {
      showNoQuestions()
   }
})

function showFieldEmpty() {
   const errorMessageElement = document.querySelector(".message")

   errorMessageElement.style.transition = 'none';
   errorMessageElement.style.opacity = '1';
   errorMessageElement.textContent = '*Please fill all fields before saving.';
   
   errorMessageElement.offsetWidth
   errorMessageElement.style.transition = 'opacity 3s';
   errorMessageElement.style.opacity = '0';
}

function showNoQuestions() {
   const errorMessageElement = document.querySelector(".pallete-msg")

   errorMessageElement.style.transition = 'none';
   errorMessageElement.style.opacity = '1';
   errorMessageElement.textContent = '*No question added.';
   
   errorMessageElement.offsetWidth
   errorMessageElement.style.transition = 'opacity 3s';
   errorMessageElement.style.opacity = '0';
}
