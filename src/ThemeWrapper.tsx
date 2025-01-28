'use client'
import { useTheme } from "./context/ThemeContext";
import styles from './ThemeWrapper.module.scss';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme(); // Accede al contexto de tema

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;