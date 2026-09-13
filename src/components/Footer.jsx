import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="bg-primary text-white  py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* CONTACT */}
          <div>
            <h5 className="font-bold text-xl mb-4">Contact Info</h5>

            <p className="mb-2">Phone: +961 70 462 560</p>

            <p>Address: Beirut, Lebanon</p>
          </div>

          {/* LINKS */}
          <div>
            <h5 className="font-bold text-xl mb-4">Quick Links</h5>

            <ul className="space-y-3">
              <li>
                <NavLink to="/shop" className="hover:text-secondary">
                  shop
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className="hover:text-secondary">
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className="hover:text-secondary">
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
