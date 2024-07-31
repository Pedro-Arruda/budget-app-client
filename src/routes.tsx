import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./contexts/PlugglyContext";
import { CompoundInterest } from "./pages/CompoundInterests";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const Router = () => {
  const { auth } = useAuth();

  const protectedRoutes = [
    {
      path: "/",
      component: Home,
    },

    {
      path: "/compound-interest",
      component: CompoundInterest,
    },
  ];

  const nonProtectedRoutes = [
    {
      path: "/",
      component: Login,
    },
  ];

  const routes = auth && auth.itemId ? protectedRoutes : nonProtectedRoutes;

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
