function CardSkeleton({ cards = 3, showImage = false }) {
  return (
    <div className="space-y-5 md:hidden">
      {Array.from({ length: cards }).map((_, index) => (
        <div
          key={index}
          className="
            bg-white
            border
            border-secondary
            rounded-2xl
            shadow-sm
            p-5
            animate-pulse
          "
        >
          {/* OPTIONAL IMAGE */}
          {showImage && (
            <div
              className="
                w-full
                h-56
                bg-secondary/50
                rounded-xl
                mb-5
              "
            />
          )}

          {/* TOP SECTION */}
          <div
            className="
              flex
              items-center
              gap-4
              mb-5
            "
          >
            {!showImage && (
              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-secondary/50
                  shrink-0
                "
              />
            )}

            <div className="flex-1 space-y-3">
              <div
                className="
                  h-5
                  w-2/3
                  bg-secondary/50
                  rounded
                "
              />

              <div
                className="
                  h-4
                  w-1/3
                  bg-secondary/50
                  rounded
                "
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-3">
            <div
              className="
                h-4
                w-full
                bg-secondary/50
                rounded
              "
            />

            <div
              className="
                h-4
                w-4/5
                bg-secondary/50
                rounded
              "
            />

            <div
              className="
                h-4
                w-1/2
                bg-secondary/50
                rounded
              "
            />
          </div>

          {/* BUTTONS */}
          <div
            className="
              grid
              grid-cols-2
              gap-3
              mt-6
            "
          >
            <div
              className="
                h-11
                bg-secondary/50
                rounded-xl
              "
            />

            <div
              className="
                h-11
                bg-secondary/50
                rounded-xl
              "
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardSkeleton;
