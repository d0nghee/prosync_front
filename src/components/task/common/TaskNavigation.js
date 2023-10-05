import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
import { styled } from "styled-components";
import NaviButton from "../../common/Button";
import { deleteTask } from "../../../redux/reducers/task/taskList-slice";
import { useState } from "react";
import { patchSequenceOfStatus } from "../../../redux/reducers/task/taskStatus-slice";
import { MdFilterAlt } from "react-icons/md";
import * as t from "../form/TaskForm.style";

export default function TaskNavigation({
  onCheck,
  checkedTasks,
  updateCheckbox,
  projectMember,
}) {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const pageInfo = useSelector((state) => state.taskList.pageInfo);

  const taskStatusList = useSelector((state) => state.taskStatus.list);

  const updateHandler = () => {
    if (checkedTasks.length > 1) {
      alert("수정은 한건만 선택이 가능합니다.");
    } else if (checkedTasks.length === 1) {
      const taskId = checkedTasks[0];
      updateCheckbox([]);
      navigate(`${taskId}/edit`);
    } else {
      alert("선택 대상이 없습니다.");
    }
  };

  const deleteHandler = () => {
    if (checkedTasks.length > 0) {
      const proceed = window.confirm(
        `${checkedTasks.length}건을 삭제하시겠습니까?`
      );
      if (proceed) {
        checkedTasks.forEach((id) => {
          dispatch(deleteTask(id, params.projectId, { page: pageInfo.page }));
        });
        updateCheckbox([]);
      }
    } else {
      alert("선택 대상이 없습니다.");
    }
  };

  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const [checkedStatusIds, setCheckedStatusIds] = useState();

  const checkTaskStatus = (taskStatusId) => {
    if (checkedStatusIds.current.includes(taskStatusId)) {
      let current = checkedStatusIds.current;
      current = current.filter((id) => id !== taskStatusId);
      setCheckedStatusIds({ original: checkedStatusIds.original, current });
    } else {
      setCheckedStatusIds({
        original: checkedStatusIds.original,
        current: [...checkedStatusIds.current, taskStatusId],
      });
    }
  };

  const saveStatusHandler = async () => {
    setShowStatusFilter(false);
    let requestIds = checkedStatusIds.current.filter(
      (id) => !checkedStatusIds.original.includes(id)
    );
    requestIds = [
      ...requestIds,
      ...checkedStatusIds.original.filter(
        (id) => !checkedStatusIds.current.includes(id)
      ),
    ];

    for (const id of requestIds) {
      await dispatch(patchSequenceOfStatus(id, null));
    }
    onCheck();
    setCheckedStatusIds({
      original: checkedStatusIds.current,
      current: checkedStatusIds.current,
    });
  };

  const resetHandler = () => {
    setShowStatusFilter(false);
    const originalStatus = checkedStatusIds.original;
    setCheckedStatusIds({ original: originalStatus, current: originalStatus });
  };

  if (!checkedStatusIds && taskStatusList.length !== 0) {
    const ids = taskStatusList
      .filter((one) => one.seq !== 0)
      .map((one) => one.taskStatusId);
    setCheckedStatusIds({ original: ids, current: ids });
  }

  return (
    <>
      <TaskNav>
        <TaskFilter>
          <div>FILTER</div>
          <NavItem to="?view=table" selected={view === "table"}>
            TABLE
          </NavItem>
          <NavItem to="?view=board" selected={view === "board"}>
            BOARD
          </NavItem>
          <NavItem to="?view=roadmap" selected={view === "roadmap"}>
            ROAD MAP
          </NavItem>
          <StatusCheckBox>
            <FilterIcon onClick={() => setShowStatusFilter((prv) => !prv)}>
              <MdFilterAlt size="25px" />
              Status Filter
            </FilterIcon>
            {showStatusFilter && (
              <>
                <t.BackDrop onClick={() => setShowStatusFilter(false)} />
                <t.Wrapper show="true">
                  <StatusFilter>
                    {taskStatusList &&
                      taskStatusList.length !== 0 &&
                      taskStatusList.map((status) => (
                        <OneStatus key={status.taskStatusId}>
                          <input
                            type="checkbox"
                            checked={checkedStatusIds.current.includes(
                              status.taskStatusId
                            )}
                            onChange={() =>
                              checkTaskStatus(status.taskStatusId)
                            }
                          />
                          <Color color={status.color}></Color>
                          <div>{status.taskStatus}</div>
                        </OneStatus>
                      ))}
                    <Buttons>
                      <SimpleButton type="button" onClick={saveStatusHandler}>
                        완료
                      </SimpleButton>
                      <SimpleButton type="reset" onClick={resetHandler}>
                        취소
                      </SimpleButton>
                    </Buttons>
                  </StatusFilter>
                </t.Wrapper>
              </>
            )}
          </StatusCheckBox>
        </TaskFilter>
        {projectMember &&
          (projectMember.authority === "ADMIN" ||
            projectMember.authority === "WRITER") && (
            <Buttons>
              <NaviButton
                type="button"
                name="생성"
                color="#4361ee"
                fontcolor="white"
                onClick={() => navigate("new")}
              />
              {view === "table" && (
                <>
                  <NaviButton
                    type="button"
                    name="수정"
                    color="#4361ee"
                    fontcolor="white"
                    onClick={updateHandler}
                  />
                  <NaviButton
                    type="button"
                    name="삭제"
                    color="#c0c0c0"
                    fontcolor="white"
                    onClick={deleteHandler}
                  />
                </>
              )}
            </Buttons>
          )}
      </TaskNav>
    </>
  );
}

const FilterIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #c0c0c0;
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
`;

const StatusCheckBox = styled.div`
  position: relative;
`;

const StatusFilter = styled.div`
  border: 1px solid black;
  width: 250px;
  max-height: 600px;
  overflow: auto;
  padding: 1rem;
  border-radius: 1rem;
  position: absolute;
  top: 35px;
  z-index: 1;
  background-color: white;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;

  // buttons
  & > div:last-child button {
    width: 50%;
    padding: 5px;
  }
`;

const OneStatus = styled.div`
  display: flex;
  gap: 1rem;

  & > input {
    width: 15px;
    height: 15px;
  }
`;

const Color = styled.div`
  background-color: ${(props) => props.color || "black"};
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const TaskNav = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const TaskFilter = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;

  margin: 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  align-items: center;

  font-weight: bold;
  color: #495057;

  div {
    padding-bottom: 3px;
  }
`;

const NavItem = styled(NavLink)`
  cursor: pointer;
  color: #495057;
  padding-bottom: 3px;
  border-bottom: ${(props) => (props.selected ? "4px solid #8338ec" : "none")};
  color: ${(props) => (props.selected ? "#8338ec" : "#495057")};

  &:hover {
    color: #8338ec;
    border-bottom: 4px solid #8338ec;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const SimpleButton = styled.button`
  border-radius: 1rem;
  border: none;
  font-size: 1rem;
`;
