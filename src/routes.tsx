import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { CompoundInterest } from "./pages/CompoundInterests";
import { Home } from "./pages/Home";

export const Router = () => {
  const routes = [
    {
      path: "/",
      component: Home,
    },

    {
      path: "/compound-interest",
      component: CompoundInterest,
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
