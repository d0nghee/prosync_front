import BoardViewList from "../board-view/BoardViewList";
import TableViewList from "../table-view/TableViewList";
import RoadmapViewList from "../roadmap-view/RoadmapViewList";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

export default function TasksList({
  onChangePage,
  currentPage,
  updateCheckbox,
  checkbox,
  projectMember,
}) {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const list = useSelector((state) => state.taskList.list);

  // board view <>
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex + 1 < list.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      {view === "board" && (
        <Total>
          <BiSolidLeftArrow onClick={prevSlide} size="25px" />
          <List wid="96%">
            <BoardViewList
              projectMember={projectMember}
              currentIndex={currentIndex}
            />
          </List>
          <BiSolidRightArrow onClick={nextSlide} size="25px" />
        </Total>
      )}
      {view === "table" && (
        <List>
          <TableViewList
            onChangePage={onChangePage}
            currentPage={currentPage}
            updateCheckbox={updateCheckbox}
            checkbox={checkbox}
            projectMember={projectMember}
          />
        </List>
      )}
      {view === "roadmap" && (
        <List>
          <RoadmapViewList />
        </List>
      )}
    </>
  );
}

const List = styled.div`
  width: ${(props) => props.wid || "80%"};
`;

const Total = styled.div`
  width: 83%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
