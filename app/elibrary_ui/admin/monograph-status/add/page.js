"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/elibrary_ui/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import { saveMonoStatus } from "@/api/admin/postApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowMonoStatusList() {
  const [isLoading, setIsLoading] = useState(true);
  const [stsName, setStsName] = useState("");
  const [stsDescription, setStsDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await saveMonoStatus(stsName, stsDescription);
      localStorage.setItem("toast-message", "Add Successful");
      router.push("/elibrary_ui/admin/monograph-status");
    } catch (error) {
      toast.error("Error");
    }
  }

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
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
          <p className="items-start w-1/2 text-center">Add Monograph Status</p>
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
                  Status Name
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setStsName(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status Description
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setStsDescription(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
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
