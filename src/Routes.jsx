import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import ForgottenPassword from "./pages/ForgottenPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import NoPage from "./pages/NoPage";
import ProtectRoutes from "./ProtectRoutes";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import UpdateEmail from "./pages/UpdateEmail";
import UpdatePassword from "./pages/UpdatePassword";
import UpdateUsername from "./pages/UpdateUsername";
import UploadImage from "./pages/UploadImage";
import VerifyNewUsers from "./pages/VerifyNewUsers";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectRoutes />}>
          <Route path="dashBoard/:username" element={<DashBoard />} />
          <Route path="dashBoard/:username/settings" element={<Settings />} />
          <Route path="dashBoard/:username/myAccount" element={<MyAccount />} />
          <Route
            path="dashBoard/:username/updates/username"
            element={<UpdateUsername />}
          />
          <Route
            path="dashBoard/:username/updates/uploadImage"
            element={<UploadImage />}
          />
          <Route
            path="dashBoard/:username/updates/password"
            element={<UpdatePassword />}
          />
          <Route
            path="dashBoard/:username/updates/email"
            element={<UpdateEmail />}
          />
        </Route>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verifyEmail" element={<VerifyNewUsers />} />
        <Route path="/forgottenPassword" element={<ForgottenPassword />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AllRoutes;
