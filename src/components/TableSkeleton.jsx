function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        border
        border-secondary
        overflow-hidden
        animate-pulse
      "
    >
      <table className="w-full">
        <thead
          className="
            bg-primary
          "
        >
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="p-4">
                <div
                  className="
                      h-4
                      bg-secondary
                      rounded
                    "
                ></div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <div
                    className="
                          h-5
                          bg-secondary
                          rounded
                          w-full
                        "
                  ></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;
