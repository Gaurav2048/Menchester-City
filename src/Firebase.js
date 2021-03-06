import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyDUYGxjbAqNLCyTqEaAhbeupNG1Ek-00ak",
    authDomain: "m-city-bd130.firebaseapp.com",
    databaseURL: "https://m-city-bd130.firebaseio.com",
    projectId: "m-city-bd130",
    storageBucket: "m-city-bd130.appspot.com",
    messagingSenderId: "898039282395"
  };

firebase.initializeApp(config);


const firebasedb = firebase.database();
const firebaseMatches = firebasedb.ref('matches');
const firebasePromotions = firebasedb.ref('promotions');
const firebaseTeams = firebasedb.ref('teams'); 
const firebasePlayers = firebasedb.ref('players'); 


export {
        firebase,
        firebaseMatches,
        firebasePromotions,
        firebaseTeams,
        firebasedb,
        firebasePlayers
        
}