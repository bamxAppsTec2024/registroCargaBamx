import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { getDocs, collection, initializeFirestore } from "firebase/firestore";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';
// Initialize Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

console.log(firebaseConfig);

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const fbApp = getApp();
const fbStorage = getStorage(fbApp);
// const db = getFirestore(fbApp);
const db = initializeFirestore(fbApp, {
  experimentalForceLongPolling: true
});

// const listFiles = async () => {
//   const storage = getStorage();

//   // Create a reference under which you want to list
//   const listRef = ref(storage, "images");

//   // Find all the prefixes and items.
//   const listResp = await listAll(listRef);
//   return listResp.items;
// };


const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};
// Función para obtener los catálogos para las opciones 
// del componente dropwdown.
const getCatalogoDropdown = async (nombreCatalogo) => {
  const querySnapshot = await getDocs(collection(db, nombreCatalogo));

  // Crear estructura de label y value para integrar con dropdown
  const catalogo = querySnapshot.docs.map((doc) => {
    const { nombre } = doc.data();
    const registro = {
      label: nombre,
      value: nombre
    };
    return registro;
  });
  console.log(catalogo);
  return catalogo;
};

export { fbApp, db, fbStorage, uploadToFirebase, getCatalogoDropdown };