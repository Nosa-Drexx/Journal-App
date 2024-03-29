import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/Dashboard/DashBoard";
import ForgottenPassword from "./pages/FogottenPasswordPage/ForgottenPassword";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import MyAccount from "./pages/MyAccountPage/MyAccount";
import NoPage from "./pages/NoPage/NoPage";
import ProtectRoutes from "./ProtectRoutes";
import Settings from "./pages/SettingsPage/Settings";
import SignUp from "./pages/SignUpPage/SignUp";
import UpdateEmail from "./pages/UpdatePages/UpdateEmail";
import UpdatePassword from "./pages/UpdatePages/UpdatePassword";
import UpdateUsername from "./pages/UpdatePages/UpdateUsername";
import UploadImage from "./pages/UploadImagePage/UploadImage";
import VerifyNewUsers from "./pages/VerifyNewUsersPage/VerifyNewUsers";
import NewTodo from "./pages/CreateNewTodo/todoToMake";
import EditTodo from "./pages/EditTodoPage/editTodo";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectRoutes />}>
          <Route path="dashBoard/:username" element={<DashBoard />} />
          <Route path="dashBoard/:username/settings" element={<Settings />} />
          <Route path="dashBoard/:username/myAccount" element={<MyAccount />} />
          <Route
            path="dashBoard/:username/updates/username"
            element={<UpdateUsername />}
          />
          <Route path="/dashBoard/:username/add" element={<NewTodo />} />
          <Route path="/dashBoard/:username/edit" element={<EditTodo />} />
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
        {/* Exposed Routes */}
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
