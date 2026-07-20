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

export interface CampaignState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  add: (data: CampaignPayload) => Promise<void>;
  update: (id: number, data: CampaignPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export interface CampaignModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: Campaign;
}

export interface CampaignFormValues {
  title: string;
  description: string;
  img_url: string;
}