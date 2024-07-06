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

const nameEl = document.getElementById("name-input")
const passwordEl = document.getElementById("password-input")
const loginContainer = document.querySelector(".login-container")

const loginBtn = document.querySelector(".login")
const createBtn = document.querySelector(".create")

const name = nameEl.value 
const password = passwordEl.value

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// user authentication or data creation 
loginBtn.addEventListener("click", async () => {
  const refToUserDoc = doc(db, "users", `${name}`);
  const userSnap = await getDoc( refToUserDoc );

  if ( userSnap.exists() ) {
    if( userSnap.data().password === `${password}`) {
      console.log("Hey, you're in!")
    }
  } else {
    showError();
  }

})

function showError() {
  const errorMessage = document.createElement("p");

  errorMessage.textContent = "*An error occurred. Please make sure you entered the correct details."

  errorMessage.classList.add(".error-message")

  loginContainer.appendChild(errorMessage)
}