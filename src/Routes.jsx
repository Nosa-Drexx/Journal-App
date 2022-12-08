import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="dashBoard/:username" element={<DashBoard />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AllRoutes;
