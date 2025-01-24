"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './LoginButton.module.scss';
import {useTranslations} from 'next-intl';

export function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations();

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
    <button className={`${styles.button} ${styles.login}`} onClick={() => signIn("google")}>
      {t("login")}
    </button>
  )
}
