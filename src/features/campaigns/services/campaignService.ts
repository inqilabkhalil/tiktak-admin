import api from "@/shared/services/api";
import type { Campaign, CampaignPayload } from "../types/campaignType"; // öz path-ına uyğunlaşdır

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await api.get("admin/campaigns");
  return response.data.data;
};

export const createCampaign = async (data: CampaignPayload): Promise<Campaign> => {
  const response = await api.post("admin/campaign", data);
  return response.data.data;
};

export const updateCampaign = async (id: number, data: CampaignPayload): Promise<Campaign> => {
  const response = await api.put(`admin/campaigns/${id}`, data);
  return response.data.data;
};

export const deleteCampaign = async (id: number) => {
  const response = await api.delete(`admin/campaigns/${id}`);
  return response.data;
};