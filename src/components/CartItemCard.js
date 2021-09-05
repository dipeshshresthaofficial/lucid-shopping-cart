import React from "react";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function CartItemCard({
  item,
  onClickingIncreaseQty,
  onClickingDecreaseQty,
  onClickingDeleteItem,
}) {
  return (
    <div className="flex m-5">
      <img
        alt={item.title}
        className="h-28 inline-block mr-3 object-cover rounded"
        width={100}
        src={item.image}
      />
      <div className="inline-block">
        <p className="text-2xl mb-1">{item.title}</p>
        <p className="mb-1">Price: {item.price}</p>
        <p className="mb-1">Qty: {item.qty}</p>
        <div className="flex text-2xl">
          <button onClick={() => onClickingIncreaseQty(item.id)}>
            <BiPlusCircle className="mr-2" />
          </button>
          <button onClick={() => onClickingDecreaseQty(item.id)}>
            <BiMinusCircle className="mr-2" />
          </button>
          <button onClick={() => onClickingDeleteItem(item.id)}>
            <RiDeleteBin2Line />
          </button>
        </div>
      </div>
    </div>
  );
}
