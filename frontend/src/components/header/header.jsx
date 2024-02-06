import { Link } from "react-router-dom";

import "./header.scss";

export default function Header() {
  return (
    <header>
      <nav className="main-nav">
        <Link to={"/"} className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <div>
          <Link to={"/sign"} className="main-nav-item">
            <i className="fa fa-user-circle i-right"></i>
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}
