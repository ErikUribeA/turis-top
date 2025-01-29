'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import SelectLanguage from '../inputs/SelectLanguage';
import { LoginButton } from '../buttons/LoginButton';
import styles from './Header.module.scss';
import { useTranslations } from 'next-intl';
import { PiSunDimFill } from "react-icons/pi";
import { FaMoon } from "react-icons/fa";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('header');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`${styles.header} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logo}>
          TurisTop
        </Link>
        <div>
          <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle Menu">
            <span className={`${styles.hamburgerIcon} ${menuOpen ? styles.active : ''}`}></span>
          </button>
        </div>
        <nav className={`${styles.nav} ${theme === 'dark' ? styles.dark : styles.light} ${menuOpen ? styles.open : ''}`}>
          <Link href="#destinations" className={styles.navLink}>
            {t('destinations')}
          </Link>
          <Link href="#about" className={styles.navLink}>
            {t('about')}
          </Link>
          <Link href="#contact" className={styles.navLink}>
            {t('contact')}
          </Link>
          <div className={styles.mobileActions}>
            <div className={styles.mobileLogin}>
              <SelectLanguage />
              <LoginButton />
            </div>
            <button onClick={toggleTheme} aria-label="Toggle Theme" className={styles.themeToggle}>
              {theme === 'light' ? (
                <span role="img" aria-label="Moon"> <FaMoon className='text-[1em]'/> </span>
              ) : (
                <span role="img" aria-label="Sun"> <PiSunDimFill  className='text-[1.5em]'/> </span>
              )}
            </button>
          </div>
        </nav>
        <div className={styles.desktopActions}>
          <SelectLanguage />
          <LoginButton />
          <button onClick={toggleTheme} aria-label="Toggle Theme" className={styles.themeToggle}>
            {theme === 'light' ? (
              <span role="img" aria-label="Moon"> <FaMoon /> </span>
            ) : (
              <span role="img" aria-label="Sun"> <PiSunDimFill /></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
