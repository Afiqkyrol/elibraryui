"use client";

import LibrarianLeftSideBar from "@/app/component/LibrarianLeftSideBar";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import {
  fetchCataloging,
  fetchCatalogingOptions,
  fetchMonoStatusList,
  fetchMonographMarcTag,
  fetchRegMonographDetails,
} from "@/api/librarian/getApi";
import UpdateFormPage from "@/app/librarian/component/CatalogUpdate";

export default function showAddMonographPages({ params }) {
  const [catalog, setCatalog] = useState([]);
  const [catalogOptions, setCatalogOptions] = useState("");
  const [monograph, setMonograph] = useState([]);
  const [bookStatusOption, setBookStatusOption] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCatalogDetails() {
      setCatalog(await fetchMonographMarcTag(params.bookId));
      setMonograph(await fetchRegMonographDetails(params.bookId));
      setCatalogOptions(await fetchCatalogingOptions());
      setBookStatusOption(await fetchMonoStatusList());
    }

    getCatalogDetails();
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
    <div className="flex ">
      <LibrarianLeftSideBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Update Monograph</p>
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
            <img
              style={{ height: "140px", width: "100px" }}
              src={`http://localhost:8080/resources/image/${monograph.image_name}`}
            />
            <UpdateFormPage
              data={catalog}
              options={catalogOptions}
              statusOption={bookStatusOption}
              reg_id={params.bookId}
            />
          </center>
        </div>
      </div>
    </div>
  );
}
