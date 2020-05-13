import * as firebase from 'firebase/app';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyAcLdWa8nvhFUITHHPfGMfOUk51wAx6F1U",
    authDomain: "luastore-90716.firebaseapp.com",
    databaseURL: "https://luastore-90716.firebaseio.com",
    projectId: "luastore-90716",
    storageBucket: "luastore-90716.appspot.com",
    messagingSenderId: "819879535653",
    appId: "1:819879535653:web:53125b05b53d6b4d3b8bcc",
    measurementId: "G-PRS838QKJM"
};

let app = null;
// Initialize Firebase
if(!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

export default firebase;