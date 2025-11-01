import { createSlice } from "@reduxjs/toolkit";

const initialCategory = localStorage.getItem("selectedCategory") || "All";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    selectedCategory: initialCategory,
    isOpen: true,
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      localStorage.setItem("selectedCategory", action.payload);
    },
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setCategory, toggleIsOpen  } = categorySlice.actions;
export default categorySlice.reducer;
