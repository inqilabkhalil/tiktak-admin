import { Spin } from 'antd';

import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
      <Spin size="large" className={styles.spin} />
    </div>
  );
};
