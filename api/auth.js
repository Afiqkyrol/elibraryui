import axiosInstance from "@/util/axiosInstance";

export async function authLogin(username, password) {
  try {
    const response = await axiosInstance.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function authReg(
  username,
  fullName,
  password,
  role_id,
  address1,
  address2,
  state,
  email,
  phoneNo,
  role
) {
  try {
    const response = await axiosInstance.post("/register", {
      username,
      fullName,
      password,
      role_id,
      address1,
      address2,
      state,
      email,
      phoneNo,
      role,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}
