import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filterReducer, { Sort, updateSortBy } from "@/store/filterSlice";
import ProductSort from "./sort";

describe.skip("ProductSort component", () => {
  let store: ReturnType<typeof configureStore>;
  let dispatch: typeof store.dispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filter: filterReducer,
      },
    });
    dispatch = store.dispatch;
  });

  test("renders sort options", () => {
    render(
      <Provider store={store}>
        <ProductSort />
      </Provider>
    );

    expect(screen.getByText("Sort By:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Default" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ascending" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Descending" })).toBeInTheDocument();
  });

  test("sets selectedSort when sort option is clicked", () => {
    render(
      <Provider store={store}>
        <ProductSort />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Ascending" }));

    expect(dispatch).toHaveBeenCalledWith(updateSortBy(Sort.ASC));
  });
});
