"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import { fetchMonoSubject } from "@/api/admin/getApi";
import { updateMonoSubject, updateMonoType } from "@/api/admin/putApi";
import { deleteSubject } from "@/api/admin/deleteApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowSubjectUpdatePage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [monoSubject, setMonoSubject] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectActive, setSubjectActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function getMonoSubject() {
      setMonoSubject(await fetchMonoSubject(params.subjectId));
    }

    getMonoSubject();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function initValue() {
      setSubjectName(monoSubject.subject_subject);
      setSubjectDescription(monoSubject.subject_description);
      setSubjectActive(monoSubject.subject_active);
    }

    initValue();
  }, [monoSubject]);

  async function deleteHandler() {
    try {
      await deleteSubject(params.subjectId);
      localStorage.setItem("toast-message", "Delete successful");
      router.push("/admin/monograph-subject");
    } catch (error) {
      toast.error("Error");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await updateMonoSubject(
        params.subjectId,
        subjectName,
        subjectDescription,
        subjectActive
      );
      localStorage.setItem("toast-message", "Update Successful");
      router.push("/admin/monograph-subject");
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
          <p className="items-start w-1/2 text-center">Add Monograph Type</p>
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
                  Subject Name
                </label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => {
                    setSubjectName(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Subject Description
                </label>
                <input
                  type="text"
                  value={subjectDescription}
                  onChange={(e) => {
                    setSubjectDescription(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Subject Active
                </label>
                <select onChange={(e) => setSubjectActive(e.target.value)}>
                  <option value={0} selected={subjectActive == "0"}>
                    0
                  </option>
                  <option value={1} selected={subjectActive == "1"}>
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
