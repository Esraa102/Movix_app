import { create } from "zustand";
import axios from "axios";
import { baseUrl } from "../constants/index.jsx";
import createToast from "../utils/createToast";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: true,
  isDeleting: false,
  signup: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, credentials, {
        withCredentials: true,
      });
      set({ user: response.data.user, isLoading: false });
      createToast("Account created! You're a member now", "success");
    } catch (error) {
      set({ user: null, isLoading: false });
      createToast(error.response.data.message || "An Error Occured", "error");
    }
  },
  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, credentials, {
        withCredentials: true,
      });
      set({ user: response.data.user, isLoading: false });
      createToast("Welcome back to our website!", "success");
    } catch (error) {
      set({ user: null, isLoading: false });
      createToast(error.response.data.message || "An Error Occured", "error");
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.get(`${baseUrl}/auth/logout`, { withCredentials: true });
      set({ user: null, isLoading: false });
      createToast("We're sad to see leave", "success");
    } catch (error) {
      set({ isLoading: false });
      createToast(error.response.data.message || "An Error Occured", "error");
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const resposne = await axios.get(`${baseUrl}/auth/check-auth`, {
        withCredentials: true,
      });
      set({ user: resposne.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false });
      console.log(error);
    }
  },
  deleteAccount: async () => {
    set({ isDeleting: true });
    try {
      await axios.delete(`${baseUrl}/auth/delete-account`, {
        withCredentials: true,
      });
      set({ user: null, isDeleting: false });
      createToast("We're sad to see leave", "success");
    } catch (error) {
      set({ isDeleting: false });
      console.log(error);
      createToast("An Error Occured", "error");
    }
  },
  modifyFavoriteList: (data) => {
    set((prev) => ({ user: { ...prev.user, favorite: data } }));
  },
  modifyWatchList: (data) => {
    set((prev) => ({ user: { ...prev.user, watchList: data } }));
  },
}));

export default useAuthStore;
