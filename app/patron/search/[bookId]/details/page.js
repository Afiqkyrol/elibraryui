"use client";

import {
  fetchMonographDetails,
  fetchMonographImage,
} from "@/api/patron/getApi";
import PatronLeftSideBar from "@/app/component/PatronLeftSideBar";
import Loading from "@/app/loading";
import CatalogDetailsListTable from "@/app/patron/component/CatalogDetailsListTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function showMarcTagDetailsPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [catalogDetails, setCatalogDetails] = useState([]);
  const [imageName, setImageName] = useState("");
  const router = useRouter();

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
      <PatronLeftSideBar />
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
          <button
            onClick={() => {
              router.back();
            }}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Back
          </button>
          <center>
            <br></br>

            <CatalogDetailsListTable data={catalogDetails} image={imageName} />
          </center>
        </div>
      </div>
    </div>
  );
}
