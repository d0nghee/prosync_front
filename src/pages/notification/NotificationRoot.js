import { Outlet } from "react-router-dom"

const NotificationRoot = () => {
  return (
    <>
    <div>내 알림</div>
    <Outlet/>
    </>
  )
}

export default NotificationRoot;
