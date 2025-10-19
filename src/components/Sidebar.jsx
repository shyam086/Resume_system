import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "block py-2 px-4 rounded hover:bg-blue-800 transition duration-200";

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold p-6 border-b border-blue-700">
          Resume Builder
        </h2>
        <nav className="mt-4 space-y-1 px-4">
          <NavLink to="/" className={linkClass}>
            🧾 Editor
          </NavLink>
          <NavLink to="/experience" className={linkClass}>
            💼 Experience
          </NavLink>
          <NavLink to="/education" className={linkClass}>
            🎓 Education
          </NavLink>
          <NavLink to="/templates" className={linkClass}>
            🎨 Templates
          </NavLink>
          <NavLink to="/preview" className={linkClass}>
            📄 Preview / Download
          </NavLink>
        </nav>
      </div>
      <div className="p-4 text-xs text-center text-gray-300">
        © 2025 Resume Builder
      </div>
    </aside>
  );
}
