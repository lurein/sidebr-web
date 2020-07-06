import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBhjKOi0FRpSBln3Px6Rdldv5uuGTbmNw4',
  authDomain: 'sidebr-0.firebaseapp.com',
  databaseURL: 'https://sidebr-0.firebaseio.com',
  projectId: 'sidebr-0',
  storageBucket: 'sidebr-0.appspot.com',
  messagingSenderId: '1077542452909',
  appId: '1:1077542452909:web:f72af32336f51345e51024',
  measurementId: 'G-CB1VV3Q0X5',
};

const FbApp = firebase.initializeApp(config);
Vue.prototype.$Firestore = FbApp.firestore();
Vue.prototype.$FireAuth = FbApp.auth();
Vue.prototype.$FirebaseStorage = FbApp.storage();
