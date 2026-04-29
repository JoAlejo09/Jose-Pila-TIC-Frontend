import { useState } from "react";

const PasswordInput = ({ name, placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* ICONO */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
};

export default PasswordInput;