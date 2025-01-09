import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuth = create((set) => {
  return {
    user: null,
    isSigningup: false,
    isCheckingAuth: true,
    isSigningout: false,
    isSigningin: false,

    authUserCheck: async () => {
      set({ isCheckingAuth: true });
      try {
        const response = await axios.get("/api/v1/auth/check");
        set({ user: response.data.user, isCheckingAuth: false });
      } catch (e) {
        set({ isCheckingAuth: false, user: null });
        console.log(e);
      }
    },

    signup: async (creds) => {
      set({ isSigningup: true });
      try {
        const response = await axios.post("/api/v1/auth/signup", creds);
        set({ user: response.data.user, isSigningup: false });
        toast.success("Account created successfully");
      } catch (e) {
        console.log(e.response.data);

        /* single error printing */
        if (!Array.isArray(e.response.data.errors)) {
          toast.error(e.response.data.message);
        }
        /* already shown error marking */
        const shownFields = new Set();

        e.response.data.errors.forEach((err) => {
          if (!shownFields.has(err.field)) {
            toast.error(err.message);
            shownFields.add(err.field);
          }
        });
        set({ isSigningup: false, user: null });
      }
    },

    signout: async () => {
      set({ isSigningout: true });
      try {
        await axios.post("/api/v1/auth/signout");
        set({ user: null, isSigningout: false });
        toast.success("Logged out succesfully");
      } catch (e) {
        set({ isSigningout: false });
        toast.error(e.response.data.message || "Logout failed");
      }
    },

    signin: async (creds) => {
      set({ isSigningin: true });
      try {
        const response = await axios.post("/api/v1/auth/signin", creds);
        set({ user: response.data.user, isSigningin: false });
        toast.success("Signed in succesfully");
      } catch (e) {
        console.log(e.response.data);

        if (!Array.isArray(e.response.data.message)) {
          toast.error(e.response.data.message);
        }
        const shownFields = new Set();

        e.response.data.message.forEach((err) => {
          if (!shownFields.has(err.field)) {
            toast.error(err.message);
            shownFields.add(err.field);
          }
        });
        set({ isSigningin: false, user: null });
      }
    },
  };
});
