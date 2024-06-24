"use client";

import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      window.location.href = "/elibrary_ui";
      return null;
    }

    if (localStorage.getItem("role") != "ADMIN") {
      if (localStorage.getItem("role") === "PATRON") {
        window.location.href = "/patron";
        return null;
      } else if (localStorage.getItem("role") === "LIBRARIAN") {
        window.location.href = "/librarian";
        return null;
      }
    }

    setIsLoading(false);
  }, []);

  return <>{children}</>;
}
