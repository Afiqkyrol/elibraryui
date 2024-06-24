"use client";

import { useEffect, useState } from "react";

export default function LibrarianLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      window.location.href = "/elibrary_ui";
      return null;
    }

    if (localStorage.getItem("role") != "LIBRARIAN") {
      if (localStorage.getItem("role") === "PATRON") {
        window.location.href = "/patron";
        return null;
      } else if (localStorage.getItem("role") === "ADMIN") {
        window.location.href = "/admin";
        return null;
      }
    }

    setIsLoading(false);
  }, []);

  return <>{children}</>;
}
