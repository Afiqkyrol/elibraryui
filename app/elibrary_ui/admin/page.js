"use client";

import { useEffect, useState } from "react";
import Loading from "../loading";
import AdminLeftSideBar from "./component/AdminLeftSideBar";
import {
  fetchApprovedUserList,
  fetchNotApprovedUserList,
} from "@/api/admin/getApi";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState("");
  const [approvedCount, setApprovedCount] = useState("");
  const [newUserCount, setNewUserCount] = useState("");

  useEffect(() => {
    async function getUser() {
      setUserCount();
      setApprovedCount(await fetchApprovedUserList());
      setNewUserCount(await fetchNotApprovedUserList());
    }

    getUser();
    setIsLoading(false);
  }, []);

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
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Dashboard</p>
          <button
            class="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <Link href={"/elibrary_ui/admin/monograph-type"}>
                <h2 className="text-lg font-semibold mb-2">Monograph Type</h2>
                <p></p>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <Link href={"/elibrary_ui/admin/monograph-subject"}>
                <h2 className="text-lg font-semibold mb-2">
                  Monograph Subject
                </h2>
                <p></p>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <Link href={"/elibrary_ui/admin/monograph-language"}>
                <h2 className="text-lg font-semibold mb-2">
                  Monograph Language
                </h2>
                <p></p>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <Link href={"/elibrary_ui/admin/monograph-status"}>
                <h2 className="text-lg font-semibold mb-2">Monograph Status</h2>
                <p></p>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <Link href={"/elibrary_ui/admin/monograph-book-status"}>
                <h2 className="text-lg font-semibold mb-2">
                  Monograph Book Status
                </h2>
                <p></p>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <Link href={"/elibrary_ui/admin/monograph-borrow-status"}>
                <h2 className="text-lg font-semibold mb-2">
                  Monograph Borrow Status
                </h2>
                <p></p>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <Link href={"/elibrary_ui/admin/monograph-location"}>
                <h2 className="text-lg font-semibold mb-2">
                  Monograph Location
                </h2>
                <p></p>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <Link href={"/elibrary_ui/admin/monograph-cataloging"}>
                <h2 className="text-lg font-semibold mb-2">
                  Monograph Cataloging
                </h2>
                <p></p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
