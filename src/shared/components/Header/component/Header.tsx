import { SearchInput } from "../../SearchInput";
import styles from "../styles/Header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>TIK TAK ADMİN</h1>
      <div className={styles.searchWrapper}>
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;
