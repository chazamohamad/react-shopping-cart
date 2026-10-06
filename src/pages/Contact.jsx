import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMPORARY FRONTEND ONLY
    // Later we will send this data to the backend.

    console.log(formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main
      className="
        min-h-screen
        bg-background
        px-4
        sm:px-6
        lg:px-8
        py-10
        sm:py-14
        lg:py-16
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div
          className="
            max-w-2xl
            mx-auto
            text-center
            mb-10
            sm:mb-12
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
            Contact Us
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              text-primary
              mb-4
            "
          >
            We'd love to hear from you.
          </h1>

          <p
            className="
              text-muted
              text-sm
              sm:text-base
              leading-7
            "
          >
            Have a question about a product, delivery, or an existing order?
            Send us a message and we'll be happy to help.
          </p>
        </div>

        {/* CONTENT */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[360px_1fr]
            gap-6
            lg:gap-8
            items-start
          "
        >
          {/* ======================= */}
          {/* CONTACT INFORMATION */}
          {/* ======================= */}

          <aside
            className="
              bg-primary
              text-white
              rounded-2xl
              p-6
              sm:p-8
              lg:sticky
              lg:top-24
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-3
              "
            >
              Get in Touch
            </h2>

            <p
              className="
                text-secondary
                text-sm
                leading-6
                mb-8
              "
            >
              Our team is available to help with your questions and orders.
            </p>

            <div className="space-y-7">
              {/* EMAIL */}

              <div>
                <p
                  className="
                    text-secondary
                    text-xs
                    uppercase
                    tracking-wider
                    font-bold
                    mb-2
                  "
                >
                  Email
                </p>

                <a
                  href="mailto:support@yourstore.com"
                  className="
                    text-white
                    font-medium
                    break-all
                    hover:underline
                  "
                >
                  support@TopHome.com
                </a>
              </div>

              {/* PHONE */}

              <div>
                <p
                  className="
                    text-secondary
                    text-xs
                    uppercase
                    tracking-wider
                    font-bold
                    mb-2
                  "
                >
                  Phone
                </p>

                <a
                  href="tel:+96100000000"
                  className="
                    text-white
                    font-medium
                    hover:underline
                  "
                >
                  +961 70 462 560
                </a>
              </div>

              {/* LOCATION */}

              <div>
                <p
                  className="
                    text-secondary
                    text-xs
                    uppercase
                    tracking-wider
                    font-bold
                    mb-2
                  "
                >
                  Location
                </p>

                <p className="font-medium">Lebanon</p>
              </div>

              {/* HOURS */}

              <div>
                <p
                  className="
                    text-secondary
                    text-xs
                    uppercase
                    tracking-wider
                    font-bold
                    mb-2
                  "
                >
                  Working Hours
                </p>

                <p className="font-medium">Monday - Saturday</p>

                <p
                  className="
                    text-secondary
                    text-sm
                    mt-1
                  "
                >
                  8:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div
              className="
                border-t
                border-secondary/30
                mt-8
                pt-6
              "
            >
              <p
                className="
                  text-secondary
                  text-sm
                  leading-6
                "
              >
                For order-related questions, please include your order number in
                your message.
              </p>
            </div>
          </aside>

          {/* ======================= */}
          {/* CONTACT FORM */}
          {/* ======================= */}

          <form
            onSubmit={handleSubmit}
            className="
              bg-white
              border
              border-border
              rounded-2xl
              shadow-sm
              p-5
              sm:p-7
              lg:p-8
            "
          >
            <div className="mb-7">
              <h2
                className="
                  text-2xl
                  font-bold
                  text-text
                  mb-2
                "
              >
                Send us a Message
              </h2>

              <p
                className="
                  text-sm
                  text-muted
                "
              >
                Fill in the form below and tell us how we can help.
              </p>
            </div>

            {/* NAME + EMAIL */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-5
                mb-5
              "
            >
              {/* NAME */}

              <div>
                <label
                  htmlFor="name"
                  className="
                    block
                    text-sm
                    font-semibold
                    text-label
                    mb-2
                  "
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="
                    w-full
                    border
                    border-border
                    rounded-xl
                    px-4
                    py-3
                    bg-white
                    text-text
                    placeholder:text-muted
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    block
                    text-sm
                    font-semibold
                    text-label
                    mb-2
                  "
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="
                    w-full
                    border
                    border-border
                    rounded-xl
                    px-4
                    py-3
                    bg-white
                    text-text
                    placeholder:text-muted
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />
              </div>
            </div>

            {/* SUBJECT */}

            <div className="mb-5">
              <label
                htmlFor="subject"
                className="
                  block
                  text-sm
                  font-semibold
                  text-label
                  mb-2
                "
              >
                Subject
              </label>

              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
                className="
                  w-full
                  border
                  border-border
                  rounded-xl
                  px-4
                  py-3
                  bg-white
                  text-text
                  placeholder:text-muted
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                "
              />
            </div>

            {/* MESSAGE */}

            <div className="mb-6">
              <label
                htmlFor="message"
                className="
                  block
                  text-sm
                  font-semibold
                  text-label
                  mb-2
                "
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                rows="6"
                className="
                  w-full
                  border
                  border-border
                  rounded-xl
                  px-4
                  py-3
                  bg-white
                  text-text
                  placeholder:text-muted
                  outline-none
                  resize-none
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                "
              />
            </div>

            {/* TEMP SUCCESS MESSAGE */}

            {submitted && (
              <div
                className="
                  bg-primary/10
                  border
                  border-primary/20
                  text-primary
                  rounded-xl
                  px-4
                  py-3
                  mb-5
                  text-sm
                  font-medium
                "
              >
                Form submitted successfully.
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              className="
                w-full
                sm:w-auto
                bg-primary
                text-white
                px-7
                py-3
                rounded-xl
                font-semibold
                hover:bg-hover
                transition
                cursor-pointer
              "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Contact;
