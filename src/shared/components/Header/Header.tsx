import { SearchInput } from "../SearchInput";
import Title from "../Title";
import styles from "./Header.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useProfileStore } from "./store/profileStore";
import { useEffect } from "react";
type HeaderProps = {
  showSearch?: boolean;
  showUserIcon?: boolean;
};

const Header = ({ showSearch = true, showUserIcon = true }: HeaderProps) => {
  const profile = useProfileStore((state) => state.profile);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);

  useEffect(() => {
    if (showUserIcon && !profile) fetchProfile();
  }, [showUserIcon, profile, fetchProfile]);
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
            <Avatar
              src={profile?.img_url || undefined}
              size={36}
              icon={<UserOutlined />}
            />
            {profile?.role && (
              <span className={styles.userRole}>{profile.role}</span>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
