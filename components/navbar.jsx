import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success text-white">
        <div className="container-fluid">
          <h4 className="my-4 text-center">
            <NavLink to={"/"}>App kiểm kê</NavLink>
          </h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link active text-white"
                  aria-current="page"
                  to={"/"}>
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active text-white"
                  aria-current="page"
                  to={"/viewData"}>
                  Xem dữ liệu
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
