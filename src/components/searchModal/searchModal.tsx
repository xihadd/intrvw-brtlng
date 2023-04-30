import React from "react";
import { useState, Fragment } from "react";
import { useDebounce } from "react-use";
import { useLazyQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleSearch } from "@/store/layoutSlice";
import { getProductsBySearch } from "@/queries";
import ProductGrid from "../productGrid/productGrid";

export default function SearchModal(props: {}) {
  const searchOpen = useAppSelector((state) => state.layout.searchOpen);
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const [doSearch, { called, loading, data }] = useLazyQuery(
    getProductsBySearch,
    {
      variables: { filter: { search: debounceQuery } },
    }
  );

  console.log();

  useDebounce(
    () => {
      if (searchQuery !== debounceQuery) {
        setDebounceQuery(searchQuery);
        doSearch();
      }
    },
    500,
    [searchQuery]
  );

  const onClose = () => {
    dispatch(toggleSearch());
    setSearchQuery("");
    // clear results?
  };

  return (
    <Transition show={searchOpen} as={Fragment}>
      <Dialog open={searchOpen} onClose={() => onClose()}>
        <div className="fixed inset-0 flex items-start justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="w-full h-screen bg-white overflow-hidden">
              <div
                className="max-sm:hidden absolute right-6 top-20 text-5xl font-light text-gray-400 z-10 cursor-pointer"
                onClick={() => dispatch(toggleSearch())}
              >
                x
              </div>
              <div className="flex flex-col m-2 pt-24">
                <h4 className="max-sm:hidden text-yellow-400 text-3xl uppercase font-light mx-auto mb-4">
                  Search
                </h4>
                <input
                  className="mx-auto w-full sm:w-1/2 md:min-w-96 mb-6 py-2 px-3 block border-gray-300 border-1 rounded-sm text-md"
                  type="text"
                  value={searchQuery || ""}
                  placeholder={"What are you looking for?"}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  tabIndex={1}
                />
              </div>
              {called && loading && (
                <div className="text-center">Loading...</div>
              )}
              {data?.products.totalCount === 0 && (
                <div className="w-full text-center">No results found</div>
              )}
              {data && <ProductGrid products={data?.products?.edges} />}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
