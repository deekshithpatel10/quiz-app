// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js'
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js'
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

if ( !userName ) {
  window.open("../index.html", "_self")
}

IDelement.textContent += userName

homeBtn.addEventListener("click", () => {
  window.open("../home-page/home.html", "_self")
})

//page logic begins here
const tableEl = document.querySelector("table")

const refToResponses = collection(db, "responses")
const q = query(refToResponses, where("student", "==", `${userName}`))

let htmlTable = `<tr>
  <th>&nbsp;</th>
  <th>Quiz Name</th>
  <th>Tutor ID</th>
  <th>Score</th>
</tr>`

const querySnapshot = await getDocs(q);
let counter = 1
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());

  const tutor = doc.data().tutor
  const score = doc.data().score
  const quiz = doc.data().quiz

  const tableRow = `<tr><td>${counter}</td><td>${quiz}</td><td>${tutor}</td><td>${score}</td></tr>`

  htmlTable += tableRow

  counter++
})

if( querySnapshot.size ) {
  tableEl.innerHTML = htmlTable
} else {
  tableEl.innerHTML = "<p>Oops! You haven't submitted any tests yet.</p>"
}
