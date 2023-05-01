import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useAppSelector } from "@/store/hooks";
import { removeItemFromCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import Link from "next/link";

const CartPage = () => {
  const { cart, itemsInCart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const total = cart.reduce((sum, item) => (sum + item.price), 0);

  return (
    <div className="relative bg-white p-6 min-h-screen">
      <div className="text-lg">
        {itemsInCart == 0 ? (
          <h5>Carts is Empty</h5>
        ) : (
          <h5>Items in Cart: {itemsInCart}</h5>
        )}
      </div>
      <ul className="list-disc mt-4">
        <li
          key={"headr"}
          className="text-sm flex flex-row justify-between mb-1 border-b-1 border-gray-200"
        >
          <span className="font-bold">Item</span>
          <span className="font-bold text-gray-400 pr-16">Qty</span>
        </li>
        {cart.map((item) => (
          <li
            key={item.id}
            className="text-sm flex flex-row justify-between mb-1 border-b-1 border-gray-200"
          >
            <span className="font-bold">{item.name}</span>
            <span className="font-bold text-gray-400">
              {item.quantity}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => dispatch(removeItemFromCart(item.id))}
              >
                Remove
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="text-xl mt-6 text-right">Total: {total}</div>
    </div>
  );
};

export default CartPage;
