import { initializeApp } from "firebase/app"
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA9Lyt_CDiDet4cEbuQ_2v-x5dRGBixzvg",
    authDomain: "promentor-c050a.firebaseapp.com",
    projectId: "promentor-c050a",
    storageBucket: "promentor-c050a.appspot.com",
    messagingSenderId: "920077192960",
    appId: "1:920077192960:web:e0df4e000d5a3dafc72de5"
  };

  // Initialize Firebase
initializeApp(firebaseConfig)

export const firestore = getFirestore()