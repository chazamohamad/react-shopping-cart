function LoadingButton({
  loading,
  children,
  loadingText = "Loading...",
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        flex
        items-center
        justify-center
        gap-2
        transition
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span
          className="
            w-4
            h-4
            border-2
            border-current
            border-t-transparent
            rounded-full
            animate-spin
          "
        />
      )}

      <span>{loading ? loadingText : children}</span>
    </button>
  );
}

export default LoadingButton;
