import { configureStore } from "@reduxjs/toolkit";
import youtubeReducer from "./youtubeSlice";
import detailReducer from "./detailSlice";
import searchReducer from "./searchSlice";
import channelReducer from "./channelSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    youtube: youtubeReducer,
    detail: detailReducer,
    search: searchReducer,
    channel: channelReducer,
    category: categoryReducer,
  },
});
