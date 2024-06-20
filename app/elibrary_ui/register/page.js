"use client";

import { authReg } from "@/api/auth";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowRegisterPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role_id, setRole_id] = useState("1");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("Selangor");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [role, setRole] = useState("ADMIN");
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

  function onChangeRole(e) {
    setRole(e.target.value);
    if (e.target.value === "ADMIN") {
      setRole_id(1);
    } else if (e.target.value === "LIBRARIAN") {
      setRole_id(2);
    } else if (e.target.value === "PATRON") {
      setRole_id(3);
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("Password and Confirm Password does not matched");
      return;
    }
    try {
      await authReg(
        username,
        fullName,
        password,
        role_id,
        address1,
        address2,
        state,
        email,
        phoneNo,
        role
      );
      router.push("/login");
    } catch (error) {
      console.log("fail");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ backgroundColor: "rgb(31 41 55)" }}>
      <ToastContainer />
      <br></br>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
        Register
      </h2>
      <br></br>
      <form onSubmit={submitHandler} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-white">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fullname" className="block mb-2 text-white">
            Full Name
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-white">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-white">
            Confirm Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address1" className="block mb-2 text-white">
            Address 1
          </label>
          <input
            id="address1"
            name="address1"
            type="text"
            onChange={(e) => setAddress1(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address2" className="block mb-2 text-white">
            Address 2
          </label>
          <input
            id="address2"
            name="address2"
            type="text"
            onChange={(e) => setAddress2(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block mb-2 text-white">
            State
          </label>
          <select
            id="state"
            name="state"
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="Selangor">Selangor</option>
            <option value="Perak">Perak</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNo" className="block mb-2 text-white">
            Phone Number
          </label>
          <input
            id="phoneNo"
            name="phoneNo"
            type="text"
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block mb-2 text-white">
            Role
          </label>
          <select
            id="role"
            name="role"
            onChange={onChangeRole}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="ADMIN">Admin</option>
            <option value="LIBRARIAN">Librarian</option>
            <option value="PATRON">Patron</option>
          </select>
        </div>

        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
      <br></br>
    </div>
  );
}
