'use client'
import { useTheme } from "./context/ThemeContext";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme(); // Accede al contexto de tema

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} pt-[66px]`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;