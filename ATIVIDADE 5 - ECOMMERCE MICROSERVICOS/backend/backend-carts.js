// backend-carts.js
import { getFirestore, collection, doc, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore();

export const addToCart = (userId, product) => {
  return addDoc(collection(db, "carts", userId, "items"), product);
};

export const getCart = (userId) => {
  return getDocs(collection(db, "carts", userId, "items"));
};
