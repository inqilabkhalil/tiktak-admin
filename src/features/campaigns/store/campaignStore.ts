import { create } from "zustand";
import type { Campaign, CampaignPayload } from "../types/campaignType";
import {
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "../services/campaignService";

interface CampaignState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  add: (data: CampaignPayload) => Promise<void>;
  update: (id: number, data: CampaignPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCampaigns();
      set({ campaigns: data });
    } catch {
      set({ error: "Məlumatları yükləmək mümkün olmadı" });
    } finally {
      set({ loading: false });
    }
  },

  add: async (data) => {
    set({ loading: true, error: null });
    try {
      const created = await createCampaign(data);
      set({ campaigns: [...get().campaigns, created] });
    } catch {
      set({ error: "Əlavə etmək mümkün olmadı" });
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateCampaign(id, data);
      set({
        campaigns: get().campaigns.map((c) => (c.id === id ? updated : c)),
      });
    } catch {
      set({ error: "Yeniləmək mümkün olmadı" });
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteCampaign(id);
      set({ campaigns: get().campaigns.filter((c) => c.id !== id) });
    } catch {
      set({ error: "Silmək mümkün olmadı" });
    } finally {
      set({ loading: false });
    }
  },
}));