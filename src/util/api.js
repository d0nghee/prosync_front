import axiosInstance from './axiosInstancs';



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
    console.error(error, 'error');
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
  formData.append('files', data);
  try {
    await axiosInstance.post({
      url: '/files',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  } catch (error) {
    return error;
  }
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
    alert('등록 완료되었습니다.');
    return await response.data.data.taskStatusId;
  }
};

const getTaskStatusApi = async (projectId) => {
  const response = await getApi(`/projects/${projectId}/task-status`);

  if (response.status === 200) {
    console.log('업무 상태 조회');
    return await response.data.data;
  }
};

const deleteTaskStatusApi = async (taskStatusId) => {
  console.log('업무 상태 삭제');
  return await deleteApi(`/task-status/${taskStatusId}`);
};

const patchTaskStatusApi = async (taskStatusId, { color, seq, taskStatus }) => {
  const patchData = { color, seq, taskStatus };
  const response = await patchApi(`/task-status/${taskStatusId}`, patchData);

  if (response.status === 200) {
    console.log('업무 상태 수정');
    return await response.data.data;
  }
};

// 프로젝트 회원
const getProjectMembersApi = async (projectId) => {
  const response = await getApi(`/projects/${projectId}/members`);

  if (response.status === 200) {
    return await response.data.data;
  }
};

// 업무 담당자
const getTaskMembersApi = async (taskId) => {
  const response = await getApi(`/tasks/${taskId}/members`);
  if (response.status === 200) {
    return await response.data.data;
  }
};

const postTaskMember = async (taskId, projectMemberIds) => {
  const response = await postApi(`/tasks/${taskId}/members`, projectMemberIds);
  if (response.status === 201) {
    return await response.data.data;
  }
};

const deleteTaskMember = async (taskId, projectMemberIds) => {
  const response = await deleteApi(
    `/tasks/${taskId}/members`,
    projectMemberIds
  );
  if (response.status === 204) {
    console.log('회원 삭제 성공');
  }
};

export { postApi, getApi, patchApi, deleteApi };
export {
  postTaskStatusApi,
  getTaskStatusApi,
  deleteTaskStatusApi,
  patchTaskStatusApi,
};
export { getProjectMembersApi };
export { getTaskMembersApi, postTaskMember, deleteTaskMember };
