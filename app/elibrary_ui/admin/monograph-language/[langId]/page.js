"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/elibrary_ui/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import { fetchMonoLanguage } from "@/api/admin/getApi";
import { updateMonoLanguage } from "@/api/admin/putApi";
import { deleteLanguage } from "@/api/admin/deleteApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowLanguageUpdatePage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [monoLang, setMonoLang] = useState([]);
  const [langName, setLangName] = useState("");
  const [langDescription, setLangDescription] = useState("");
  const [langActive, setLangActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function getMonoLanguage() {
      setMonoLang(await fetchMonoLanguage(params.langId));
    }

    getMonoLanguage();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function initValue() {
      setLangName(monoLang.lang_type);
      setLangDescription(monoLang.lang_description);
      setLangActive(monoLang.lang_active);
    }

    initValue();
  }, [monoLang]);

  async function deleteHandler() {
    try {
      await deleteLanguage(params.langId);
      localStorage.setItem("toast-message", "Delete successful");
      router.push("/elibrary_ui/admin/monograph-language");
    } catch (error) {
      toast.error("Error");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await updateMonoLanguage(
        params.langId,
        langName,
        langDescription,
        langActive
      );
      localStorage.setItem("toast-message", "Update Successful");
      router.push("/elibrary_ui/admin/monograph-language");
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
          <p className="items-start w-1/2 text-center">
            Add Monograph Language
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
                  Language Name
                </label>
                <input
                  type="text"
                  value={langName}
                  onChange={(e) => {
                    setLangName(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Language Description
                </label>
                <input
                  type="text"
                  value={langDescription}
                  onChange={(e) => {
                    setLangDescription(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Language Active
                </label>
                <select onChange={(e) => setLangActive(e.target.value)}>
                  <option value={0} selected={langActive == "0"}>
                    Inactive
                  </option>
                  <option value={1} selected={langActive == "1"}>
                    Active
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
