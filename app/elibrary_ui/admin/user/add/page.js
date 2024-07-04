"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/elibrary_ui/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import { saveUser } from "@/api/admin/postApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowMonoLangList() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [role_id, setRole_id] = useState();
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  async function submitHandler(e) {
    e.preventDefault();

    const thisUsername = localStorage.getItem("username");
    if (role === "ADMIN") {
      setRole_id(1);
    } else if (role === "LIBRARIAN") {
      setRole_id(2);
    } else if (role === "PATRON") {
      setRole_id(3);
    }

    try {
      await saveUser(
        username,
        fullName,
        password,
        address1,
        address2,
        state,
        email,
        phoneNo,
        thisUsername,
        role,
        role_id
      );
      localStorage.setItem("toast-message", "Add Successful");
      router.push("/elibrary_ui/admin/user");
    } catch (error) {
      toast.error("Error");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex">
      <AdminLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Add User</p>
          <button
            className="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div>
          <center>
            <br></br>
            <form onSubmit={submitHandler} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="username" className="block">
                  IC
                </label>
                <input
                  name="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="fullname" className="block">
                  Full Name
                </label>
                <input
                  name="fullname"
                  type="text"
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address1" className="block">
                  Address 1
                </label>
                <input
                  name="address1"
                  type="text"
                  onChange={(e) => setAddress1(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address2" className="block">
                  Address 2
                </label>
                <input
                  name="address2"
                  type="text"
                  onChange={(e) => setAddress2(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="state" className="block">
                  State
                </label>
                <select
                  name="state"
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                >
                  <option>Select...</option>
                  <option value="Selangor">Selangor</option>
                  <option value="Perak">Perak</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNo" className="block">
                  Phone
                </label>
                <input
                  name="phoneNo"
                  type="text"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="role" className="block">
                  Role
                </label>
                <select
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="LIBRARIAN">Librarian</option>
                  <option value="PATRON">Patron</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
}
