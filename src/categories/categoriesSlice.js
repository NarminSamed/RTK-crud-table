import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice.js";

const initialState = {
  data: [],
  favorites: [],
  basket: [],
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { dispatch }) => {
    const response = await dispatch(
      apiSlice.endpoints.getCategories.initiate()
    );
    return response.data;
  }
);

export const addFavorite = createAsyncThunk(
  "categories/addFavorite",
  async (id, { getState }) => {
    const { favorites } = getState().categories;
    return favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addBasket: (state, action) => {
      const id = action.payload;
      const item = state.basket.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      } else {
        state.basket.push({ id, quantity: 1 });
      }
    },
    removeBasket: (state, action) => {
      const id = action.payload;
      const item = state.basket.find((item) => item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.basket = state.basket.filter((item) => item.id !== id);
        }
      }
    },
    increment: (state, action) => {
      const id = action.payload;
      const item = state.basket.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const id = action.payload;
      const item = state.basket.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.basket = state.basket.filter((item) => item.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const { addBasket, removeBasket, increment, decrement, removeItem } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
