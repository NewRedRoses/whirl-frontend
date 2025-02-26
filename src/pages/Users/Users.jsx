import Sidebar from "../../components/SideBar/Sidebar.jsx";
import useCheckSession from "../../hooks/useCheckSession.jsx";

export default function Users() {
  useCheckSession();
  return (
    <div className="content">
      <Sidebar />
      <div className="main-content">
        <h1>All Users</h1>
      </div>
    </div>
  );
}
