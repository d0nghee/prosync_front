import { Outlet } from "react-router-dom";
import SideBar from "../../components/common/SideBar";
import { useState } from "react";


const NotificationRoot = () => {
  const [trigger, setTrigger] = useState();


  const handleTrigger = () => {
    setTrigger(prev => !prev);
  }

  return (
    <>
      <SideBar trigger={trigger} />
      <Outlet handleTrigger={handleTrigger}/>
    </>
  );
};

export default NotificationRoot;
