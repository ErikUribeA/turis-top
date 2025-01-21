"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import styles from './LoginButton.module.scss' 

export function LoginButton() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
    router.push("/")
  }

  if (session && session.user) {
    return (
        <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>
          Log out
        </button>
    )
  }

  return (
    <button className={`${styles.button} ${styles.login}`} onClick={() => signIn("google")}>
      Log in with Google
    </button>
  )
}
