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
  add: (data: CampaignPayload) => Promise<boolean>;
  update: (id: number, data: CampaignPayload) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
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
