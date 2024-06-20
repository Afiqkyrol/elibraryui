"use client";

import { deleteDamagedBook } from "@/api/librarian/deleteApi";
import { fetchDamagedBookDetails } from "@/api/librarian/getApi";
import { updateDamagedBookDetails } from "@/api/librarian/putApi";
import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowDamagedBookDetailsPage({ params }) {
  const [damagedBook, setDamagedBook] = useState([]);
  const [damaged, setDamaged] = useState(true);
  const [damagedDetails, setDamagedDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getDamagedBookDetails() {
      setDamagedBook(await fetchDamagedBookDetails(params.damagedId));
    }

    getDamagedBookDetails();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (damagedBook.damaged_description) {
      setDamagedDetails(damagedBook.damaged_description);
    }
  }, [damagedBook]);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.location.href = "/elibrary_ui/login";
  }

  function damageHandler(e) {
    if (e.target.value === "true") {
      setDamaged(true);
    } else {
      setDamaged(false);
    }
    // console.log(damaged);
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      if (damaged) {
        await updateDamagedBookDetails(params.damagedId, damagedDetails);
      } else {
        await deleteDamagedBook(params.damagedId);
      }
      localStorage.setItem("toast-message", "The application has been updated");
      router.push("/elibrary_ui/librarian/damaged");
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
          <p className="items-start w-1/2 text-center">Damaged Details</p>
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
                <h2 className="text-xl font-semibold mb-4">Borrowed Details</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Book ID:
                  </label>
                  <p className="text-gray-700">{damagedBook.book_id}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Book Title:
                  </label>
                  <p className="text-gray-700">{damagedBook.book_title}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Borrower:
                  </label>
                  <p className="text-gray-700">
                    {damagedBook.last_person_name}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date Return:
                  </label>
                  <p className="text-gray-700">
                    {String(damagedBook.date_return).substring(0, 10)}
                  </p>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <span className="block text-gray-700 text-sm font-bold mb-2">
                      Damaged:
                    </span>
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        className="form-radio text-blue-500"
                        name="damage"
                        value={true}
                        onChange={damageHandler}
                        defaultChecked
                        required
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-red-500"
                        name="damage"
                        value={false}
                        onChange={damageHandler}
                        required
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Damaged Details {"(If Yes)"}:
                    </label>
                    <textarea
                      id="damage_details"
                      name="damage_details"
                      class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      rows="4"
                      value={damagedDetails}
                      onChange={(e) => setDamagedDetails(e.target.value)}
                      required={damaged}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
