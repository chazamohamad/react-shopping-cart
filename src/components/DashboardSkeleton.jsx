function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          md:flex-row
          md:justify-between
          md:items-center
          gap-5
          mb-8
        "
      >
        <div>
          <div
            className="
              h-3
              w-24
              bg-secondary/50
              rounded
              mb-3
            "
          />

          <div
            className="
              h-9
              w-64
              bg-secondary/50
              rounded
              mb-3
            "
          />

          <div
            className="
              h-4
              w-52
              bg-secondary/50
              rounded
            "
          />
        </div>

        {/* YEAR SELECTOR */}
        <div>
          <div
            className="
              h-3
              w-20
              bg-secondary/50
              rounded
              mb-2
            "
          />

          <div
            className="
              h-12
              w-32
              bg-secondary/50
              rounded-xl
            "
          />
        </div>
      </div>

      {/* STAT CARDS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-5
          gap-5
        "
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="
              bg-white
              border
              border-secondary
              rounded-2xl
              p-6
              shadow-sm
            "
          >
            <div
              className="
                flex
                justify-between
                items-start
              "
            >
              <div className="flex-1">
                <div
                  className="
                    h-4
                    w-20
                    bg-secondary/50
                    rounded
                    mb-4
                  "
                />

                <div
                  className="
                    h-10
                    w-16
                    bg-secondary/50
                    rounded
                    mb-3
                  "
                />

                <div
                  className="
                    h-3
                    w-28
                    bg-secondary/50
                    rounded
                  "
                />
              </div>

              <div
                className="
                  w-12
                  h-12
                  bg-secondary/50
                  rounded-xl
                "
              />
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
          mt-10
        "
      >
        {/* BAR CHART SKELETON */}
        <div
          className="
            bg-white
            border
            border-secondary
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          <div
            className="
              h-6
              w-52
              bg-secondary/50
              rounded
              mb-6
            "
          />

          <div
            className="
              h-[350px]
              w-full
              bg-secondary/30
              rounded-xl
              flex
              items-end
              justify-around
              gap-3
              p-6
            "
          >
            {[35, 55, 75, 45, 85, 65, 50].map((height, index) => (
              <div
                key={index}
                style={{ height: `${height}%` }}
                className="
                  w-8
                  bg-secondary/60
                  rounded-t-lg
                "
              />
            ))}
          </div>
        </div>

        {/* PIE CHART SKELETON */}
        <div
          className="
            bg-white
            border
            border-secondary
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          <div
            className="
              h-6
              w-40
              bg-secondary/50
              rounded
              mb-6
            "
          />

          <div
            className="
              h-[350px]
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                w-56
                h-56
                rounded-full
                border-[35px]
                border-secondary/50
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
