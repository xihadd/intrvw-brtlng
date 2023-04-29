import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white h-16 flex flex-row justify-between sticky top-0 z-10 drop-shadow-sm">
      <Link
        aria-label="Homepage"
        className="logo w-40 h-16 ml-3 flex flex-col justify-center"
        href="/"
      >
        <Image
          alt="Breitling logo"
          className="max-sm:hidden"
          height="55"
          src="https://www.breitling.com/assets/images/corporate/asset-version-5d9cae3a35/breitling.svg"
          width="120"
        />
        <Image
          alt="Breitling logo"
          className="sm:hidden"
          height="24"
          src="https://www.breitling.com/assets/images/corporate/asset-version-acbd2e2a71/breitling-inline.svg"
          width="130"
        />
      </Link>
      <nav className="flex flex-col justify-center max-sm:hidden">
        <ul className="flex flex-row">
          <li className="ml-2 p-3">
            <Link
              href="#"
              className="uppercase hover:text-yellow-400 transition-all duration-150 ease-in"
            >
              Watches
            </Link>
          </li>
          <li className="ml-2 p-3">
            <Link
              href="#"
              className="uppercase hover:text-yellow-400 transition-all duration-150 ease-in"
            >
              Straps
            </Link>
          </li>
          <li className="p-3">
            <Link
              href="#"
              className="uppercase hover:text-yellow-400 transition-all duration-150 ease-in"
            >
              Stores
            </Link>
          </li>
          <li className="p-3">
            <Link
              href="#"
              className="uppercase hover:text-yellow-400 transition-all duration-150 ease-in"
            >
              Service
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="flex flex-col justify-center">
        <ul className="flex flex-row">
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
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </Link>
          </li>
          <li
            className="py-1 px-2 mr-3 hidden max-sm:block cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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

      {isMenuOpen && (
        <nav className="flex flex-col justify-center absolute z-10 top-0 left-0 w-screen h-screen bg-black/90">
          <div className="absolute right-6 font-bold top-3 text-4xl text-yellow-400" onClick={() => setIsMenuOpen(false)}>
              X
          </div>

          <ul className="flex flex-col ml-4">
            <li className="p-3 mb-4">
              <Link
                href="#"
                className="uppercase text-yellow-400 text-3xl"
              >
                Watches
              </Link>
            </li>
            <li className="p-3 mb-4">
              <Link
                href="#"
                className="uppercase text-yellow-400 text-3xl"
              >
                Straps
              </Link>
            </li>
            <li className="p-3 mb-4">
              <Link
                href="#"
                className="uppercase text-yellow-400 text-3xl"
              >
                Stores
              </Link>
            </li>
            <li className="p-3 mb-4">
              <Link
                href="#"
                className="uppercase text-yellow-400 text-3xl"
              >
                Service
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TopNav;
