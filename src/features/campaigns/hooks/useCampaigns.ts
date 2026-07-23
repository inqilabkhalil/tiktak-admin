import { Modal, message } from 'antd';

import { useCampaignStore } from '../store/campaignStore';
import type { CampaignPayload } from '../types/campaignType';

export const useCampaigns = () => {
  const { campaigns, loading, fetchAll, add, update, remove } = useCampaignStore();

  const createCampaign = async (values: CampaignPayload) => {
    const success = await add(values);
    if (success) {
      message.success('Kampaniya uğurla yaradıldı');
    } else {
      message.error('Kampaniya yaradılarkən xəta baş verdi');
    }
    return success;
  };

  const updateCampaign = (id: number, values: CampaignPayload) => {
    return new Promise<boolean>((resolve) => {
      Modal.confirm({
        title: 'Kampaniyanı yeniləmək istədiyinizə əminsiniz?',
        content: 'Dəyişikliklər yadda saxlanılacaq.',
        okText: 'Bəli, yenilə',
        cancelText: 'İmtina',
        onOk: async () => {
          const success = await update(id, values);
          if (success) {
            message.success('Kampaniya uğurla yeniləndi');
          } else {
            message.error('Kampaniyanı yeniləmək mümkün olmadı');
          }
          resolve(success);
        },
        onCancel: () => resolve(false),
      });
    });
  };

  const deleteCampaign = async (id: number) => {
    const success = await remove(id);
    if (success) {
      message.success('Kampaniya uğurla silindi');
    } else {
      message.error('Kampaniyanı silmək mümkün olmadı');
    }
    return success;
  };

  return { campaigns, loading, fetchAll, createCampaign, updateCampaign, deleteCampaign };
};
