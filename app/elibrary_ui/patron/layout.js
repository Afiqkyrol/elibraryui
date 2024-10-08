"use client";

import { useEffect, useState } from "react";
import "@/app/globals.css";

export default function PatronLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      window.location.href = "/elibrary_ui";
      return null;
    }

    if (localStorage.getItem("role") != "PATRON") {
      if (localStorage.getItem("role") === "LIBRARIAN") {
        window.location.href = "/elibrary_ui/librarian";
        return null;
      } else if (localStorage.getItem("role") === "ADMIN") {
        window.location.href = "/elibrary_ui/admin";
        return null;
      }
    }

    setIsLoading(false);
  }, []);

  return <>{children}</>;
}
