// backend-products.js
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore();

export const addProduct = (product) => {
  return addDoc(collection(db, "products"), product);
};

export const getProducts = () => {
  return getDocs(collection(db, "products"));
};
