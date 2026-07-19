import styles from './login.module.css';
import Header from '../../shared/components/Header/component/Header';
import loginImage from '../../shared/assets/images/login.png';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';

const Login = () => {
  return (
    <div className={styles.login}>
      <Header showSearch={false} />

      <div className={styles.content}>
        <div className={styles.left}>
          <img src={loginImage} alt="Login" className={styles.loginImage} />
        </div>

        <div className={styles.right}>
          <div className={styles.form}>
            <h2>Admin Panel</h2>

            <div className={styles.inputGroup}>
              <label>Telefon</label>
              <Input placeholder="Telefon" />
            </div>

            <div className={styles.inputGroup}>
              <label>Parol</label>
              <Input isPassword placeholder="********" />
            </div>

            <Button className={styles.loginButton}>Daxil ol</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
