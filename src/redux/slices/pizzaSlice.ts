import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type FetchPizzasArg = {
  category: string;
  arrow: string;
  search: string;
  sortList: string[];
  sortType: number;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArg>(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { category, arrow, search, sortList, sortType, currentPage } = params;
    const { data } = await axios.get(
      `https://63f67ab959c944921f74dd84.mockapi.io/items?${category}&limit=4&page=${currentPage}&sortBy=${sortList[sortType]}&${arrow}&${search}`
    );

    return data;
  }
);

type PizzaItem = {
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  id: string;
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlise = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      if (action.payload.length > 0) {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      } else {
        state.status = Status.ERROR;
      }
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export default pizzaSlise.reducer;
