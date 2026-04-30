const Button = ({ children, onClick, type = "button", className="", loading = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`px-6 py-2 rounded-lg text-white font-medium
        bg-primary hover:bg-blue-700
        transition duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
        `}
    >
        {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {children}
    </button>
  );
};

export default Button;