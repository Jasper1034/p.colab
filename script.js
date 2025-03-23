
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries







// sign up function

function signup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          alert("Sign-Up Successful!");
          console.log(userCredential.user);
      })
      .catch((error) => {
          alert("Error: " + error.message);
      });
}







//log in function 

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          alert("Login Successful!");
          console.log(userCredential.user);
      })
      .catch((error) => {
          alert("Error: " + error.message);
      });
}











// Storing user data in Firestore after sign-up
function signup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          db.collection("users").doc(userCredential.user.uid).set({
              email: email,
              joined: new Date().toISOString()
          });
          alert("Sign-Up Successful!");
      })
      .catch((error) => {
          alert("Error: " + error.message);
      });
}


















function logoutUser() {
    // Remove login status from local storage
    localStorage.removeItem('isLoggedIn');

    // Optional: Clear stored credentials for extra security
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    alert('You have logged out successfully!');
    window.location.href = 'landing.html';  // Redirect back to the landing page
}














// Modal Control
function toggleLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
  }
  
  function toggleSignupModal() {
    // Hide login modal and show sign up modal
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('signup-modal').style.display = 'block';
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
  // Handle Sign-Up Form Submission
  document.getElementById('signup-form').addEventListener('submit', function(event) {

    event.preventDefault();
  
    // Get user input
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
    
        if (username && email && password) {
            localStorage.setItem('username', username);  // Save username
            localStorage.setItem('email', email);        // Save email
            localStorage.setItem('password', password);  
            localStorage.setItem('isLoggedIn', 'true');  // Track login status
    
            alert('Sign-up successful! Please log in.');
            window.location.href = 'index.html';
        } else {
            alert('Please fill in all fields.');
        }
  });

    
  },
   
  
    
  
  // Handle Login Form Submission
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get login input
    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;
  
    // Check user credentials
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
    if (loginUsername === storedUsername && loginPassword === storedPassword) {
      // Store a flag to mark the user as logged in
      localStorage.setItem('isLoggedIn', true);
  
      alert('Login successful!');
      closeModal('login-modal');
      document.body.classList.add('logged-in'); // Add logged-in class to show logout button
    } else {
      alert('Invalid username or password.');
    }
  }));
  
  // Log out function
  function logoutUser() {
    // Remove login status from local storage
    localStorage.removeItem('isLoggedIn');

    // Optional: Clear stored credentials for extra security
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    alert('You have logged out successfully!');
    window.location.href = 'landing.html';  // Redirect back to the landing page
}

  
  // Check if the user is already logged in on page load
  window.onload = function() {
    if (localStorage.getItem('isLoggedIn')) {
      document.body.classList.add('logged-in'); // Show the logout button
    } else {
      document.body.classList.remove('logged-in'); // Ensure logout button is hidden
    }
  };
  













// Event listener for the Cost Estimator and Budgeting Tool
document.addEventListener('DOMContentLoaded', function() {

  // Cost Estimator Logic
  document.getElementById('cost-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const tuition = parseFloat(document.getElementById('tuition').value);
      const living = parseFloat(document.getElementById('living').value);

      if (!isNaN(tuition) && !isNaN(living)) {
          const totalCost = tuition + living;
          // Displaying total cost
          document.getElementById('total-cost').textContent = `Total Cost: $${totalCost.toFixed(2)}`;
      } else {
          document.getElementById('total-cost').textContent = 'Please enter valid amounts for Tuition and Living Expenses.';
      }
  });

  // Budgeting Tool Logic
  document.getElementById('budget-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const income = parseFloat(document.getElementById('income').value);
      const foodExpenses = parseFloat(document.getElementById('food-expenses').value);
      const rentExpenses = parseFloat(document.getElementById('rent-expenses').value);
      const entertainmentExpenses = parseFloat(document.getElementById('entertainment-expenses').value);

      if (!isNaN(income) && !isNaN(foodExpenses) && !isNaN(rentExpenses) && !isNaN(entertainmentExpenses)) {
          const totalExpenses = foodExpenses + rentExpenses + entertainmentExpenses;
          const remainingBudget = income - totalExpenses;
          // Displaying remaining budget
          document.getElementById('monthly-budget').textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;
      } else {
          document.getElementById('monthly-budget').textContent = 'Please enter valid amounts for all expenses.';
      }
  });

});












// Student Loan Calculator
document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const loanTerm = parseFloat(document.getElementById('loan-term').value);
  
    if (!isNaN(loanAmount) && !isNaN(interestRate) && !isNaN(loanTerm)) {
      const monthlyInterestRate = interestRate / 12;
      const numberOfPayments = loanTerm * 12;
      const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      const totalPayment = monthlyPayment * numberOfPayments;
  
      document.getElementById('loan-payment').textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
      document.getElementById('total-payment').textContent = `Total to be Paid: $${totalPayment.toFixed(2)}`;
    }
  });

  



// Savings Tracker
document.getElementById('savings-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const savingsGoal = parseFloat(document.getElementById('savings-goal').value);
  const currentSavings = parseFloat(document.getElementById('current-savings').value);

  if (!isNaN(savingsGoal) && !isNaN(currentSavings)) {
    const remainingSavings = savingsGoal - currentSavings;
    document.getElementById('remaining-savings').textContent = `Remaining to Save: $${remainingSavings.toFixed(2)}`;
  }
});
















// firebase code




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZik9_liCjkrEIU5EKYywrSld0bzG_Cpw",
  authDomain: "pcolabdev.firebaseapp.com",
  projectId: "pcolabdev",
  storageBucket: "pcolabdev.firebasestorage.app",
  messagingSenderId: "697533802347",
  appId: "1:697533802347:web:09d20f23798e74bcad4e2e",
  measurementId: "G-061NMVCKB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);









