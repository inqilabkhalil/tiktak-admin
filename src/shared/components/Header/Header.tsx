import { SearchInput } from "../SearchInput";
import Title from "../Title";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <Title/>
      <div className={styles.searchWrapper}>
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;