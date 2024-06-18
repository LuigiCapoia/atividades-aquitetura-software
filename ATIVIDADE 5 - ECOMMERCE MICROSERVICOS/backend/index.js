const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } = require("firebase/firestore");
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const readline = require("readline");

const firebaseConfig = {
  apiKey: "AIzaSyD367tZgWPzxHxYFWY0fpRAUlxeEdgem0E",
  authDomain: "projeto24-05.firebaseapp.com",
  projectId: "projeto24-05",
  storageBucket: "projeto24-05.appspot.com",
  messagingSenderId: "5661507224",
  appId: "1:5661507224:web:a2d4aca408c3da6ecd9aed",
  measurementId: "G-PEXW6GL5G2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const auth = getAuth();
const email = "testecapoia@gmail.com";
const password = "teste123";


async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful:", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error.code, error.message);
  }
}


async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Registration successful:", userCredential.user);
  } catch (error) {
    console.error("Error registering:", error.code, error.message);
  }
}


async function createPerson(name, email, age) {
  try {
    const docRef = await addDoc(collection(db, "people"), {
      name: name,
      email: email,
      age: age
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}


async function readPeople() {
  try {
    const querySnapshot = await getDocs(collection(db, "people"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}


async function readPerson(id) {
  const docRef = doc(db, "people", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}


async function updatePerson(id, updatedData) {
  const docRef = doc(db, "people", id);
  try {
    await updateDoc(docRef, updatedData);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}


async function deletePerson(id) {
  const docRef = doc(db, "people", id);
  try {
    await deleteDoc(docRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


async function mainMenu() {
  console.log("\nSelect an option:");
  console.log("1. Create a new person");
  console.log("2. Read all people");
  console.log("3. Read a person by ID");
  console.log("4. Update a person by ID");
  console.log("5. Delete a person by ID");
  console.log("6. Register new user");
  console.log("7. Exit");

  rl.question("Enter your choice: ", async (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter name: ", (name) => {
          rl.question("Enter email: ", (email) => {
            rl.question("Enter age: ", async (age) => {
              await createPerson(name, email, parseInt(age));
              mainMenu();
            });
          });
        });
        break;
      case "2":
        await readPeople();
        mainMenu();
        break;
      case "3":
        rl.question("Enter person ID: ", async (id) => {
          await readPerson(id);
          mainMenu();
        });
        break;
      case "4":
        rl.question("Enter person ID: ", (id) => {
          rl.question("Enter new name (leave blank to keep current): ", (name) => {
            rl.question("Enter new email (leave blank to keep current): ", (email) => {
              rl.question("Enter new age (leave blank to keep current): ", async (age) => {
                const updatedData = {};
                if (name) updatedData.name = name;
                if (email) updatedData.email = email;
                if (age) updatedData.age = parseInt(age);
                await updatePerson(id, updatedData);
                mainMenu();
              });
            });
          });
        });
        break;
      case "5":
        rl.question("Enter person ID: ", async (id) => {
          await deletePerson(id);
          mainMenu();
        });
        break;
      case "6":
        rl.question("Enter email: ", (email) => {
          rl.question("Enter password: ", async (password) => {
            await register(email, password);
            mainMenu();
          });
        });
        break;
      case "7":
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        mainMenu();
        break;
    }
  });
}


(async () => {
  await login(email, password);
  mainMenu();
})();
