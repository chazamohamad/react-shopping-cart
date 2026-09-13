function ProductSkeleton() {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        border
        border-secondary
        overflow-hidden
        animate-pulse
      "
    >
      {/* Image Skeleton */}

      <div
        className="
          h-64
          bg-secondary
        "
      ></div>

      {/* Content */}

      <div
        className="
          p-5
        "
      >
        {/* Title */}

        <div
          className="
            h-6
            bg-secondary
            rounded
            w-3/4
            mb-4
          "
        ></div>

        {/* Description */}

        <div
          className="
            h-4
            bg-secondary
            rounded
            w-full
            mb-2
          "
        ></div>

        <div
          className="
            h-4
            bg-secondary
            rounded
            w-5/6
            mb-5
          "
        ></div>

        {/* Price */}

        <div
          className="
            h-7
            bg-primary/30
            rounded
            w-1/3
            mb-5
          "
        ></div>

        {/* Buttons */}

        <div
          className="
            h-12
            bg-primary/30
            rounded-lg
            mb-3
          "
        ></div>

        <div
          className="
            h-12
            bg-secondary
            rounded-lg
          "
        ></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
