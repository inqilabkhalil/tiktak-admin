import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import styles from './login.module.css';
import { Header } from '../../shared/components/Header';
import loginImage from '../../shared/assets/images/login.png';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';

import { useAuthStore } from '@/features/auth/store/useAuthStore';

const Login = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleLogin = async () => {
    await login({
      phone,
      password,
    });

    if (localStorage.getItem('access_token')) {
      navigate('/users');
    }
  };

  return (
    <motion.div
      className={styles.login}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Header showSearch={false} showUserIcon={false} />

      <div className={styles.content}>
        <div className={styles.left}>
          <img src={loginImage} alt="Login" className={styles.loginImage} />
        </div>

        <div className={styles.right}>
          <div className={styles.form}>
            <h2>Admin Panel</h2>

            <div className={styles.inputGroup}>
              <label>Telefon</label>

              <Input
                type="tel"
                placeholder="+994..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Parol</label>

              <Input
                isPassword
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p
                style={{
                  color: 'red',
                  fontSize: '14px',
                  marginBottom: '12px',
                }}
              >
                {error}
              </p>
            )}

            <Button
              className={styles.loginButton}
              loading={loading}
              onClick={handleLogin}
            >
              Daxil ol
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
