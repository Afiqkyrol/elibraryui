"use client";

import axiosInstance from "@/util/axiosInstance";
import FileUploadComponent from "./FileUploadComponent";

export default function UploadPage() {
  const imageurl = "http://localhost:8080/resources/image/error%20coc.png";
  async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem("auth-token");

      const response = await axiosInstance.post(
        "/librarian/monograph/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        console.log("File uploaded successfully!");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <div>
      <h1>Upload Page</h1>
      <img src={imageurl} />
      <FileUploadComponent onFileSelect={handleFileUpload} />
    </div>
  );
}
