// pages/index.tsx (or index.js if you're not using TypeScript)
"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Directly route to the sign-in page
  router.push('/sign-in');

  // This return statement is optional since the routing happens before anything is rendered
  return null;
}
