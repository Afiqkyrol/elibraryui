import axiosInstance from "@/util/axiosInstance";

export async function deleteDamagedBook(damaged_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/librarian/damaged-list/${damaged_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deleteAuthor(author_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/librarian/monograph/author/${author_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function deletePublisher(publisher_id) {
  const token = localStorage.getItem("auth-token");
  await axiosInstance.delete(`/librarian/monograph/publisher/${publisher_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
