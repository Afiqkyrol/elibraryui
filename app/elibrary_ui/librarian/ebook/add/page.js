"use client";

import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useEffect, useState } from "react";
import NewEbookForm from "../../component/NewEbookForm";
import {
  fetchCataloging,
  fetchCatalogingOptions,
  fetchMonoStatusList,
} from "@/api/librarian/getApi";

export default function ShowAddEbookPages() {
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
    window.close();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <LibrarianLeftSideBar />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">New Ebook</p>
          <button
            className="text-white hover:text-gray-400 w-1/2 text-right"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
        <div className="overflow-y-auto">
          <center>
            <br></br>
            <NewEbookForm
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
