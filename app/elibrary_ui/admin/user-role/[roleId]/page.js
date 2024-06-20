"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/elibrary_ui/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import { fetchUserRole } from "@/api/admin/getApi";
import { updateUserRole } from "@/api/admin/putApi";
import { deleteRole } from "@/api/admin/deleteApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowLanguageUpdatePage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState([]);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function getUserRole() {
      setUserRole(await fetchUserRole(params.roleId));
    }

    getUserRole();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function initValue() {
      setType(userRole.roles_type);
      setDescription(userRole.roles_description);
      setActive(userRole.roles_active);
    }

    initValue();
  }, [userRole]);

  async function deleteHandler() {
    try {
      await deleteRole(params.roleId);
      localStorage.setItem("toast-message", "Delete successful");
      router.push("/elibrary_ui/admin/user-role");
    } catch (error) {
      toast.error("Error");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await updateUserRole(params.roleId, type, description, active);
      localStorage.setItem("toast-message", "Update Successful");
      router.push("/elibrary_ui/admin/user-role");
    } catch (error) {
      toast.error("Error");
    }
  }

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.location.href = "/elibrary_ui/login";
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
          <p className="items-start w-1/2 text-center">Update User Role</p>
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
            <button
              onClick={deleteHandler}
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <form onSubmit={submitHandler} className="max-w-sm mx-auto mt-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role Name
                </label>
                <input
                  type="text"
                  value={type}
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
                  value={description}
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
                  <option value={0} selected={active == "0"}>
                    0
                  </option>
                  <option value={1} selected={active == "1"}>
                    1
                  </option>
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
