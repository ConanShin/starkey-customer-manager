import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;

const config = {
    apiKey: "AIzaSyAAjby47cHjqBOCPy4PzThrfbeSmUnk9eU",
    authDomain: "starkey.firebaseapp.com",
    databaseURL: "https://starkey.firebaseio.com/"
}

if (!firebase.apps.length) {
    initializeApp(config);
} else {
    firebase.app();
}

export default firebase
