'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useRouter } from 'next/navigation';  // Importamos useRouter para redirección manual

export function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter(); // Usamos el hook useRouter para hacer redirección

  const handleLogout = async () => {
    // Cerrar sesión
    await signOut({ callbackUrl: '/' });

    // Redirigir manualmente a la página principal
    router.push('/');  // Esto redirige inmediatamente después del logout
  };

  if (session && session.user) {
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
        <p style={{ color: 'black', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px' }}>
          <IoMdCheckmarkCircleOutline style={{ color: 'green' }} />
          Logged in as {session.user.email ?? 'User'}
        </p>
        <button
          style={{
            padding: '12px 24px',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: '#4a4a4a',
            color: 'white',
            border: 'none',
            outline: 'none'
          }}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <button
      style={{
        padding: '12px 24px',
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        backgroundColor: '#4285f4',
        color: 'white',
        border: 'none',
        outline: 'none'
      }}
      onClick={() => signIn('google')}
    >
      <FcGoogle style={{ fontSize: '1.5em' }} />
      Log in with Google
    </button>
  );
}
