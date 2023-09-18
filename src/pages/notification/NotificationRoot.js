import { Outlet } from "react-router-dom"
import SideBar from "../../components/common/SideBar";

const NotificationRoot = ({subject}) => {
  return (
    <>
    <SideBar/>
    <Outlet/>
    </>
  )
}

export default NotificationRoot;
