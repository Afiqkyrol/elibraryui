"use client";

import React from "react";

export default function FileUploadComponent({ onFileSelect }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
