function Modal({ isOpen, onClose, children, size = "md" }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        bg-black/10
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-background
          rounded-xl
          shadow-xl
          border
          border-secondary
          p-6
          w-full
          ${size === "xl" ? "max-w-4xl" : "max-w-lg"}
        `}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
