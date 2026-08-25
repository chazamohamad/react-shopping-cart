import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* CONTACT */}
          <div>
            <h5 className="font-bold text-xl mb-4">Contact Info</h5>

            <p className="mb-2">Phone: +961 00 000 000</p>

            <p>Address: Beirut, Lebanon</p>
          </div>

          {/* LINKS */}
          <div>
            <h5 className="font-bold text-xl mb-4">Quick Links</h5>

            <ul className="space-y-3">
              <li>
                <NavLink to="/home" className="hover:text-gray-300">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className="hover:text-gray-300">
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className="hover:text-gray-300">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center">
          <p>© 2026 My Website. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
