// Sync über Google-Login (Firebase). Diese Werte sind nicht geheim, der Schutz läuft über die Firestore-Regeln
// (jede Person darf nur ihr eigenes Dokument progress/{uid} lesen und schreiben).
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDDWjIRPv943GuUYUbU67mQqTrhBr1iPMM",
  authDomain: "ap2-trainer.firebaseapp.com",
  projectId: "ap2-trainer",
  storageBucket: "ap2-trainer.firebasestorage.app",
  messagingSenderId: "398959427971",
  appId: "1:398959427971:web:3b5670f790115793ff36b6"
};
