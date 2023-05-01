import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Tab } from "@headlessui/react";
import {
  Attribute,
  Choice,
  Sort,
  updateChoices,
  updateSortBy,
} from "@/store/filterSlice";
import { useAppDispatch } from "@/store/hooks";

export default function ProductFilter({ attributes, count = "..." }: any) {
  const dispatch = useAppDispatch();
  const [selectedFilters, setSelectedFilter] = useState([]);
  const [selectedSort, setSelectedSort] = useState(Sort.default);

  const choicesMerged: Choice[] = attributes.reduce(
    (flat: any, toFlatten: any) => {
      if (!Array.isArray(flat)) {
        return flat.choices;
      }
      return flat.concat(toFlatten.choices);
    }
  );

  useEffect(() => {
    const choices = selectedFilters.map(
      (selectedFilter: string) =>
        choicesMerged.filter(
          (choice: Choice) => choice.slug === selectedFilter
        )[0]
    );

    dispatch(updateChoices(choices));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, dispatch]);

  useEffect(() => {
    dispatch(updateSortBy(selectedSort));
  }, [selectedSort, dispatch]);

  return (
    <div className="w-full h-16 shadow-sm bg-white flex flex-col justify-center mb-14">
      <div className="flex flex-row justify-between flex-nowrap">
        <div className="flex flex-row relative w-screen scrollbar-hide">
          <span className="max-sm:hidden ml-2 pt-1 text-sm">Filter:</span>

          {attributes.map((attribute: Attribute) => {
            return (
              <Listbox
                key={attribute.id}
                value={selectedFilters}
                onChange={setSelectedFilter}
                multiple
              >
                <div>
                  <Listbox.Button className="ml-2 border-1 border-gray-300 px-2 py-1 text-sm hover:text-yellow-400 rounded-sm h-8 w-18 overflow-hidden text-ellipsis">
                    {attribute.name}
                  </Listbox.Button>
                </div>

                <Listbox.Options className="bg-white absolute left-0 top-10 pt-0 w-screen flex flex-row flex-nowrap overflow-y-scroll scrollbar-hide h-12 border-b-1 border-b-gray-300">
                  {attribute.choices.map((choice: Choice) => (
                    <Listbox.Option
                      key={choice.id}
                      value={choice.slug}
                      as={Fragment}
                    >
                      {({ active: highlighted, selected }) => (
                        <li
                          className={`border-1 cursor-pointer mx-1 h-8 py-1.5 px-1 border-gray-300 w-20 transition-all ease-in-out duration-200 rounded-sm text-ellipsis overflow-hidden text-sm text-center
                  ${
                    selected || highlighted
                      ? "bg-yellow-400 text-white"
                      : "text-gray-900"
                  }`}
                        >
                          {choice.name}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            );
          })}
        </div>

        <div className="mr-2 max-md:hidden text-sm flex flex-row ">
          <div className="flex flex-row border-r-1 mr-2 pr-2">
            <div className="text-sm mb-1 text-center w-16 pt-2">Sort By:</div>
            <div className="flex flex-row">
              <Tab.Group
                defaultIndex={2}
                onChange={(index) => {
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
          </div>

          <span className="pt-0">{count} products</span>
        </div>
      </div>
    </div>
  );
}
