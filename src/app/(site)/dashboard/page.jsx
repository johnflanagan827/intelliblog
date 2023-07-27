"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
          router.push("/dashboard/browse");
        }, 1000); 
    
        return () => clearTimeout(redirectTimeout);
      }, [router]);

    return (
        <></>
    )
}