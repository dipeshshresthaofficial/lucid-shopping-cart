import { useState, useCallback, useEffect } from "react";
import CartItemList from "./components/CartItemList";
import Navbar from "./components/Navbar";
import { FiShoppingCart } from "react-icons/fi";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartQty, setCartQty] = useState(0);

  //Fetching data from "data.json" file situated in "PUBLIC" folder
  const fetchedData = useCallback(() => {
    console.log("callback");

    fetch("./data.json")
      .then((resp) => resp.json())
      .then((data) => setCartItems(data));
  }, []);

  useEffect(() => {
    console.log("effect");
    fetchedData();
  }, [fetchedData]);

  // Calculating total Cart Items

  useEffect(() => {
    let totalQty = 0;
    cartItems.forEach((item) => {
      totalQty += Number(item.qty);
    });
    setCartQty(totalQty);
  }, [cartItems]);

  // Increasing the Quantity when Add button is clicked.
  const handleIncreaseQty = (id) => {
    // console.log(id);
    const items = cartItems;
    items.forEach((item) => {
      if (item.id === id) {
        item.qty += 1;
      }
    });

    setCartItems([...items]);
  };

  // Decreasing the Quantity when Add button is clicked.
  const handleDecreaseQty = (id) => {
    // console.log(id);
    const items = cartItems;
    items.forEach((item) => {
      if (item.id === id && item.qty > 1) {
        item.qty -= 1;
      }
    });

    setCartItems([...items]);
  };

  //Deleting item from the cart
  const handleDeleteItem = (id) => {
    // console.log(id)
    const items = cartItems.filter(item=>item.id !== id);
    setCartItems([...items])

  };

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
