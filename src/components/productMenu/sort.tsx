import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
  Sort,
  updateSortBy,
} from "@/store/filterSlice";
import { useAppDispatch } from "@/store/hooks";

const ProductSort = () => {
    const dispatch = useAppDispatch();
    const [selectedSort, setSelectedSort] = useState(Sort.default);

    useEffect(() => {
        dispatch(updateSortBy(selectedSort));
      }, [selectedSort, dispatch]);

    return (
        <>
        <div className="text-sm mb-1 text-center w-16 pt-2">Sort By:</div>
            <div className="flex flex-row">
              <Tab.Group
                defaultIndex={2}
                onChange={(index) => {
                  // 🫣
                  switch (index) {
                    case 0:
                      setSelectedSort(Sort.ASC);
                      break;
                    case 1:
                      setSelectedSort(Sort.DESC);
                      break;
                    case 2:
                    default:
                      setSelectedSort(Sort.default);
                      break;
                  }
                }}
              >
                <Tab.List className="flex space-x-1">
                  {Object.keys(Sort).map((sortType) => (
                    <Tab key={sortType} as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={` border-1 h-8 py-1.5 px-1 capitalize outline-none
                            ${selected
                              ? "bg-yellow-400 text-white"
                              : ""}`}
                        >
                          {sortType}
                        </button>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
        </>
    )
}

export default ProductSort;