import api from "./api";

interface UploadResponse {
  url: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { url: response.data.data.url };
};
