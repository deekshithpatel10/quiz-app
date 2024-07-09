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

//home button logic, and load ID of user in header
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
const questionListDiv = document.querySelector(".questions-list")

const allQuestionButtons = questionListDiv.children

const questionInput = document.getElementById("question-input")
const optionOneInput = document.getElementById("one-input")
const optionTwoInput = document.getElementById("two-input")
const optionThreeInput = document.getElementById("three-input")
const optionFourInput = document.getElementById("four-input")
const correctOptionInput = document.querySelector(".correct-option")

const quizNameInput = document.getElementById("quiz-name-input")

let numOfSavedQuestions = 0
let currentQuestion = 1
let questionsArray = []
createNewEmptyQuestion()
loadQuestion( currentQuestion )

saveQuestionBtn.addEventListener("click", () => {

   if( validateInput() ) {
      saveQuestionToArray()

      if( currentQuestion === (numOfSavedQuestions + 1) ) {
         numOfSavedQuestions++
         currentQuestion++
         createNewEmptyQuestion()
         loadQuestion( currentQuestion )

      } else {
         currentQuestion = numOfSavedQuestions + 1
         loadQuestion( currentQuestion )

      }

   } else {
      showFieldEmpty()
   }

})

function validateInput() {
   const question = questionInput.value 
   const optionOne = optionOneInput.value
   const optionTwo = optionTwoInput.value
   const optionThree = optionThreeInput.value
   const optionFour = optionFourInput.value
   const correctOption = correctOptionInput.value

   return ( question && optionOne && optionTwo && optionThree && optionFour && correctOption )
}

function saveQuestionToArray() {

   const question = questionInput.value 
   const optionOne = optionOneInput.value
   const optionTwo = optionTwoInput.value
   const optionThree = optionThreeInput.value
   const optionFour = optionFourInput.value
   const correctOption = correctOptionInput.value

   questionsArray[ currentQuestion-1 ] = [question, optionOne, optionTwo, optionThree, optionFour, correctOption]
}

function loadQuestion( questionNumber ) {

   for( let button of allQuestionButtons ) {
      button.removeAttribute("id")
   }

   questionInput.value = questionsArray[ questionNumber - 1 ] [0] 
   optionOneInput.value = questionsArray[ questionNumber - 1 ] [1]
   optionTwoInput.value = questionsArray[ questionNumber - 1 ] [2]
   optionThreeInput.value = questionsArray[ questionNumber - 1 ] [3]
   optionFourInput.value = questionsArray[ questionNumber - 1 ] [4]
   correctOptionInput.value = questionsArray[ questionNumber - 1 ] [5]

   currentQuestion = questionNumber

   allQuestionButtons[ currentQuestion - 1 ].id = "selected-question"
}

function createNewEmptyQuestion()  {

   questionInput.value = "" 
   optionOneInput.value = ""
   optionTwoInput.value = ""
   optionThreeInput.value = ""
   optionFourInput.value = ""
   correctOptionInput.value = ""

   const newQuestionButton = document.createElement("button")

   newQuestionButton.textContent = numOfSavedQuestions + 1

   saveQuestionToArray()

   newQuestionButton.addEventListener("click", () => {
      const questionNumber = Number( newQuestionButton.textContent )
      loadQuestion( questionNumber )
   })

   questionListDiv.appendChild( newQuestionButton )
}

deleteQuestionBtn.addEventListener("click", () => {
   if( currentQuestion <= numOfSavedQuestions ) {
      removeQuestionFromArray()

      for( let button in allQuestionButtons ) {
         if( Number(button.textContent) >= currentQuestion ) {
            button.textContent = ( Number( button.textContent ) - 1 )
         }
      }

      questionListDiv.removeChild( questionListDiv.lastChild )
      numOfSavedQuestions--
      currentQuestion = numOfSavedQuestions + 1
      loadQuestion( currentQuestion )
   }

})
 
function removeQuestionFromArray() {
   questionsArray.splice( currentQuestion-1, 1 )
}

//save quiz 
saveQuizBtn.addEventListener("click", () => {
   const quizName = quizNameInput.value

   if ( numOfSavedQuestions && quizName ) {
      questionsArray.pop()

      setDoc(db, "quizzes", `${userName}_${quizName}`, {
         questions: questionsArray
      })

      window.open("../home-page/home.html", "_self")

   } else if ( numOfSavedQuestions ) {
      showNoName()
   } else {
      showNoQuestions()
   }
})

//error messages functions
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

function showNoName() {
   const errorMessageElement = document.querySelector(".pallete-msg")

   errorMessageElement.style.transition = 'none';
   errorMessageElement.style.opacity = '1';
   errorMessageElement.textContent = '*Please add a name.';
   
   errorMessageElement.offsetWidth
   errorMessageElement.style.transition = 'opacity 3s';
   errorMessageElement.style.opacity = '0';
}
