import * as firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBcH1xxvH98BmKBufLnzMcFx8Nw5NN_m0",
  authDomain: "ecommerce-d2d86.firebaseapp.com",
  databaseURL: "https://ecommerce-d2d86.firebaseio.com",
  projectId: "ecommerce-d2d86",
  storageBucket: "ecommerce-d2d86.appspot.com",
  messagingSenderId: "206401596660",
  appId: "1:206401596660:web:98b1b0e945babbbcbc02a1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
