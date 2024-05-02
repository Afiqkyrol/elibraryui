"use client";

import LibrarianLeftSideBar from "@/app/component/LibrarianLeftSideBar";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import MyFormPage from "../../component/CatalogForm";
import {
  fetchCataloging,
  fetchCatalogingOptions,
  fetchMonoStatusList,
} from "@/api/librarian/getApi";

export default function showAddMonographPages() {
  const [catalog, setCatalog] = useState([]);
  const [catalogOptions, setCatalogOptions] = useState([]);
  const [bookStatusOption, setBookStatusOption] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCatalogDetails() {
      setCatalog(await fetchCataloging());
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
          <p className="items-start w-1/2 text-center">New Monograph</p>
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
            <MyFormPage
              data={catalog}
              options={catalogOptions}
              statusOption={bookStatusOption}
            />
          </center>
        </div>
      </div>
    </div>
  );
}
