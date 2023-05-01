import Link from "next/link";

import { useAppDispatch } from "@/store/hooks"; 
import { toggleMobileMenu, toggleSearch } from "@/store/layoutSlice";
import Cart from "../cart/cart";

const ActionsMenu = (props: {}) => {
    const dispatch = useAppDispatch()

    return (
        <nav className="flex flex-col justify-center">
        <ul className="flex flex-row">
          <li className="py-1 px-2">
            <Link 
            href="#"
            onClick={() => dispatch(toggleSearch())}>
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Link>
          </li>
          <li className="py-1 px-2">
            <Link href="#">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
          </li>
          <li className="sm:mr-3 py-1 px-2">
            <Cart />
          </li>
          <li
            className="py-1 px-2 mr-3 hidden max-sm:block cursor-pointer"
            onClick={() => dispatch(toggleMobileMenu())}
          >
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
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </li>
        </ul>
      </nav>
    )
}

export default ActionsMenu