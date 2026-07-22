import styles from "./PageTitle.module.css";

interface PageTitleProps {
    children: React.ReactNode;
}

export const PageTitle = ({children}: PageTitleProps) => {
    return <h1 className={styles.title}>{children}</h1>
}