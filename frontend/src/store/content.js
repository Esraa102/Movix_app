import { create } from "zustand";

const useContentStore = create((set) => ({
  contentType: "movie",
  time: "day",
  videoDetails: null,
  showVideo: false,
  setContentType: (type) => set({ contentType: type }),
  setContentTime: (time) => set({ time }),
  setVideoDetails: (videoDetails) => set({ videoDetails }),
  setShowVideo: (showVideo) => set({ showVideo }),
}));

export default useContentStore;
