import axiosInstance from "@/util/axiosInstance";

export async function deleteDamagedBook(damaged_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/librarian/damaged-list/${damaged_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
