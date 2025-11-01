import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAPI } from "../utils/FetchAPI";

export const fetchVideoDetail = createAsyncThunk(
  "detail/fetchVideoDetail",
  async (id) => {
    const data = await FetchAPI(`videos?part=snippet,statistics&id=${id}`);
    return data.items[0];
  }
);

export const fetchRelatedVideos = createAsyncThunk(
  "detail/fetchRelatedVideos",
  async (id) => {
    const data = await FetchAPI(
      `search?part=snippet&relatedToVideoId=${id}&type=video`
    );
    return data.items;
  }
);

export const fetchComments = createAsyncThunk(
  "detail/fetchComments",
  async (id) => {
    const data = await FetchAPI(
      `commentThreads?part=snippet&videoId=${id}&maxResults=30order=date`
    );
    return data.items.slice(0, 15);
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    video: null,
    relatedVideos: [],
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDetail: (state) => {
      state.video = null;
      state.relatedVideos = [];
      state.comments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Video Detail
      .addCase(fetchVideoDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideoDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Related Videos
      .addCase(fetchRelatedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedVideos = action.payload;
      })
      .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearDetail } = detailSlice.actions;
export default detailSlice.reducer;
