"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './LoginButton.module.scss';
import {useTranslations} from 'next-intl';
import { useTheme } from '../../context/ThemeContext';

export function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations();
  const { theme } = useTheme();
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    router.push("/");
  }

  if (session && session.user) {
    return (
        <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>
          {t("logout")}
        </button>
    )
  }

  return (
    <button className={`${styles.button} ${theme === 'dark' ? styles.dark : styles.light} ${styles.login}`} onClick={() => signIn("google")}>
      {t("login")}
    </button>
  )
}
