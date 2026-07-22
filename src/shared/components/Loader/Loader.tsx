import { ConfigProvider, Spin } from 'antd';

export const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
      <ConfigProvider theme={{ token: { colorPrimary: 'var(--color-main-green)' } }}>
        <Spin size="large" />
      </ConfigProvider>
    </div>
  );
};
