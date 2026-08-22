import { create } from "zustand";
import type { CampaignState } from "../types/campaignType";
import {
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "../services/campaignService";

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCampaigns();
      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime() ||
          b.id - a.id,
      );
      set({ campaigns: sorted });
    } catch {
      set({ error: "Məlumatları yükləmək mümkün olmadı" });
    } finally {
      set({ loading: false });
    }
  },

  add: async (data) => {
    set({ loading: true, error: null });
    try {
      await createCampaign(data);
      await get().fetchAll();
      return true;
    } catch {
      set({ error: "Əlavə etmək mümkün olmadı" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateCampaign(id, data);
      await get().fetchAll(); // 👈 map əvəzinə, təzə siyahı çəkilir
      return true;
    } catch {
      set({ error: "Yeniləmək mümkün olmadı" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteCampaign(id);
      await get().fetchAll();
      return true;
    } catch {
      set({ error: "Silmək mümkün olmadı" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
