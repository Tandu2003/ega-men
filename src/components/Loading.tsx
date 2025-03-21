import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex h-[60vh] w-screen items-center justify-center">
      <motion.div
        className="flex items-center justify-center space-x-2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.svg
          className="h-8 w-8 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.708 4.707M16.293 7.292A8.001 8.001 0 0120 12h4c0-6.627-5.373-12-12-12v4z"
          ></path>
        </motion.svg>
      </motion.div>
    </div>
  );
}
