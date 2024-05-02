"use client";

import { useEffect, useState } from "react";
import { authLogin } from "@/api/auth";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import Link from "next/link";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      if (localStorage.getItem("role") == "PATRON") {
        router.push("/patron");
      } else if (localStorage.getItem("role") == "LIBRARIAN") {
        router.push("/librarian");
      } else if (localStorage.getItem("role") == "ADMIN") {
        router.push("/admin");
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await authLogin(username, password);
      localStorage.setItem("auth-token", response.token);
      localStorage.setItem("role", response.authorities[0].authority);
      localStorage.setItem("username", response.username);
      localStorage.setItem("fullname", response.fullName);
      localStorage.setItem("user_id", response.user_id);

      if (response.authorities[0].authority == "PATRON") {
        router.push("/patron");
      } else if (response.authorities[0].authority == "LIBRARIAN") {
        router.push("/librarian");
      } else if (response.authorities[0].authority == "ADMIN") {
        router.push("/admin");
      }
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      style={{ backgroundColor: "rgb(31 41 55)" }}
      className="min-h-screen flex items-center justify-center bg-grey-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <center>
            <img
              style={{ height: "200px", width: "150px" }} //jlm_logo_login //MMDISLogo
              src={`http://localhost:8080/resources/image/jlm_logo_login.png`}
            />
          </center>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
            <br></br>
            <Link
              href={"/register"}
              className="font-semibold flex justify-center leading-6 text-white hover:text-indigo-500"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
