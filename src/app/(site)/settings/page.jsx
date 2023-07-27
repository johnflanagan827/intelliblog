"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Settings() {
    const router = useRouter();

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
          router.push("/settings/profile");
        }, 1000); 
    
        return () => clearTimeout(redirectTimeout);
      }, [router]);

    return (
        <></>
    )
}