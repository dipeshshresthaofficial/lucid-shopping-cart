import React from "react";
import CartItemCard from "./CartItemCard";

export default function CartItemList({
  cartItems,
  onClickingIncreaseQty,
  onClickingDecreaseQty,
  onClickingDeleteItem
}) {
  return (
    <div className="border-2 items-center ">
      {cartItems.map((item) => {
        return (
          <CartItemCard
            item={item}
            key={item.id}
            onClickingIncreaseQty={onClickingIncreaseQty}
            onClickingDecreaseQty={onClickingDecreaseQty}
            onClickingDeleteItem = {onClickingDeleteItem}
          />
        );
      })}
    </div>
  );
}
