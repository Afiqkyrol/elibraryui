"use client";

import {
  fetchMonographDetails,
  fetchMonographImage,
} from "@/api/librarian/getApi";
import LibrarianLeftSideBar from "@/app/component/LibrarianLeftSideBar";
import CatalogDetailsListTable from "@/app/librarian/component/CatalogDetailsListTable";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";

export default function showMarcTagDetailsPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [catalogDetails, setCatalogDetails] = useState([]);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    async function getCatalogDetails() {
      setCatalogDetails(await fetchMonographDetails(params.bookId));
      setImageName(await fetchMonographImage(params.bookId));
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
          <p className="items-start w-1/2 text-center">Details</p>
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
            <CatalogDetailsListTable data={catalogDetails} image={imageName} />
          </center>
        </div>
      </div>
    </div>
  );
}
