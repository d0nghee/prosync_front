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
    console.log(res, "test...");
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

export { postApi, getApi, patchApi, deleteApi };
