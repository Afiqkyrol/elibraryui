"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import { fetchMonoBorrowStatus } from "@/api/admin/getApi";
import { updateMonoBorrowStatus } from "@/api/admin/putApi";
import { deleteBorrowStatus } from "@/api/admin/deleteApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowSubjectUpdatePage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [monoBorrowStatus, setBorrowMonoStatus] = useState([]);
  const [borrowStatusName, setBorrowStatusName] = useState("");
  const [borrowStatusDescription, setBorrowStatusDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getMonoBorrowStatus() {
      setBorrowMonoStatus(await fetchMonoBorrowStatus(params.borrowStsId));
    }

    getMonoBorrowStatus();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function initValue() {
      setBorrowStatusName(monoBorrowStatus.borrow_sts_status);
      setBorrowStatusDescription(monoBorrowStatus.borrow_sts_description);
    }

    initValue();
  }, [monoBorrowStatus]);

  async function deleteHandler() {
    try {
      await deleteBorrowStatus(params.borrowStsId);
      localStorage.setItem("toast-message", "Delete successful");
      router.push("/admin/monograph-borrow-status");
    } catch (error) {
      toast.error("Error");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await updateMonoBorrowStatus(
        params.borrowStsId,
        borrowStatusName,
        borrowStatusDescription
      );
      localStorage.setItem("toast-message", "Update successful");
      router.push("/admin/monograph-borrow-status");
    } catch (error) {
      console.log("fail");
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
          <p className="items-start w-1/2 text-center">
            Update Monograph Borrow Status
          </p>
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
                  Status Name
                </label>
                <input
                  type="text"
                  value={borrowStatusName}
                  onChange={(e) => {
                    setBorrowStatusName(e.target.value);
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
                  value={borrowStatusDescription}
                  onChange={(e) => {
                    setBorrowStatusDescription(e.target.value);
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
