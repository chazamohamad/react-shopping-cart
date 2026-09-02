function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="
    fixed
    inset-0
    bg-white/20
    backdrop-blur-sm
    flex
    items-center
    justify-center
    z-50
  "
    >
      <div
        className="
          bg-white
          rounded-xl
          shadow-xl
          p-6
          w-full
          max-w-lg
        "
      >
        <div
          className="
            flex
            justify-end
            mb-4
          "
        >
          <button
            onClick={onClose}
            className="
              text-gray-500
              hover:text-black
              text-xl
            "
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
