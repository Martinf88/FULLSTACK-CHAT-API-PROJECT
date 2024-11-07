import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useChatStore } from "../../store/chatStore";

function NavBar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const username = useAuthStore((state) => state.username);
  const logoutAuthStore = useAuthStore((state) => state.logoutAuthStore);
  const logOutChatStore = useChatStore((state) => state.logoutChatStore);

  const handleLogOut = () => {
    logoutAuthStore();
    logOutChatStore();
  };

  return (
    <nav className="nav">
      <div className="nav-text__wrapper">
        <h1 className="nav__title">ELDEN CHAPPY</h1>
        <p
          className={`nav__subtitle ${
            !isLoggedIn ? "nav__subtitle-guest" : "nav__subtitle-user"
          }`}
        >
          {!isLoggedIn ? "Guest" : username}
        </p>
      </div>
      {!isLoggedIn ? (
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="small-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
        </Link>
      ) : (
        <Link to={"/"} onClick={handleLogOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="small-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </Link>
      )}
    </nav>
  );
}

export default NavBar;
