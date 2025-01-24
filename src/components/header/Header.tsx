'use client';

import Link from 'next/link';
import { useState } from 'react';
import SelectLanguage from '../inputs/SelectLanguage';
import { LoginButton } from '../buttons/LoginButton';
import styles from './Header.module.scss';
import {useTranslations} from 'next-intl';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const t = useTranslations('header');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Link href="/" className={styles.logo}>
                    TurisTop
                </Link>
                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle Menu">
                    <span className={menuOpen ? styles.active : ''}></span>
                </button>
                <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
                    <Link href="#destinations" className={styles.navLink}>
                    {t("destinations")}
                    </Link>
                    <Link href="#about" className={styles.navLink}>
                    {t("about")}
                    </Link>
                    <Link href="#contact" className={styles.navLink}>
                    {t("contact")}
                    </Link>
                    <div className={styles.mobileActions}>
                        <SelectLanguage />
                        <LoginButton />
                    </div>
                </nav>
                <div className={styles.desktopActions}>
                    <SelectLanguage />
                    <LoginButton />
                </div>
            </div>
        </header>
    );
}
