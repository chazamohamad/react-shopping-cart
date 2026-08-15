import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Contact Info */}
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Contact Info</h5>

            <p className="mb-2">Phone: +961 00 000 000</p>

            <p className="mb-0">Address: Beirut, Lebanon</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <NavLink to="/home" className="text-white text-decoration-none">
                  Home
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/about"
                  className="text-white text-decoration-none"
                >
                  About
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/contact"
                  className="text-white text-decoration-none"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        {/* Copyright */}
        <div className="text-center py-3">
          <p className="mb-0">© 2026 My Website. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
