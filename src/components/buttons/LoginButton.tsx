"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { useRouter } from "next/navigation"

export function LoginButton() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
    router.push("/")
  }

  if (session && session.user) {
    return (
      <div className="login-container">
        <p className="user-info">
          <IoMdCheckmarkCircleOutline className="check-icon" />
          Logged in as {session.user.email ?? "User"}
        </p>
        <button className="button logout" onClick={handleLogout}>
          Log out
        </button>
        <style jsx>{`
          .login-container {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
          }
          .user-info {
            color: #333;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
          }
          .check-icon {
            color: #4caf50;
            font-size: 1.2em;
          }
          .button {
            padding: 12px 24px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            border: none;
            outline: none;
            transition: background-color 0.3s ease, transform 0.1s ease;
          }
          .button:hover {
            transform: translateY(-2px);
          }
          .button:active {
            transform: translateY(0);
          }
          .logout {
            background-color: #f44336;
            color: white;
          }
          .logout:hover {
            background-color: #d32f2f;
          }
          @media (max-width: 600px) {
            .login-container {
              flex-direction: column;
              align-items: stretch;
            }
            .button {
              width: 100%;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <button className="button login" onClick={() => signIn("google")}>
      <FcGoogle className="google-icon" />
      Log in with Google
      <style jsx>{`
        .button {
          padding: 12px 24px;
          border-radius: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          outline: none;
          transition: background-color 0.3s ease, transform 0.1s ease;
        }
        .button:hover {
          transform: translateY(-2px);
        }
        .button:active {
          transform: translateY(0);
        }
        .login {
          background-color: #4285f4;
          color: white;
        }
        .login:hover {
          background-color: #3367d6;
        }
        .google-icon {
          font-size: 1.5em;
        }
        @media (max-width: 600px) {
          .button {
            width: 100%;
          }
        }
      `}</style>
    </button>
  )
}