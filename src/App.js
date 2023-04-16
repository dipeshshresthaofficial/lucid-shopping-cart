import { useState, useCallback, useEffect } from "react";
import CartItemList from "./components/CartItemList";
import Navbar from "./components/Navbar";
import { FiShoppingCart } from "react-icons/fi";

// import { initializeApp } from "firebase/app";
import { app } from "./firebase";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  where,
  deleteDoc
} from "firebase/firestore";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [loading, setLoading] = useState(true);

  //Cloud Firestore Firebase Reference
  const db = getFirestore(app);

  //Fetching data from "data.json" file situated in "PUBLIC" folder
  /*
  const fetchedData = useCallback(() => {
    console.log("callback");
    fetch("./data.json")
      .then((resp) => resp.json())
      .then((data) => setCartItems(data));
    Get a list of cities from your database
  }, []);

  */

  // FETCHING data from FIREBASE database.
  async function getProductsFromFirebase() {
    setLoading(true)
    const q = query(
      collection(db, process.env.REACT_APP_FIREBASE_COLLECTION_NAME),
      where("price", ">", 0)
    );

    //---------------This function is called whenever some value changes in the QUALIFYING DOCUMENTS
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        let docId = doc.id;
        products.push({ ...doc.data(), id: docId });
      });
      setCartItems(products);
      setLoading(false);
    });
  }
  useEffect(() => {
    // console.log("effect");
    getProductsFromFirebase();
  }, []);

  // Calculating total Cart Items

  useEffect(() => {
    let totalQty = 0;
    cartItems.forEach((item) => {
      totalQty += Number(item.qty);
    });
    setCartQty(totalQty);
  }, [cartItems]);

  // Increasing the Quantity when Add button is clicked.
  const handleIncreaseQty = async (id) => {
    // console.log(id);
    let updatedQty = 0;
    const items = cartItems;
    items.forEach((item) => {
      if (item.id === id) {
        updatedQty = item.qty + 1;
      }
    });
    const productRef = doc(db, "products", id);
    // console.log(productRef);
    await updateDoc(productRef, {
      qty: updatedQty,
    });
  };

  // Decreasing the Quantity when Add button is clicked.
  const handleDecreaseQty = async(id) => {
    // console.log(id);
    let updatedQty = 0;
    const items = cartItems;
    items.forEach((item) => {
      if (item.id === id && item.qty > 1) {
        updatedQty = item.qty - 1;
      }
    });
    const productRef = doc(db, "products", id);
    console.log(productRef);
    await updateDoc(productRef, {
      qty: updatedQty,
    });
  };

  //Deleting item from the cart
  const handleDeleteItem = async(id) => {
    // console.log(id)
    // const items = cartItems.filter((item) => item.id !== id);
    // setCartItems([...items]);
    await deleteDoc(doc(db, process.env.REACT_APP_FIREBASE_COLLECTION_NAME, id));
  };


  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="">
      <Navbar totalCartQty={cartQty} />
      <div className="text-center text-3xl mt-2 text-purple-800">
        <FiShoppingCart className="inline-block mr-4" />
        <p className="inline-block">Lucid Shopping Cart</p>
      </div>
      <CartItemList
        cartItems={cartItems}
        onClickingIncreaseQty={handleIncreaseQty}
        onClickingDecreaseQty={handleDecreaseQty}
        onClickingDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default App;
