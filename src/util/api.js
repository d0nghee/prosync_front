import axiosInstance from "./axiosInstances";

const getApi = async (url, data) => {
  try {
    const res = await axiosInstance.get(url, data);
    return res;
  } catch (error) {
    console.error(error);
    console.error("getApi 지나감");
    throw error;
  }
};

const postApi = async (url, data) => {
  try {
    const res = await axiosInstance.post(url, data);
    return res;
  } catch (error) {
    console.error(error, "error");
    console.error("postApi 지나감");
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
    console.error("deleteApi 지나감");
    throw error;
  }
};

// 파일
const postFileApi = async (files) => {
  console.log("파일123123",files)
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
    console.log("반복",i)
  }
  console.log("파일",formData)

  try {
    const response = await axiosInstance.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return await response.data.data;
  } catch (error) {
    console.error(error);
    console.error("postFileApi 지나감");
    throw error;
  }
};

const getFileApi = async (tableKey, tableName) => {
  try {
    const response = await getApi("/files", { params: { tableKey, tableName } });

    if (response.status === 200) {
      return await response.data.data;
    }
  } catch (error) {
    console.error(error);
    console.error("getFileApi 지나감");
    throw error;
  }
  
};

const deleteFileApi = async (fileInfoId) => {
  try {
    return await deleteApi(`/files/${fileInfoId}`);
  } catch (error) {
    console.error(error);
    console.error("deleteFileApi 지나감");
    throw error;
  }
};

// 업무 상태
const postTaskStatusApi = async ({ taskStatus, color, seq }, projectId) => {
  const postData = {
    taskStatus,
    color,
    seq,
  };

  try {
    const response = await postApi(
      `/projects/${projectId}/task-status`,
      postData
    );
  
    if (response.status === 201) {
      return await response.data.data.taskStatusId;
    }
  } catch (error) {
    console.error(error);
    console.error("postTaskStatusApi 지나감");
    throw error;
  }

  
};

const getTaskStatusApi = async (projectId) => {

  try {
    const response = await getApi(`/projects/${projectId}/task-status`);

    if (response.status === 200) {
      return await response.data.data;
    }
  } catch (error) {
    console.error(error);
    console.error("getTaskStatusApi 지나감");
    throw error;
  }
  
};

const deleteTaskStatusApi = async (taskStatusId) => {
  try {
    return await deleteApi(`/task-status/${taskStatusId}`);
  } catch (error) {
    console.error(error);
    console.error("deleteTaskStatusApi 지나감");
    throw error;
  }
};

const patchTaskStatusApi = async (taskStatusId, { color, seq, taskStatus }) => {
  const patchData = { color, seq, taskStatus };
  try {
    const response = await patchApi(`/task-status/${taskStatusId}`, patchData);

    if (response.status === 200) {
      return await response.data.data;
    }
  } catch (error) {
    console.error(error);
    console.error("patchTaskStatusApi 지나감");
    throw error;
  }
  
};

const patchTaskStatusSeqApi = async (projectId, seqList) => {
  try {
    const response = await patchApi(
      `/projects/${projectId}/task-status/sequence`,
      seqList
    );
  
    if (response.status === 200) {
      return await response;
    }
  } catch (error) {
    console.error(error);
    console.error("patchTaskStatusSeqApi 지나감");
    throw error;
  }
  
};

// 프로젝트 회원
const getProjectMembersApi = async (projectId, params) => {
  try {
    console.log("getProjectMembersApi 시작");
    const response = await getApi(`/projects/${projectId}/members`, { params });
    console.log("getApi 호출 후")
    if (response.status === 200) {
      return await response.data.data;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("getProjectMembersApi 지나감");
    throw error;
  }
  
};

// 업무 담당자
const getTaskMembersApi = async (taskId) => {
  try {
    const response = await getApi(`/tasks/${taskId}/members`);
    if (response.status === 200) {
      return await response.data.data;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("getTaskMembersApi 지나감");
    throw error;
  }
  
};

const postTaskMemberApi = async (taskId, projectMemberIds) => {
  try {
    const response = await postApi(`/tasks/${taskId}/members`, projectMemberIds);
    if (response.status === 201) {
      return await response.data.data;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("postTaskMemberApi 지나감");
    throw error;
  }
  
};

const deleteTaskMemberApi = async (taskId, projectMemberIds) => {
  try {
    const response = await deleteApi(`/tasks/${taskId}/members`, {
      data: projectMemberIds,
    });
    return response;
  } catch (error) {
    console.error(error);
    console.error("deleteTaskMemberApi 지나감");
    throw error;
  }
  
};

// 업무
const postTaskApi = async (projectId, taskStatusId, body) => {
  try {
    const response = await postApi(
      `/projects/${projectId}/tasks/task-status/${taskStatusId}`,
      body
    );
    if (response.status === 201) {
      return await response.data.data.taskId;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("postTaskApi 지나감");
    throw error;
  }
  
};

const patchTaskApi = async (taskId, body) => {
  try {
    const response = await patchApi(`/tasks/${taskId}`, body);
    if (response.status === 200) {
      return await response.data.data.taskId;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("patchTaskApi 지나감");
    throw error;
  }
  
};

const getTaskApi = async (taskId, params) => {
  try {
    const response = await getApi(`/tasks/${taskId}`, params);

    if (response.status === 200) {
      return await response.data;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("getTaskApi 지나감");
    throw error;
  }
  
};

const deleteTaskApi = async (taskId) => {
  try {
    return await deleteApi(`/tasks/${taskId}`);
  } catch (error) {
    console.error(error);
    console.error("deleteTaskApi 지나감");
    throw error;
  }
};

const getTasksApi = async (projectId, params) => {
  try {
    const response = await getApi(`/projects/${projectId}/tasks`, { params });
    return await response.data;
  } catch (error) {
    console.error(error);
    console.error("getTasksApi 지나감");
    throw error;
  }
  
};

// 댓글
const getCommentsApi = async (taskId, params) => {
  try {
    const response = await getApi(`/tasks/${taskId}/comments`, { params });
    if (response.status === 200) {
      return await response.data;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("getCommentsApi 지나감");
    throw error;
  }
  
};

const postCommentApi = async (taskId, body) => {
  try {
    const response = await postApi(`/tasks/${taskId}/comments`, body);
    if (response.status === 201) {
      return await response.data.commentId;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("postCommentApi 지나감");
    throw error;
  }
  
};

const patchCommentApi = async (taskId, commentId, body) => {
  try {
    const response = await patchApi(
      `/tasks/${taskId}/comments/${commentId}`,
      body
    );
    if (response.status === 200) {
      return await response.data;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("patchCommentApi 지나감");
    throw error;
  }
  
};

const deleteCommentApi = async (taskId, commentId) => {
  try {
    const response = await deleteApi(`/tasks/${taskId}/comments/${commentId}`);
    if (response.status === 204) {
      return await response.data;
    }
    return response;
  } catch (error) {
    console.error(error);
    console.error("deleteCommentApi 지나감");
    throw error;
  }
  
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
