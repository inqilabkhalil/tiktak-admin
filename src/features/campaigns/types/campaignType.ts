export interface Campaign {
  id: number;
  title: string;
  description: string;
  img_url: string;
  created_at: string;
}

export interface CampaignPayload {
  title: string;
  description: string;
  img_url?: string;
}