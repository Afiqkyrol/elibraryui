"use client";

import {
  saveNewCatalog,
  saveRegMonograph,
  saveRegMonographWithoutImage,
} from "@/api/librarian/postApi";
import Loading from "@/app/elibrary_ui/loading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Input component
const InputField = ({
  label,
  value,
  onChange,
  onChangeIsbn,
  onChangeTitle,
  onChangeDesc,
  tag,
  options,
}) => {
  const handleSelectChange = (e) => {
    onChange(e.target.value);
  };
  if (tag === 5 && options && options.language && options.language.length > 0) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <select
          value={value}
          onChange={handleSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>select...</option>
          {options.language.map((option, index) => (
            <option key={index} value={option.lang_type}>
              {option.lang_type}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (
    tag === 13 &&
    options &&
    options.author &&
    options.author.length > 0
  ) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={value}
          onChange={(e) => {
            onChangeTitle(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    );
  } else if (
    tag === 14 &&
    options &&
    options.publisher &&
    options.publisher.length > 0
  ) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <select
          value={value}
          onChange={handleSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>select...</option>
          {options.publisher.map((option, index) => (
            <option key={index} value={option.publisher_name}>
              {option.publisher_name}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (tag === 21 && options && options.type && options.type.length > 0) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <select
          value={value}
          onChange={handleSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>select...</option>
          {options.type.map((option, index) => (
            <option key={index} value={option.type_type}>
              {option.type_type}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (
    tag === 22 &&
    options &&
    options.subject &&
    options.subject.length > 0
  ) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <select
          value={value}
          onChange={handleSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>select...</option>
          {options.subject.map((option, index) => (
            <option key={index} value={option.subject_subject}>
              {option.subject_subject}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (
    tag === 25 &&
    options &&
    options.location &&
    options.location.length > 0
  ) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <select
          value={value}
          onChange={handleSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>select...</option>
          {options.location.map((option, index) => (
            <option key={index} value={option.loc_location}>
              {option.loc_location}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (
    tag === 11 &&
    options &&
    options.author &&
    options.author.length > 0
  ) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <select
          value={value}
          onChange={handleSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>select...</option>
          {options.author.map((option, index) => (
            <option key={index} value={option.author_name}>
              {option.author_name}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (
    tag === 27 &&
    options &&
    options.author &&
    options.author.length > 0
  ) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={value}
          onChange={(e) => {
            onChangeDesc(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    );
  } else if (tag === 3) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={value}
          onChange={(e) => {
            onChangeIsbn(e.target.value);
            onChange(e.target.value);
          }}
          required
        />
      </div>
    );
  } else {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
};

// Form component
const DynamicForm = ({ inputData, inputOptions, statusOptions }) => {
  const [isLoading, setIsLoading] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [isbnNum, setIsbnNum] = useState("");
  const [description, setDescription] = useState("");
  const [bookStatus, setBookStatus] = useState(1);
  const [featured, setFeatured] = useState();
  const [publish, setPublish] = useState();
  const [ebook, setEbook] = useState();
  const router = useRouter();
  const [inputValues, setInputValues] = useState(
    Array(inputData.length).fill("")
  );
  const [ind1Values, setInd1Values] = useState(
    Array(inputData.length).fill("")
  );
  const [ind2Values, setInd2Values] = useState(
    Array(inputData.length).fill("")
  );

  // Function to update input values
  const handleInputChange = (index, newValue) => {
    setInputValues((prevValues) => {
      const newInputValues = [...prevValues];
      newInputValues[index] = newValue;
      return newInputValues;
    });
  };

  const handleInd1Change = (index, newValue) => {
    setInd1Values((prevValues) => {
      const newInd1Values = [...prevValues];
      newInd1Values[index] = newValue;
      return newInd1Values;
    });
  };

  // Function to update cataloging_Ind2 values
  const handleInd2Change = (index, newValue) => {
    setInd2Values((prevValues) => {
      const newInd2Values = [...prevValues];
      newInd2Values[index] = newValue;
      return newInd2Values;
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const submittedData = inputData.map((item, index) => ({
      cataloging_tag: item.cataloging_tag,
      value: inputValues[index],
      cataloging_Ind1: ind1Values[index] || item.cataloging_Ind1, // Include default value for cataloging_Ind1
      cataloging_Ind2: ind2Values[index] || item.cataloging_Ind2, // Include default value for cataloging_Ind2
    }));

    let response;

    try {
      if (file != null) {
        response = await saveRegMonograph(
          file,
          title,
          description,
          featured,
          publish,
          ebook,
          bookStatus
        );
        console.log(response);
      } else {
        response = await saveRegMonographWithoutImage(
          title,
          description,
          featured,
          publish,
          ebook,
          bookStatus
        );
      }

      if (response) {
        for (let i = 0; i < submittedData.length; i++) {
          if (
            submittedData[i].value == "select..." ||
            submittedData[i].value == null ||
            submittedData[i].value == ""
          ) {
            submittedData[i].value = "No Data";
          }
          if (
            submittedData[i].value != "select..." &&
            submittedData[i].value != null &&
            submittedData[i].value != ""
          ) {
            saveNewCatalog(
              submittedData[i].cataloging_tag,
              response.reg_id,
              submittedData[i].cataloging_Ind1,
              submittedData[i].cataloging_Ind2,
              submittedData[i].value
            );
          }
        }
      }

      localStorage.setItem("toast-message", "The monograph has been added");

      router.push("/elibrary_ui/librarian/monograph");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Error!");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "95%" }}>
      <ToastContainer />
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <img
        style={{ height: "80px", width: "200px" }}
        src={
          "https://barcode.tec-it.com/barcode.ashx?data=" +
          isbnNum +
          "&code=ISBN13&translate-esc=on"
        }
      />
      <table className="w-full">
        <thead>
          <tr>
            <th
              className="py-2 px-4"
              style={{ textAlign: "left", width: "10%" }}
            >
              Tag
            </th>
            <th
              className="py-2 px-4"
              style={{ textAlign: "left", width: "10%" }}
            >
              Ind1
            </th>
            <th
              className="py-2 px-4"
              style={{ textAlign: "left", width: "10%" }}
            >
              Ind2
            </th>
            <th
              className="py-2 px-4"
              style={{ textAlign: "left", width: "25%" }}
            >
              Description
            </th>
            <th className="py-2 px-4" style={{ textAlign: "left" }}>
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          {inputData.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4">0{item.cataloging_tag}</td>

              <td className="py-2 px-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={ind1Values[index] || item.cataloging_Ind1} // Set default value to inputData.cataloging_Ind1
                  onChange={(e) => handleInd1Change(index, e.target.value)}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={ind2Values[index] || item.cataloging_Ind2} // Set default value to inputData.cataloging_Ind2
                  onChange={(e) => handleInd2Change(index, e.target.value)}
                />
              </td>
              <td className="py-2 px-4">{item.cataloging_data}</td>
              <td className="py-2 px-4">
                <InputField
                  tag={item.cataloging_tag}
                  value={inputValues[index]}
                  options={inputOptions}
                  onChangeTitle={(e) => setTitle(e)}
                  onChangeDesc={(e) => setDescription(e)}
                  onChangeIsbn={(e) => setIsbnNum(e)}
                  onChange={(newValue) => handleInputChange(index, newValue)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Monograph Status
        </label>
        <select
          onChange={(e) => {
            setBookStatus(e.target.value);
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {statusOptions.map((option, index) => (
            <option key={index} value={option.sts_id}>
              {option.sts_status}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Featured:
        </span>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            className="form-radio text-blue-500"
            name="featured"
            value="yes"
            onChange={() => setFeatured("yes")}
            required
          />
          <span className="ml-2">Yes</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-red-500"
            name="featured"
            value="no"
            onChange={() => setFeatured("no")}
            required
          />
          <span className="ml-2">No</span>
        </label>
      </div>
      <div className="mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Publish:
        </span>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            className="form-radio text-blue-500"
            name="publish"
            value="yes"
            onChange={() => setPublish("yes")}
            required
          />
          <span className="ml-2">Yes</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-red-500"
            name="publish"
            value="no"
            onChange={() => setPublish("no")}
            required
          />
          <span className="ml-2">No</span>
        </label>
      </div>
      <div className="mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Ebook:
        </span>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            className="form-radio text-blue-500"
            name="ebook"
            value="yes"
            onChange={() => setEbook("yes")}
            required
          />
          <span className="ml-2">Yes</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-red-500"
            name="ebook"
            value="no"
            onChange={() => setEbook("no")}
            required
          />
          <span className="ml-2">No</span>
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

// Usage
const MyFormPage = ({ data, options, statusOption }) => {
  // Example array of objects
  const inputData = data;

  return (
    <DynamicForm
      inputData={inputData}
      inputOptions={options}
      statusOptions={statusOption}
    />
  );
};

export default MyFormPage;
