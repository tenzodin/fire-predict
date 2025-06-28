import React from "react";

const CallToAction = () => {
  return (
    <div className="max-w-4xl mx-auto pt-5 pb-5">
      <div className="rrelative isolate overflow-hidden bg-gray-800/70 backdrop-blur-md px-6 py-12 shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Stay Informed
        </h2>

        <p className="mt-2 text-center text-lg leading-8 text-gray-300">
          Get updates about fire risk prediction improvements and new features.
        </p>

        <form className="mx-auto mt-10 flex max-w-md gap-x-4">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />

          <button
            type="submit"
            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
          >
            Notify me
          </button>
        </form>

        {/* Optional: Decorative SVG */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#cta-gradient)"
            fillOpacity="0.5"
          />
          <defs>
            <radialGradient
              id="cta-gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#ef4444" />
              <stop offset="1" stopColor="#7ED321" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default CallToAction;
