"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      if (localStorage.getItem("role") == "PATRON") {
        router.push("/elibrary_ui/patron");
      } else if (localStorage.getItem("role") == "LIBRARIAN") {
        router.push("/elibrary_ui/librarian");
      } else if (localStorage.getItem("role") == "ADMIN") {
        router.push("/elibrary_ui/admin");
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen"></div>
  );
}
