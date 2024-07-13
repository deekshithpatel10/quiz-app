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
const db = getFirestore(app);

//home button logic, and load ID of user in header
const homeBtn = document.querySelector(".home-btn")
const IDelement = document.querySelector(".ID-el span")

const userName = JSON.parse( sessionStorage.getItem("ID") )
IDelement.textContent += userName

homeBtn.addEventListener("click", () => {
  window.open("../home-page/home.html", "_self")
})

//page logic begins here
let quizDoc
let quizResponse = []
let allQuestionButtons 
const tutorNameInput = document.getElementById("tutor-name-input")
const quizNameInput = document.getElementById("quiz-name-input")
const loadQuizBtn = document.querySelector(".load-quiz-btn")

const quizDetailsDiv = document.querySelector(".quiz-details")
const questionsListDiv = document.querySelector(".questions-list")

//div content to be inserted to load quiz
const content = `<div class="question-para">
  <p id="question-number"></p>
  <p id="question-text"></p>
</div>

<div class="option">
  <input type="radio" name="option" id="option-one">
  <label for="option-one" id="option-one-label"></label>
</div>
            
<div class="option">
  <input type="radio" name="option" id="option-two">
  <label for="option-two" id="option-two-label"></label>
</div>

<div class="option">
  <input type="radio" name="option" id="option-three">
  <label for="option-three" id="option-three-label"></label>
</div>

<div class="option">
  <input type="radio" name="option" id="option-four">
  <label for="option-four" id="option-four-label"></label>
</div>`

let questionNumberDiv = document.getElementById("question-number")
let questionText = document.getElementById("question-text")

let optionOneBtn = document.getElementById("option-one")
let optionOneLabel = document.getElementById("option-one-label")

let optionTwoBtn = document.getElementById("option-two")
let optionTwoLabel = document.getElementById("option-two-label")

let optionThreeBtn = document.getElementById("option-three")
let optionThreeLabel = document.getElementById("option-three-label")

let optionFourBtn = document.getElementById("option-four")
let optionFourLabel = document.getElementById("option-four-label")

loadQuizBtn.addEventListener("click", async () => {
  const tutorName = tutorNameInput.value.toLowerCase()
  const quizName = quizNameInput.value.toLowerCase()

  if( tutorName && quizName ) {

    const quizRef = doc(db, "quizzes", `${tutorName}_${quizName}`);
    const quizSnap = await getDoc( quizRef );

    if ( quizSnap.exists() ) {
      console.log("Document data:", quizSnap.data());
      quizDoc = Object.entries( quizSnap.data() )
      loadQuiz()

    } else {
      const message = "*Quiz doesn't exist."
      const errorMessageElement = document.querySelector(".question .message")
      showErrorMessage( message, errorMessageElement )
    }

  } else {
    const message = "*Please fill in all the fields."
    const errorMessageElement = document.querySelector(".question .message")

    showErrorMessage( message, errorMessageElement )
  }
})

function loadQuiz() {
  clearQuizDetailsDiv()
  updatePallete()
  updateQuizDetailsDiv()
}

function clearQuizDetailsDiv() {
  quizDetailsDiv.textContent = ""
}

function updatePallete() {

  for( let questionNumber = 1; questionNumber <= quizDoc.length; questionNumber++ ) {
    const button = document.createElement("button")
    button.textContent = questionNumber

    button.addEventListener("click", () => {
      loadQuestion( button )
    })

    questionsListDiv.appendChild( button )
  }

  allQuestionButtons = questionsListDiv.children
}

function updateQuizDetailsDiv() {
  quizDetailsDiv.innerHTML = content

  questionNumberDiv = document.getElementById("question-number")
  questionText = document.getElementById("question-text")

  optionOneBtn = document.getElementById("option-one")
  optionOneLabel = document.getElementById("option-one-label")

  optionTwoBtn = document.getElementById("option-two")
  optionTwoLabel = document.getElementById("option-two-label")

  optionThreeBtn = document.getElementById("option-three")
  optionThreeLabel = document.getElementById("option-three-label")

  optionFourBtn = document.getElementById("option-four")
  optionFourLabel = document.getElementById("option-four-label")

  loadQuestion( allQuestionButtons[0] )
}

function loadQuestion( clickedBtn ) {
  const questionNumber = Number( clickedBtn.textContent )

  for( let button of allQuestionButtons ) {
    button.removeAttribute("id")
  }
  clickedBtn.id = "selected-question"

  const question = quizDoc[ questionNumber - 1 ][1]

  questionNumberDiv.textContent = `${questionNumber}. `
  questionText.textContent = question[0]
  optionOneLabel.textContent = question[1]
  optionTwoLabel.textContent = question[2]
  optionThreeLabel.textContent = question[3]
  optionFourLabel.textContent = question[4]
}













function showErrorMessage( message, errorMessageElement ) {

  errorMessageElement.style.transition = 'none';
  errorMessageElement.style.opacity = '1';
  errorMessageElement.textContent = message;
  
  errorMessageElement.offsetWidth
  errorMessageElement.style.transition = 'opacity 3s';
  errorMessageElement.style.opacity = '0';
}