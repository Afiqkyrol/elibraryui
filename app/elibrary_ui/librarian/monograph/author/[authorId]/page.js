"use client";

import { fetchAuthor, fetchPublisherList } from "@/api/librarian/getApi";
import { saveAuthor } from "@/api/librarian/postApi";
import { updateAuthor } from "@/api/librarian/putApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowAuthorFormPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState({});
  const [publisherList, setPublisherList] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [publisher, setPublisher] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getPublisherList() {
      setPublisherList(await fetchPublisherList());
      setAuthor(await fetchAuthor(params.authorId));
    }

    getPublisherList();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function initValue() {
      setAuthorName(author.author_name);
      setTelephone(author.author_telephone);
      setEmail(author.author_email);
      setPublisher(author.publisher_id);
    }

    initValue();
  }, [author]);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.close();
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      await updateAuthor(
        params.authorId,
        authorName,
        email,
        telephone,
        publisher
      );
      localStorage.setItem("toast-message", "Update Successful");
      router.push("/elibrary_ui/librarian/monograph/author");
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
          <p className="items-start w-1/2 text-center">Update Author</p>
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
            <form onSubmit={submitHandler} className="max-w-sm mx-auto mt-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author_name"
                  value={authorName}
                  onChange={(e) => {
                    setAuthorName(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Author Telephone
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
                  Author Email
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Publisher
                </label>
                <select
                  name="publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select...</option>
                  {publisherList.map((publisher, index) => (
                    <option key={index} value={publisher.publisher_id}>
                      {publisher.publisher_name}
                    </option>
                  ))}
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
