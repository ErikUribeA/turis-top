"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useSession, signIn, signOut } from "next-auth/react"
import { useTheme } from "@/context/ThemeContext"


interface InteractiveImageProps {
  imageUrl: string
  welcomeMessage: string
}

export default function TurisBotMain({ imageUrl, welcomeMessage }: InteractiveImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { data: session } = useSession()
  const { theme } = useTheme() // Use the theme from your ThemeContext

  const handleClick = async () => {
    if (session && session.user) {
      await signOut({ callbackUrl: "/" })
    } else {
      await signIn("google")
    }
  }

  return (
    <div
      className={`fixed right-2 bottom-2 sm:right-4 sm:bottom-4 z-50 ${theme === "dark" ? "dark" : ""}`}
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
          className="w-44 h-auto sm:w-50 md:w-64 lg:w-70 xl:w-75"
        />
      </motion.div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-full left-0 mb-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xs"
        >
          <div className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">{welcomeMessage}</div>
          <div className="absolute left-4 bottom-0 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 translate-y-2" />
        </motion.div>
      )}
    </div>
  )
}

