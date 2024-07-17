"use client";

import { deletePublisher } from "@/api/librarian/deleteApi";
import { fetchPublisher, fetchPublisherList } from "@/api/librarian/getApi";
import { saveAuthor, savePublisher } from "@/api/librarian/postApi";
import { updatePublisher } from "@/api/librarian/putApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowAuthorFormPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [publisherName, setPublisherName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [publisher, setPublisher] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getPublisher() {
      setPublisher(await fetchPublisher(params.publisher_id));
    }

    getPublisher();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function initValue() {
      setPublisherName(publisher.publisher_name);
      setAddress1(publisher.publisher_address1);
      setAddress2(publisher.publisher_address2);
      setAddress3(publisher.publisher_address3);
      setTelephone(publisher.publisher_telephone);
      setEmail(publisher.publisher_email);
    }

    initValue();
  }, [publisher]);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  async function deleteHandler() {
    try {
      await deletePublisher(params.publisher_id);
      localStorage.setItem("toast-message", "Delete successful");
      router.push("/elibrary_ui/librarian/monograph/publisher");
    } catch (error) {
      toast.error("fail");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      await updatePublisher(
        params.publisher_id,
        publisherName,
        address1,
        address2,
        address3,
        email,
        telephone
      );
      localStorage.setItem("toast-message", "Add Successful");
      router.push("/elibrary_ui/librarian/monograph/publisher");
    } catch (error) {
      toast.error("Error");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">New Publisher</p>
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
                  Publisher Name
                </label>
                <input
                  type="text"
                  name="author_name"
                  value={publisherName}
                  onChange={(e) => {
                    setPublisherName(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address 1
                </label>
                <input
                  type="text"
                  name="address1"
                  value={address1}
                  onChange={(e) => {
                    setAddress1(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address 2
                </label>
                <input
                  type="text"
                  name="address2"
                  value={address2}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address 3
                </label>
                <input
                  type="text"
                  name="address3"
                  value={address3}
                  onChange={(e) => {
                    setAddress3(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Publisher Telephone
                </label>
                <input
                  type="text"
                  name="author_telephone"
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
                  Publisher Email
                </label>
                <input
                  type="email"
                  name="author_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
}
