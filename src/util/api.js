import axiosInstance from "./axiosInstancs";

const getApi = async (url, data) => {
  try {
    const res = await axiosInstance.get(url, data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postApi = async (url, data) => {
  try {
    const res = await axiosInstance.post(url, data);
    return res;
  } catch (error) {
    console.error(error, "error");
    throw error;
  }
};

const patchApi = async (url, data) => {
  try {
    const res = await axiosInstance.patch(url, data);
    return res;
  } catch (error) {
    console.error(error);
    console.error("patchApi 지나감");
    throw error;
  }
};

const deleteApi = async (url, data) => {
  try {
    const res = await axiosInstance.delete(url, data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 파일
const postFileApi = async (files) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  try {
    const response = await axiosInstance.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return await response.data.data;
  } catch (error) {
    return error;
  }
};

const getFileApi = async (tableKey, tableName) => {
  const response = await getApi("/files", { params: { tableKey, tableName } });

  if (response.status === 200) {
    return await response.data.data;
  }
  return response;
};

const deleteFileApi = async (fileInfoId) => {
  return await deleteApi(`/files/${fileInfoId}`);
};

// 업무 상태
const postTaskStatusApi = async ({ taskStatus, color, seq }, projectId) => {
  const postData = {
    taskStatus,
    color,
    seq,
  };

  const response = await postApi(
    `/projects/${projectId}/task-status`,
    postData
  );

  if (response.status === 201) {
    return await response.data.data.taskStatusId;
  }
};

const getTaskStatusApi = async (projectId) => {
  const response = await getApi(`/projects/${projectId}/task-status`);

  if (response.status === 200) {
    return await response.data.data;
  }
};

const deleteTaskStatusApi = async (taskStatusId) => {
  return await deleteApi(`/task-status/${taskStatusId}`);
};

const patchTaskStatusApi = async (taskStatusId, { color, seq, taskStatus }) => {
  const patchData = { color, seq, taskStatus };
  const response = await patchApi(`/task-status/${taskStatusId}`, patchData);

  if (response.status === 200) {
    return await response.data.data;
  }
};

const patchTaskStatusSeqApi = async (projectId, seqList) => {
  const response = await patchApi(
    `/projects/${projectId}/task-status/sequence`,
    seqList
  );

  if (response.status === 200) {
    return await response;
  }
};

// 프로젝트 회원
const getProjectMembersApi = async (projectId, params) => {
  const response = await getApi(`/projects/${projectId}/members`, { params });
  if (response.status === 200) {
    return await response.data.data;
  }
  return response;
};

// 업무 담당자
const getTaskMembersApi = async (taskId) => {
  const response = await getApi(`/tasks/${taskId}/members`);
  if (response.status === 200) {
    return await response.data.data;
  }
  return response;
};

const postTaskMemberApi = async (taskId, projectMemberIds) => {
  const response = await postApi(`/tasks/${taskId}/members`, projectMemberIds);
  if (response.status === 201) {
    return await response.data.data;
  }
  return response;
};

const deleteTaskMemberApi = async (taskId, projectMemberIds) => {
  const response = await deleteApi(`/tasks/${taskId}/members`, {
    data: projectMemberIds,
  });
  return response;
};

// 업무
const postTaskApi = async (projectId, taskStatusId, body) => {
  const response = await postApi(
    `/projects/${projectId}/tasks/task-status/${taskStatusId}`,
    body
  );
  if (response.status === 201) {
    return await response.data.data.taskId;
  }
  return response;
};

const patchTaskApi = async (taskId, body) => {
  const response = await patchApi(`/tasks/${taskId}`, body);
  if (response.status === 200) {
    return await response.data.data.taskId;
  }
  return response;
};

const getTaskApi = async (taskId, params) => {
  const response = await getApi(`/tasks/${taskId}`, params);

  if (response.status === 200) {
    return await response.data;
  }
  return response;
};

const deleteTaskApi = async (taskId) => {
  return await deleteApi(`/tasks/${taskId}`);
};

const getTasksApi = async (projectId, params) => {
  const response = await getApi(`/projects/${projectId}/tasks`, { params });
  return await response.data;
};

// 댓글
const getCommentsApi = async (taskId, params) => {
  const response = await getApi(`/tasks/${taskId}/comments`, { params });
  if (response.status === 200) {
    return await response.data;
  }
  return response;
};

const postCommentApi = async (taskId, body) => {
  const response = await postApi(`/tasks/${taskId}/comments`, body);
  if (response.status === 201) {
    return await response.data.commentId;
  }
  return response;
};

const patchCommentApi = async (taskId, commentId, body) => {
  const response = await patchApi(
    `/tasks/${taskId}/comments/${commentId}`,
    body
  );
  if (response.status === 200) {
    return await response.data;
  }
  return response;
};

const deleteCommentApi = async (taskId, commentId) => {
  const response = await deleteApi(`/tasks/${taskId}/comments/${commentId}`);
  if (response.status === 204) {
    return await response.data;
  }
  return response;
};

export { postApi, getApi, patchApi, deleteApi };
export {
  postTaskStatusApi,
  getTaskStatusApi,
  deleteTaskStatusApi,
  patchTaskStatusApi,
  patchTaskStatusSeqApi,
};
export { getProjectMembersApi };
export { getTaskMembersApi, postTaskMemberApi, deleteTaskMemberApi };
export { postTaskApi, patchTaskApi, getTaskApi, deleteTaskApi, getTasksApi };
export { getCommentsApi, postCommentApi, patchCommentApi, deleteCommentApi };
export { postFileApi, getFileApi, deleteFileApi };
