import BoardView from './components/task/TaskBoardView';
import Roadmap from './components/task/TaskRoadmapView';
import SideBar from './components/common/SideBar';
import ProjectCreationComponent from './components/project/CreateProject';
import Member from './components/project/ProjectMember';

function Test() {
  return (
    <div className="App">
      {/* <SideBar /> */}
      <BoardView></BoardView>
      {/* <Roadmap></Roadmap> */}
      {/* <ProjectCreationComponent></ProjectCreationComponent> */}
    </div>
  );
}

export default Test;
