import { useSelector } from "react-redux";

function UserWelcome() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  return (
    <div className="welcome">
      <h2>Welcome {currentUser.username}</h2>
    </div>
  );
}
export default UserWelcome;
