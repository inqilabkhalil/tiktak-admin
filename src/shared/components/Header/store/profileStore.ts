import { create } from "zustand";
import api from "@/shared/services/api";
import type { Profile } from "../types/profile";

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const response = await api.get("/admin/profile");
      set({ profile: response.data.data });
    } catch {
      set({ profile: null });
    } finally {
      set({ loading: false });
    }
  },

  clearProfile: () => set({ profile: null }),
}));