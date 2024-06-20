"use client";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ type, message }) => {
  useEffect(() => {
    if (type && message) {
      switch (type) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "warning":
          toast.warn(message);
          break;
        default:
          toast(message);
          break;
      }
    }
  }, [type, message]);

  return <ToastContainer />;
};

export default Notification;
