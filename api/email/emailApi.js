import axiosInstance from "@/util/axiosInstance";

export async function sendConfirmReserveEmail(reserve_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/reservation/confirm/send/${reserve_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export async function sendStatusReserveEmail(reserve_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/reservation/status/send/${reserve_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export async function sendConfirmExtendBorrowEmail(borrow_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/reservation/confirm/extend/send/${borrow_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export async function sendStatusExtendBorrowEmail(borrow_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(
    `/reservation/status/extend/send/${borrow_id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export async function sendStatusUserEmail(user_id) {
  const token = localStorage.getItem("auth-token");
  const response = await axiosInstance.get(`/user/status/send/${user_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
