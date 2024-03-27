// pages/index.tsx (or index.js if you're not using TypeScript)
"use client"
import { useRouter } from "next/navigation";
import Button from "./components/button";

export default function Home() {
  const router = useRouter();

  const handleNavItemClick = () => {
    router.push('/sign-in')
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <button
        className=" bg-clay hover:bg-green hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-4xl px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleNavItemClick}
      >
        Sign In
      </button>
    </div>
  )
}
