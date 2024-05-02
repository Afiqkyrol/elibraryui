"use client";

export default function Loading() {
  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="text-center">
        <svg
          className="animate-spin h-10 w-10 mx-auto text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0117.708 5.71L15.29 8.129A5.996 5.996 0 007.001 17.29V17h8a1 1 0 110 2H6a1 1 0 01-.707-1.707l2-2zM20 12c0-6.627-5.373-12-12-12v4c5.523 0 10 4.477 10 10h4z"
          ></path>
        </svg>
        <h1 className="text-3xl text-white mt-4">Loading...</h1>
      </div>
    </div>
  );
}
