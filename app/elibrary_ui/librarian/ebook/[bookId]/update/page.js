"use client";

import LibrarianLeftSideBar from "@/app/elibrary_ui/component/LibrarianLeftSideBar";
import Loading from "@/app/elibrary_ui/loading";
import { useEffect, useState } from "react";
import {
  fetchCataloging,
  fetchCatalogingOptions,
  fetchLtMonoCat,
  fetchMonoStatusList,
  fetchMonographMarcTag,
  fetchRegMonographDetails,
} from "@/api/librarian/getApi";
import UpdateEbookForm from "@/app/elibrary_ui/librarian/component/UpdateEbookForm";
import { imagePath } from "@/util/config";

export default function ShowAddEbookPages({ params }) {
  const [catalog, setCatalog] = useState([]);
  const [catalogOptions, setCatalogOptions] = useState("");
  const [monograph, setMonograph] = useState([]);
  const [ltMonoCat, setLtMonoCat] = useState([]);
  const [bookStatusOption, setBookStatusOption] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ltMonoCatData, setLtMonoCatData] = useState([]);

  useEffect(() => {
    async function getCatalogDetails() {
      setCatalog(await fetchMonographMarcTag(params.bookId));
      setMonograph(await fetchRegMonographDetails(params.bookId));
      setCatalogOptions(await fetchCatalogingOptions());
      setBookStatusOption(await fetchMonoStatusList());
      setLtMonoCat(await fetchLtMonoCat());
    }

    getCatalogDetails();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setLtMonoCatData(ltMonoCat);
  }, [ltMonoCat]);

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
          <p className="items-start w-1/2 text-center">Update Ebook</p>
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
            <img
              style={{ height: "140px", width: "100px" }}
              src={imagePath + params.bookId}
            />
            <UpdateEbookForm
              data={catalog}
              options={catalogOptions}
              statusOption={bookStatusOption}
              ltMonoCat={ltMonoCatData}
              reg_id={params.bookId}
            />
          </center>
        </div>
      </div>
    </div>
  );
}
