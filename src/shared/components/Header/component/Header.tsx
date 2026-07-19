import { SearchInput } from '../../SearchInput';
import styles from '../styles/Header.module.css';

type HeaderProps = {
  showSearch?: boolean;
};
const Header = ({ showSearch = true }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>TIK TAK ADMİN</h1>
      <div className={styles.searchWrapper}>
        {showSearch && <SearchInput />}
      </div>
    </header>
  );
};

export default Header;
