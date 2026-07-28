import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../Header';
import { Sidebar } from '../Sidebar';
import styles from './styles/Layout.module.css';
import '../../../App.css';

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="app-container">
        <div className={styles.layout}>
          <Sidebar />
          <main className={styles.page}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
};
