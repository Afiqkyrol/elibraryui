"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import { fetchMonoBorrowStatus, fetchMonoCataloging } from "@/api/admin/getApi";
import { updateMonoCataloging } from "@/api/admin/putApi";
import { deleteCataloging } from "@/api/admin/deleteApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowSubjectUpdatePage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [monoCataloging, setMonoCataloging] = useState([]);
  const [tag, setTag] = useState("");
  const [ind1, setInd1] = useState("");
  const [ind2, setInd2] = useState("");
  const [dataTag, setDataTag] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getMonoCataloging() {
      setMonoCataloging(await fetchMonoCataloging(params.catId));
    }

    getMonoCataloging();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function initValue() {
      setTag(monoCataloging.cataloging_tag);
      setInd1(monoCataloging.cataloging_Ind1);
      setInd2(monoCataloging.cataloging_Ind2);
      setDataTag(monoCataloging.cataloging_data);
    }

    initValue();
  }, [monoCataloging]);

  async function deleteHandler() {
    try {
      await deleteCataloging(params.catId);
      localStorage.setItem("toast-message", "Delete successful");
      router.push("/admin/monograph-cataloging");
    } catch (error) {
      toast.error("Error");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await updateMonoCataloging(params.catId, tag, ind1, ind2, dataTag);
      localStorage.setItem("toast-message", "Update Successful");
      router.push("/admin/monograph-cataloging");
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
          <p className="items-start w-1/2 text-center">
            Update Monograph Cataloging
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
                  Tag
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ind 1
                </label>
                <input
                  type="text"
                  value={ind1}
                  onChange={(e) => {
                    setInd1(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ind 2
                </label>
                <input
                  type="text"
                  value={ind2}
                  onChange={(e) => {
                    setInd2(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Data
                </label>
                <input
                  type="text"
                  value={dataTag}
                  onChange={(e) => {
                    setDataTag(e.target.value);
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
