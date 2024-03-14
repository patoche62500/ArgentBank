import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../features/userProfile";

import "./header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.bIsLogin);
  const user = useSelector((state) => state.user.user);

  function disconnect() {
    window.sessionStorage.clear();
    dispatch(setLogin(false));
  }

  return (
    <header>
      <nav className="main-nav">
        <Link to={"/"} className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.webp"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {login ? (
            <>
              <Link
                to={"/user"}
                className="main-nav-item"
                //onClick={() => dispatch(setLogin(false))}
              >
                <i className="fa fa-user-circle i-right"></i>
                {user?.userName}
              </Link>

              <Link to={"/"} className="main-nav-item" onClick={disconnect}>
                <i className="fa fa-sign-out"></i>
                Sign Out
              </Link>
            </>
          ) : (
            <Link to={"/sign"} className="main-nav-item">
              <i className="fa fa-user-circle i-right"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
