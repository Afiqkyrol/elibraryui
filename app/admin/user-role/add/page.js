"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import { saveUserRole } from "@/api/admin/postApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowReservationList() {
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await saveUserRole(type, description, active);
      localStorage.setItem("toast-message", "Add Successful");
      router.push("/admin/user-role");
    } catch (error) {
      toast.error("Error");
    }
  }

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.location.href = "/login";
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <AdminLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Add User Role</p>
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
            <form onSubmit={submitHandler} className="max-w-sm mx-auto mt-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role Type
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role Description
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role Active
                </label>
                <select onChange={(e) => setActive(e.target.value)}>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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