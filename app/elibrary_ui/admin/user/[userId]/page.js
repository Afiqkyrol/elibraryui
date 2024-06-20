"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/elibrary_ui/loading";
import AdminLeftSideBar from "../../component/AdminLeftSideBar";
import { fetchUser } from "@/api/admin/getApi";
import { updateUser } from "@/api/admin/putApi";
import { deleteUser } from "@/api/admin/deleteApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ShowEditUserPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [role_id, setRole_id] = useState(0);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [state, setState] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      setUser(await fetchUser(params.userId));
    }

    getUser();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    function initValue() {
      setUsername(user.username);
      setFullname(user.fullName);
      setAddress1(user.address1);
      setAddress2(user.address2);
      setRole_id(user.role_id);
      setEmail(user.email);
      setPhoneNo(user.phoneNo);
      setState(user.state);
      setRole(user.role);
    }

    initValue();
  }, [user]);

  function logoutHandler() {
    setIsLoading(true);
    localStorage.clear();
    window.location.href = "/elibrary_ui/login";
  }

  function onChangeRole(e) {
    setRole(e.target.value);
    if (e.target.value === "ADMIN") {
      setRole_id(1);
    } else if (e.target.value === "LIBRARIAN") {
      setRole_id(2);
    } else if (e.target.value === "PATRON") {
      setRole_id(3);
    }
  }

  async function deleteHandler() {
    try {
      await deleteUser(params.userId);
      localStorage.setItem("toast-message", "Delete successful");
      router.push("/elibrary_ui/admin/user");
    } catch (error) {
      toast.error("Error");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await updateUser(
        params.userId,
        username,
        fullName,
        address1,
        address2,
        state,
        email,
        phoneNo,
        role,
        role_id
      );
      localStorage.setItem("toast-message", "Update Successful");
      router.push("/elibrary_ui/admin/user");
    } catch (error) {
      toast.error("Error");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex">
      <AdminLeftSideBar />
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <p className="items-start w-1/2 text-left">
            {localStorage.getItem("fullname")}
          </p>
          <p className="items-start w-1/2 text-center">Edit User</p>
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

            <button
              onClick={deleteHandler}
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <form
              onSubmit={submitHandler}
              className="max-w-md mx-auto mt-4 p-4 bg-gray-100 shadow-md rounded-md"
            >
              <label className="block mb-2">IC</label>
              <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
              />

              <label className="block mb-2">Full Name</label>
              <input
                name="fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
              />

              <label className="block mb-2">Address 1</label>
              <input
                name="address1"
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
              />

              <label className="block mb-2">Address 2</label>
              <input
                name="address2"
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
              />

              <label className="block mb-2">State</label>
              <select
                name="state"
                onChange={(e) => setState(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
              >
                <option>Select...</option>
                <option value="Selangor">Selangor</option>
                <option value="Perak">Perak</option>
              </select>

              <label className="block mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
              />

              <label className="block mb-2">Phone</label>
              <input
                name="phoneNo"
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
              />

              <label className="block mb-2">Role</label>
              <select
                onChange={onChangeRole}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
              >
                <option value={"ADMIN"} selected={role_id == "1"}>
                  Admin
                </option>
                <option value={"LIBRARIAN"} selected={role_id == "2"}>
                  Librarian
                </option>
                <option value={"PATRON"} selected={role_id == "3"}>
                  Patron
                </option>
              </select>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
}
