import { NavLink } from "react-router";

function Footer() {
  return (
    <footer
      className="
        bg-primary
        text-white
        mt-16
      "
    >
      <div
        className="
          max-w-[1440px]
          mx-auto
          px-6
          lg:px-10
          py-14
        "
      >
        {/* MAIN FOOTER */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-10
          "
        >
          {/* BRAND */}

          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-secondary
                mb-4
              "
            >
              TOP HOME
            </h2>

            <p
              className="
                text-white/70
                text-sm
                leading-6
                max-w-sm
              "
            >
              Discover quality products and enjoy a simple and comfortable
              shopping experience.
            </p>
          </div>

          {/* CONTACT */}

          <div>
            <h3
              className="
                text-lg
                font-bold
                text-secondary
                mb-5
              "
            >
              Contact Info
            </h3>

            <div
              className="
                space-y-3
                text-sm
              "
            >
              <p className="text-white/80">
                <span className="font-semibold text-white">Phone:</span> +961 70
                462 560
              </p>

              <p className="text-white/80">
                <span className="font-semibold text-white">Address:</span>{" "}
                Beirut, Lebanon
              </p>
            </div>
          </div>

          {/* QUICK LINKS */}

          <div>
            <h3
              className="
                text-lg
                font-bold
                text-secondary
                mb-5
              "
            >
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/shop"
                  className="
                    inline-block
                    text-white/75
                    text-sm
                    hover:text-secondary
                    hover:translate-x-1
                    transition
                    duration-200
                  "
                >
                  Shop
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className="
                    inline-block
                    text-white/75
                    text-sm
                    hover:text-secondary
                    hover:translate-x-1
                    transition
                    duration-200
                  "
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="
                    inline-block
                    text-white/75
                    text-sm
                    hover:text-secondary
                    hover:translate-x-1
                    transition
                    duration-200
                  "
                >
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/track-order"
                  className="
                    inline-block
                    text-white/75
                    text-sm
                    hover:text-secondary
                    hover:translate-x-1
                    transition
                    duration-200
                  "
                >
                  Track Order
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}

        <div
          className="
            border-t
            border-white/10
            mt-12
            pt-6
          "
        >
          <div
            className="
              flex
              flex-col
              sm:flex-row
              justify-between
              items-center
              gap-3
            "
          >
            <p
              className="
                text-sm
                text-white/60
              "
            >
              © 2026 TOP HOME. All Rights Reserved.
            </p>

            <p
              className="
                text-xs
                text-white/50
              "
            >
              Built with care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
