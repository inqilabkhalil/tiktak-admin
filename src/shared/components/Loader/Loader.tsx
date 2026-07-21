import { ConfigProvider, Spin } from 'antd';

import { COLORS } from '../../constants/colors';

export const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
      <ConfigProvider theme={{ token: { colorPrimary: COLORS.mainGreen } }}>
        <Spin size="large" />
      </ConfigProvider>
    </div>
  );
};
