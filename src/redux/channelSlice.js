import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAPI } from "../utils/FetchAPI";


export const fetchChannelInfo = createAsyncThunk(
  "channel/fetchChannelInfo",
  async (id) => {
    const data = await FetchAPI(`channels?part=snippet%2Cstatistics&id=${id}`);
    return data.items[0];
  }
);

export const fetchChannelVideos = createAsyncThunk(
  "channel/fetchChannelVideos",
  async (id) => {
    const data = await FetchAPI(`search?channelId=${id}&part=snippet&order=date`);
    return data.items;
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channelInfo: null,
    channelVideos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        // Channel Info
      .addCase(fetchChannelInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelInfo.fulfilled, (state, action) => {
        state.channelInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchChannelInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Channel Video
      .addCase(fetchChannelVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelVideos.fulfilled, (state, action) => {
        state.channelVideos = action.payload;
        state.loading = false;
      })
      .addCase(fetchChannelVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default channelSlice.reducer;
