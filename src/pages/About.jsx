import { Link } from "react-router";

function About() {
  return (
    <main className="bg-background">
      {/* HERO */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-12
          sm:py-16
          lg:py-24
        "
      >
        <div
          className="
            max-w-3xl
            mx-auto
            text-center
          "
        >
          <p
            className="
              text-accent
              text-sm
              font-bold
              uppercase
              tracking-widest
              mb-3
            "
          >
            About Us
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              text-primary
              leading-tight
              mb-6
            "
          >
            Furniture designed for comfortable living.
          </h1>

          <p
            className="
              text-muted
              text-base
              sm:text-lg
              leading-7
              sm:leading-8
              max-w-2xl
              mx-auto
              mb-8
            "
          >
            We believe your home should feel as good as it looks. Our collection
            brings together comfort, quality, and timeless design to help you
            create a space you love.
          </p>

          <Link
            to="/shop"
            className="
              inline-block
              bg-primary
              text-white
              px-7
              py-3
              rounded-xl
              font-semibold
              hover:bg-hover
              transition
            "
          >
            Shop Our Collection
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section
        className="
          bg-white
          border-y
          border-border
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-12
            sm:py-16
          "
        >
          <div className="text-center mb-10">
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-text
                mb-3
              "
            >
              Why Choose Us?
            </h2>

            <p
              className="
                text-muted
                max-w-xl
                mx-auto
              "
            >
              From carefully selected products to reliable customer support, we
              want every part of your shopping experience to feel simple.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5
              lg:gap-6
            "
          >
            {/* QUALITY */}

            <div
              className="
                border
                border-border
                rounded-2xl
                p-6
                text-center
                bg-background
                transition
                hover:shadow-md
              "
            >
              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  mb-5
                  rounded-full
                  bg-secondary
                  flex
                  items-center
                  justify-center
                  text-2xl
                "
              >
                ✓
              </div>

              <h3
                className="
                  text-xl
                  font-bold
                  text-text
                  mb-2
                "
              >
                Quality Products
              </h3>

              <p
                className="
                  text-muted
                  text-sm
                  leading-6
                "
              >
                Our collection is carefully selected with comfort, quality, and
                lasting design in mind.
              </p>
            </div>

            {/* DELIVERY */}

            <div
              className="
                border
                border-border
                rounded-2xl
                p-6
                text-center
                bg-background
                transition
                hover:shadow-md
              "
            >
              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  mb-5
                  rounded-full
                  bg-secondary
                  flex
                  items-center
                  justify-center
                  text-2xl
                "
              >
                ⛟
              </div>

              <h3
                className="
                  text-xl
                  font-bold
                  text-text
                  mb-2
                "
              >
                Reliable Delivery
              </h3>

              <p
                className="
                  text-muted
                  text-sm
                  leading-6
                "
              >
                We make ordering simple and keep you informed about your order
                from checkout to delivery.
              </p>
            </div>

            {/* SUPPORT */}

            <div
              className="
                border
                border-border
                rounded-2xl
                p-6
                text-center
                bg-background
                transition
                hover:shadow-md
                sm:col-span-2
                lg:col-span-1
              "
            >
              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  mb-5
                  rounded-full
                  bg-secondary
                  flex
                  items-center
                  justify-center
                  text-2xl
                "
              >
                ♡
              </div>

              <h3
                className="
                  text-xl
                  font-bold
                  text-text
                  mb-2
                "
              >
                Customer Support
              </h3>

              <p
                className="
                  text-muted
                  text-sm
                  leading-6
                "
              >
                Have a question about a product or order? We're here to help
                make your experience easier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-12
          sm:py-16
          lg:py-20
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
            lg:gap-14
            items-center
          "
        >
          {/* VISUAL */}

          <div
            className="
              min-h-72
              sm:min-h-96
              rounded-2xl
              bg-secondary
              flex
              items-center
              justify-center
              p-8
            "
          >
            <div className="text-center">
              <p
                className="
                  text-primary
                  text-4xl
                  sm:text-5xl
                  font-bold
                  mb-3
                "
              >
                Home
              </p>

              <p
                className="
                  text-label
                  text-lg
                "
              >
                Comfort. Quality. Style.
              </p>
            </div>
          </div>

          {/* STORY CONTENT */}

          <div>
            <p
              className="
                text-accent
                text-sm
                font-bold
                uppercase
                tracking-widest
                mb-3
              "
            >
              Our Story
            </p>

            <h2
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                text-primary
                mb-5
              "
            >
              Making beautiful spaces easier to create.
            </h2>

            <p
              className="
                text-muted
                leading-7
                mb-4
              "
            >
              We started with a simple idea: make beautiful and comfortable
              furniture easier to discover and shop online.
            </p>

            <p
              className="
                text-muted
                leading-7
                mb-7
              "
            >
              Whether you're refreshing one room or creating an entirely new
              space, our goal is to offer products that bring warmth,
              functionality, and personality into your home.
            </p>

            <Link
              to="/contact"
              className="
                inline-block
                border
                border-primary
                text-primary
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:bg-secondary
                transition
              "
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
