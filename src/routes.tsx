import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Transactions } from "./pages/Transactions";

export const Router = () => {
  const routes = [
    {
      path: "/",
      component: Home,
    },

    {
      path: "/transactions",
      component: Transactions,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ component: Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
