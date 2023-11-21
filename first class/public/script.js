
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuUQwnjYe5oQELrECvbnajn5LLaSjF5DY",
    authDomain: "first-firebase-project-5c447.firebaseapp.com",
    projectId: "first-firebase-project-5c447",
    storageBucket: "first-firebase-project-5c447.appspot.com",
    messagingSenderId: "513587432639",
    appId: "1:513587432639:web:a1ca9a45941e16fea60a0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Google sign in //
const signInG = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            let user = result.user
            console.log(user);
            if (user) {
                window.location.href = "dashboard.html"
            }
        })
        .catch((err) => {
            let errorCode = err.code
            let errorMsg = err.message
            console.log(errorCode, errorMsg);
        })
}
window.signInG = signInG

// Github Sign in //
const checkGithub = () => {
    signInWithPopup(auth, githubProvider)
        .then((result) => {
            let user = result.user
            console.log(user);
            if (user) {
                window.location.href = "dashboard.html"
            } else {
                window.location.href = "index.html"
            }
        })
        .catch((err) => {
            let errorCode = err.code
            let errorMsg = err.message
            console.log(errorCode, errorMsg);
            if (errorCode == "auth/account-exists-with-different-credential") {
                emptyError.style.display = "block"
                emptyError.textContent = "An account already exist with this email address";
                emptyError.style.color = "orange"
                setTimeout(() => {
                    emptyError.style.display = "none"
                }, 3000)
            }
        })
}
window.checkGithub = checkGithub


// Sign Up page //
const signUp = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let fname = document.getElementById('firstname').value
    let lname = document.getElementById('lastname').value

    if (email != "" && password != "" && fname != "" && lname != "") {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user);
                if (email == user.email) {
                    window.location.href = "index.html"
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode == "auth/email-already-in-use") {
                    emptyError.textContent = "An account already exist with this email address";
                    emptyError.style.color = "orange"
                    setTimeout(() => {
                        emptyError.style.display = "none"
                    }, 3000)
                }
                document.getElementById('email').value = ""
                document.getElementById('password').value = ""
                document.getElementById('firstname').value = ""
                document.getElementById('lastname').value = ""
            })
    } else {
        emptyError.textContent = "Please fill in the empty spaces provided";
        emptyError.style.color = "red"
        setTimeout(() => {
            emptyError.style.display = "none"
        }, 3000)
    }

}
window.signUp = signUp

// Sign In Page//
const signin = () => {
    let email = document.getElementById('yourEmail').value
    let password = document.getElementById('yourPass').value
    if (email != "" && password != "") {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user);
                if (user) {
                    window.location.href = "dashboard.html"
                } else {
                    window.location.href = "index.html"
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode == "auth/invalid-login-credentials") {
                    emptyError.textContent = "Incorrect email or password";
                    emptyError.style.color = "orange"
                    setTimeout(() => {
                        emptyError.style.display = "none"
                    }, 3000)
                }
                document.getElementById('yourEmail').value = ""
                document.getElementById('yourPass').value = ""
            })
    } else {
        emptyError.textContent = "Please fill in the empty spaces provided";
        emptyError.style.color = "red"
        setTimeout(() => {
            emptyError.style.display = "none"
        }, 3000)
    }
}
window.signin = signin

// Dashboard //
const signo = () => {
    signOut(auth)
        .then(() => {
            console.log('user successfully signed out');
        })
        .catch((err) => {
            console.log(err + "User signed out");
        })
}

window.signo = signo
