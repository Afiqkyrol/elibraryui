"use client";

import { fetchUserById } from "@/api/librarian/getApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import { useEffect, useState } from "react";

export default function UserDetails({ params }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function getUserDetails() {
      setUser(await fetchUserById(params.username));
    }

    getUserDetails();
  }, []);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }
  console.log(user);
  return (
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">User Details</p>
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
            <div className="flex justify-between max-w-4xl mx-auto bg-white shadow-md rounded px-8 py-6">
              <div className="w-1/2 pr-4">
                <h2 className="text-xl font-semibold mb-4">User Details</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username:
                  </label>
                  <p className="text-gray-700">{user.username}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Full name:
                  </label>
                  <p className="text-gray-700">{user.fullName}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <p className="text-gray-700">{user.email}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone:
                  </label>
                  <p className="text-gray-700">{user.phoneNo}</p>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address:
                  </label>
                  <p className="text-gray-700">{user.address1}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address 2:
                  </label>
                  <p className="text-gray-700">{user.address2}</p>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
