import "./MainLayout.scss";

import Header from "../../component/Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <Header />
      <div className="body-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
