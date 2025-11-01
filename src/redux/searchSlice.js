import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAPI } from "../utils/FetchAPI";


export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query) => {
    const data = await FetchAPI(
      `search?part=snippet&q=${query}&type=video`
    );

    return data.items.slice(0,20);
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
    query: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearchResults: (state) => {
      state.results = [];
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
