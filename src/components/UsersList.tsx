import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LogInModal from "./LogInModal";

function UsersList() {
  const users = useAuthStore((state) => state.users);
  const username = useAuthStore((state) => state.username);
  const setReceiverId = useAuthStore((state) => state.setReceiverId);
  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const otherUsers = users.filter((user) => user.username !== username);
  const navigate = useNavigate();

  const handleUserClick = (e: React.MouseEvent, userId: string) => {
    e.preventDefault();
    setReceiverId(userId);
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate("/dm");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="channels-section">
      <div className="wrapper">
        <h1 className="channels__title">Users</h1>
        <div className="input-icon-wrapper">
          <i className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </i>
          <input className="input" type="text" placeholder="Find user..." />
        </div>
      </div>
      {otherUsers.map((user) => (
        <Link
          className="channel-link"
          to={"/dm"}
          key={user._id}
          onClick={(e) => handleUserClick(e, user._id)}
        >
          <span> {user.username} </span>
        </Link>
      ))}
      <LogInModal onClose={closeModal} message="Please log in to add a DM" />
    </div>
  );
}

export default UsersList;
