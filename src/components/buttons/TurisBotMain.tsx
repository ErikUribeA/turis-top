"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

interface InteractiveImageProps {
  imageUrl: string;
  welcomeMessage: string;
}

export default function TurisBotMain({ imageUrl, welcomeMessage }: InteractiveImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = useSession();
  const t = useTranslations();

  const handleClick = async () => {
    if (session && session.user) {
      // Usuario autenticado: cerrar sesión
      await signOut({ callbackUrl: "/" });
    } else {
      // Usuario no autenticado: iniciar sesión
      await signIn("google");
    }
  };

  return (
    <div
      className="fixed right-4 bottom-4 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        onClick={handleClick}
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="cursor-pointer"
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Interactive Image"
          width={300}
          height={100}
        />
      </motion.div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-full left-0 mb-2 p-4 bg-white rounded-lg shadow-lg max-w-xs dark:bg-gray-800 "
        >
          <div className="dark:text-gray-200 text-gray-800">{welcomeMessage}</div>
          <div className="absolute left-4 bottom-0 w-4 h-4 bg-white dark:bg-gray-600 transform rotate-45 translate-y-2" />
        </motion.div>
      )}
    </div>
  );
}
