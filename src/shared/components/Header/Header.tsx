import { SearchInput } from "../SearchInput";
import Title from "../Title";
import styles from "./Header.module.css";

type HeaderProps = {
  showSearch?: boolean;
};

const Header = ({ showSearch = true }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.titleColumn}>
          <Title />
        </div>
        {showSearch && (
          <div className={styles.searchColumn}>
            <div className={styles.searchWrapper}>
              <SearchInput />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;