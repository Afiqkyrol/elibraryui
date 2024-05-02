import axiosInstance from "@/util/axiosInstance";

export async function updateBorrowReservation(history_id, extend_date) {
  const formData = new FormData();
  formData.append("extend_date", extend_date);

  const token = localStorage.getItem("auth-token");

  const response = await axiosInstance.put(
    `/patron/book/reserve/update/${history_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
}
