import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { Sidebar } from '../Sidebar';
import styles from './styles/Layout.module.css';
import '../../../App.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <div className={styles.layout}>
          <Sidebar />
          <main className={styles.page}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
