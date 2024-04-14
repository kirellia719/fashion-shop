import "./MainLayout.scss";

import Header from "../../component/Header/Header";
import { Outlet } from "react-router-dom";
import { GetAllFashionsAction } from "../../redux/FashionReducer";
import api from "../../service/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const MainLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const fetchFashion = async () => {
        const { data } = await api.get("/fashion");
        dispatch(GetAllFashionsAction(data));
      };
      fetchFashion();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
