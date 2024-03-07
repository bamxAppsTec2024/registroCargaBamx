import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { getDocs, addDoc, collection, initializeFirestore, doc, updateDoc, where, query } from "firebase/firestore";
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

console.log(
  { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID }
);

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

const getData = getFirestore();

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
  return catalogo;
};

async function saveRecord(formData) {
  try {
    const docRef = await addDoc(collection(db, "donativo"), formData);
    console.log("document saved correctly", docRef.id);
  } catch (e) {
    console.log(e);
  }
}

// Función para añadir nuevo record a los catálogos
const createRecordCatalogo = async (nombreCatalogo, valor) => {
  try {
    const docRef = await addDoc(collection(db, nombreCatalogo), {
      nombre: valor
    });
    console.log("document saved correctly", docRef.id);
  } catch (e) {
    console.log(e);
  }

};

const uploadUrl = (filename) => {
  getDownloadURL(ref(fbStorage, `images/${filename}`))
    .then((url) => {
      return url;
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });
};

const getRecordDonante = async (nombreDonante, cantidadCarga, porcentajeDesperdicio) => {

  const q = query(collection(db, "donante"), where("nombre", "==", nombreDonante));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (record) => { // Solo habrá una coincidencia
    const docRef = doc(db, "donante", record.id);
    const myJSON = JSON.stringify(record.data());
    const obj = JSON.parse(myJSON);

    const cantidadCargaCalculada = cantidadCarga * (100 - porcentajeDesperdicio) / 100;
    const cantidadDesperdicioCalculado = cantidadCarga * porcentajeDesperdicio / 100;

    
    if (obj.cantidadCargaUtil && obj.cantidadDesperdicio)  {
      await updateDoc(docRef, {
        cantidadCargaUtil: obj.cantidadCargaUtil + cantidadCargaCalculada,
        cantidadDesperdicio: obj.cantidadDesperdicio + cantidadDesperdicioCalculado
      });
    } else {
      await updateDoc(docRef, {
        cantidadCargaUtil: cantidadCargaCalculada,
        cantidadDesperdicio: cantidadDesperdicioCalculado
      });
    }
  });
  
};


export { fbApp, db, fbStorage, uploadToFirebase, getCatalogoDropdown, saveRecord, createRecordCatalogo, uploadUrl, getRecordDonante, getData };
