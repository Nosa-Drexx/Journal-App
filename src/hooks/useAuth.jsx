import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useAuth() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const [login, setLogin] = useState(currentUser.logIn);

  useEffect(() => {
    setLogin(currentUser);
  }, [currentUser]);

  return login;
}
export default useAuth;
