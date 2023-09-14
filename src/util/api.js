import axiosInstance from "./axiosInstancs";



const getApi = async (url, data) => {
  try {
    const res = await axiosInstance.get(url, data);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const postApi = async (url, data) => {
  try {
    const res = await axiosInstance.post(url, data);
    return res;
  } catch (error) {
    console.error(error, "error");
    return error;
  }
};

const patchApi = async (url, data) => {
  try {
    const res = await axiosInstance.patch(url, data);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const deleteApi = async (url) => {
  try {
    const res = await axiosInstance.delete(url);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

//TODO : 확인
const postFileApi = async (data) => {
  const formData = new FormData();
  formData.append("files", data);
  try {
    await axiosInstance.post({
      url: "/files",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  } catch (error) {
    return error;
  }
};

export { postApi, getApi, patchApi, deleteApi };
