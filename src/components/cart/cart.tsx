import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useAppSelector } from "@/store/hooks";
import { removeItemFromCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import Link from "next/link";

const Cart = () => {
  const { cart, itemsInCart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>
            <div className="flex flex-row">
              <Link href="/cart" className="w-6 h-8 absolute md:hidden" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="pt-0.5 ml-0.5">
                {itemsInCart > 0 ? `(${itemsInCart})` : ""}
              </span>
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute md:max-w-lg md:w-screen md:right-0 z-10 mt-3 max-sm:hidden">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-6">
                  <div className="text-lg">
                    {itemsInCart == 0 ? (
                      <h5>Carts is Empty</h5>
                    ) : (
                      <h5>Items in Cart: {itemsInCart}</h5>
                    )}
                  </div>
                  <ul className="list-disc mt-4">
                    <li
                      key={'headr'}
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
                            onClick={() =>
                              dispatch(removeItemFromCart(item.id))
                            }
                          >
                            Remove
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Cart;
