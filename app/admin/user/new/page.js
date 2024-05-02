"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { fetchNotApprovedUserList } from "@/api/admin/getApi";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import NotApprovedUserTable from "../../component/NotApprovedUserTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowMonoLangList() {
  const [isLoading, setIsLoading] = useState(true);
  const [notApprovedUserList, setNotApprovedUserList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getNotApprovedUser() {
      setNotApprovedUserList(await fetchNotApprovedUserList());
      if (localStorage.getItem("toast-message")) {
        const toastMessage = localStorage.getItem("toast-message");
        toast.success(toastMessage);
        localStorage.removeItem("toast-message");
      }
    }

    getNotApprovedUser();
    setIsLoading(false);
  }, []);

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
          <p className="items-start w-1/2 text-center">User</p>
          <button
            className="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              router.back();
            }}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Back
          </button>
          <center>
            <br></br>

            <h3>New Registered User</h3>
            <NotApprovedUserTable data={notApprovedUserList} />
          </center>
        </div>
      </div>
    </div>
  );
}
