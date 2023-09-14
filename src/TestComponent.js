import BoardView from './components/task/TaskBoardView';
import Roadmap from './components/task/TaskRoadmapView';
import SideBar from './components/common/SideBar';
import ProjectCreationComponent from './components/project/CreateProject';
import Member from './components/project/ProjectMember';
import NewProject from './pages/project/NewProject';

function Test() {
  return (
    <div className="App">
      {/* <SideBar /> */}
      {/* <BoardView></BoardView> */}
      {/* <Roadmap></Roadmap> */}
      {/* <ProjectCreationComponent></ProjectCreationComponent> */}
      <NewProject></NewProject>
    </div>
  );
}

export default Test;
