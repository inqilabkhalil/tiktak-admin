import { SearchInput } from "../SearchInput";
import Title from "../Title";
import styles from "./Header.module.css";
import { UserOutlined } from "@ant-design/icons";
type HeaderProps = {
  showSearch?: boolean;
  showUserIcon?: boolean;
};

const Header = ({ 
  showSearch = true,
  showUserIcon = true
 }: HeaderProps) => {
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
        {showUserIcon && (
          <div className={styles.userIcon}>
            <UserOutlined />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
