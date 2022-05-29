import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import { APP_ROUTES } from "./global/routes";

export default function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Container>
        <Routes>
          {APP_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
              exact
            />
          ))}
        </Routes>
      </Container>
    </>
  );
}
