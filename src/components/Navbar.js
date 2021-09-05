import React from "react";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar({ totalCartQty }) {
  return (
    <div className="relative w-full h-16 bg-black flex items-center">
      <FiShoppingCart className="absolute right-10 text-3xl text-white" />
      <div className="absolute right-7 top-0 h-7 w-7 rounded-full bg-white text-black text-center">{totalCartQty}</div>
    </div>
  );
}
