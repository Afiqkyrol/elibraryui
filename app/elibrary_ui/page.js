// app/page.js or any other page component within the app directory
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { authCheck } from "@/api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (localStorage.getItem("auth-token") != null) {
      if (localStorage.getItem("role") == "PATRON") {
        router.push("/elibrary_ui/patron");
      } else if (localStorage.getItem("role") == "LIBRARIAN") {
        router.push("/elibrary_ui/librarian");
      } else if (localStorage.getItem("role") == "ADMIN") {
        router.push("/elibrary_ui/admin");
      }
    } else {
      if (token == null) {
        toast.error("Access Denied");
      } else {
        setToken(token);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    async function redirect() {
      try {
        console.log(token.replace(/ /g, "+"));
        const response = await authCheck(token);
        localStorage.setItem("auth-token", response.token);
        localStorage.setItem("role", response.authorities[0].authority);
        localStorage.setItem("username", response.username);
        localStorage.setItem("fullname", response.fullName);
        localStorage.setItem("user_id", response.user_id);

        if (response.authorities[0].authority == "PATRON") {
          router.push("/elibrary_ui/patron");
        } else if (response.authorities[0].authority == "LIBRARIAN") {
          router.push("/elibrary_ui/librarian");
        } else if (response.authorities[0].authority == "ADMIN") {
          router.push("/elibrary_ui/admin");
        }
      } catch (error) {
        setError("Invalid token");
        console.error("Login error:", error);
      }
    }

    if (token != null) {
      redirect();
    }
  }, [token]);

  if (isLoading) {
    return (
      <div>
        <ToastContainer />
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to eLibrary UI</h1>
      {error ? <p>Your token is: {error}</p> : <p>Error</p>}
    </div>
  );
};

export default HomePage;
