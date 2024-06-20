"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/elibrary_ui/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import {
  fetchMonoLocation,
  fetchMonoStatus,
  fetchMonoSubject,
} from "@/api/admin/getApi";
import { updateMonoLocation, updateMonoStatus } from "@/api/admin/putApi";
import { deleteLocation } from "@/api/admin/deleteApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowSubjectUpdatePage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [monoLocation, setMonoLocation] = useState([]);
  const [location, setLocation] = useState("");
  const [wilayah, setWilayah] = useState("");
  const [code, setCode] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getMonoLocation() {
      setMonoLocation(await fetchMonoLocation(params.locId));
    }

    getMonoLocation();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function initValue() {
      setLocation(monoLocation.loc_location);
      setWilayah(monoLocation.loc_wilayah);
      setCode(monoLocation.loc_location_code);
      setTelephone(monoLocation.loc_telephone);
      setAddress(monoLocation.loc_address);
    }

    initValue();
  }, [monoLocation]);

  async function deleteHandler() {
    try {
      await deleteLocation(params.locId);
      localStorage.setItem("toast-message", "Delete successful");
      router.push("/elibrary_ui/admin/monograph-location");
    } catch (error) {
      toast.error("fail");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await updateMonoLocation(
        params.locId,
        location,
        wilayah,
        code,
        telephone,
        address
      );
      localStorage.setItem("toast-message", "Update Successful");
      router.push("/elibrary_ui/admin/monograph-location");
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
          <p className="items-start w-1/2 text-center">
            Update Monograph Location
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
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Wilayah
                </label>
                <input
                  type="text"
                  value={wilayah}
                  onChange={(e) => {
                    setWilayah(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Location Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Telephone
                </label>
                <input
                  type="text"
                  value={telephone}
                  onChange={(e) => {
                    setTelephone(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
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
