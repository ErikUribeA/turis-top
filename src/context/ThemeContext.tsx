'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';  // Definimos el tipo Theme

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined); // Aseguramos que el valor inicial sea undefined

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light'); // Inicializamos el estado del tema

  // Recuperamos el tema desde localStorage si existe
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);  // Usamos el tema guardado si existe
    } else {
      setTheme('light');  // Si no hay tema guardado, usamos 'light' como predeterminado
    }
  }, []);

  // Función para alternar entre los temas
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';  // Alternamos entre claro y oscuro
    setTheme(newTheme);  // Actualizamos el estado
    localStorage.setItem('theme', newTheme);  // Guardamos el tema en localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children} {/* Envolvemos el contenido de la aplicación */}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');  // Asegúrate de que esté dentro del ThemeProvider
  }
  return context;
};


