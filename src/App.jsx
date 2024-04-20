import "./App.scss";

import MainLayout from "./layout/MainLayout/MainLayout";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FashionPage from "./page/FashionPage/FashionPage";
import HistoryPage from "./page/HistoryPage/HistoryPage";
import StatisticPage from "./page/StatisticPage/StatisticPage";

import store from "./redux";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HistoryPage />,
      },
      {
        path: "fashion",
        element: <FashionPage />,
      },
      {
        path: "statistic",
        element: <StatisticPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
};

export default App;
