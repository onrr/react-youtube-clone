import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAPI } from "../utils/FetchAPI";


export const fetchVideos = createAsyncThunk(
  "youtube/fetchVideos",
  async (selectedCategory) => {
    const data = await FetchAPI(`search?part=snippet&q=${selectedCategory}&type=video`);
    return data.items;
  }
);

const initialCategory = localStorage.getItem("selectedCategory") || "All";


const youtubeSlice = createSlice({
  name: "youtube",
  initialState: {
    videos: [],
    selectedCategory: initialCategory,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.videos = [];
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = youtubeSlice.actions;
export default youtubeSlice.reducer;
