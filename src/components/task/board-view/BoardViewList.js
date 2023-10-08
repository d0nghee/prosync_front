import { useSelector } from "react-redux";
import StatusBoard from "./StatusBoard";
import { styled } from "styled-components";
import { useEffect } from "react";
import ListLoadingSpinner from "../../common/ListLoadingSpinner";
import Guidance from "../../common/Guidance";
import { useDispatch } from "react-redux";
import { patchSequenceOfStatus } from "../../../redux/reducers/task/taskStatus-slice";
import { taskListAction } from "../../../redux/reducers/task/taskList-slice";
import { useParams } from "react-router-dom";

export default function BoardViewList({ projectMember, currentIndex }) {
  const list = useSelector((state) => state.taskList.list);
  const pageInfo = useSelector((state) => state.taskList.pageInfo);
  const dispatch = useDispatch();
  const taskStatusList = useSelector((state) => state.taskStatus.list);
  const params = useParams();

  useEffect(() => {
    dispatch(taskListAction.updateTaskSeq(taskStatusList));
  }, [dispatch, taskStatusList]);

  if (!pageInfo.hasOwnProperty("page")) {
    return <ListLoadingSpinner />;
  } else if (pageInfo.totalElements === 0) {
    return <Guidance text="업무가 존재하지 않습니다." />;
  }

  // 보드 드래그앤 드롭
  const handleDragStart = (event, taskStatusId) => {
    if (
      projectMember &&
      projectMember.status === "ACTIVE" &&
      (projectMember.authority === "ADMIN" ||
        projectMember.authority === "WRITER")
    ) {
      event.dataTransfer.setData("taskStatusId", taskStatusId);
    }
  };

  const handleDrop = async (event, seq) => {
    event.preventDefault();
    if (
      projectMember &&
      projectMember.status === "ACTIVE" &&
      (projectMember.authority === "ADMIN" ||
        projectMember.authority === "WRITER")
    ) {
      const taskStatusId = event.dataTransfer.getData("taskStatusId");
      await dispatch(
        patchSequenceOfStatus(+taskStatusId, seq, params.projectId)
      );
    } else {
      alert("프로젝트 수정 권한이 없습니다.");
    }
  };

  return (
    <BoardList>
      <SliderWrapper>
        <Slider currentidx={currentIndex}>
          {list &&
            list.length !== 0 &&
            list.map((board, index) => (
              <>
                <OneBoard key={index}>
                  <BoardGap
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index + 1)}
                  />
                  <div
                    key={board.taskStatusId}
                    onDragStart={(e) => handleDragStart(e, board.taskStatusId)}
                    draggable="true"
                  >
                    <StatusBoard
                      list={board}
                      index={index}
                      projectMember={projectMember}
                    />
                  </div>
                  {index === list.length - 1 && (
                    <BoardGap
                      left="90%"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, index + 2, true)}
                    />
                  )}
                </OneBoard>
              </>
            ))}
        </Slider>
      </SliderWrapper>
    </BoardList>
  );
}

const OneBoard = styled.div`
  display: flex;
  position: relative;
  cursor: move;
`;

const BoardGap = styled.div`
  position: absolute;
  height: 100%;
  left: ${(props) => props.left || "-20%"};
  justify-content: center;
  width: 100px;
  z-index: 1;
`;

const BoardList = styled.div`
  display: flex;
  align-items: center;
`;

const SliderWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const Slider = styled.div`
  display: flex;
  width: 80%;
  padding: 1rem;
  transition: transform 0.3s ease;
  gap: 30px;
  transform: translateX(-${(props) => props.currentidx * 425}px);
`;
