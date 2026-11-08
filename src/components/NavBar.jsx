import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCartStore } from "../store/cartStore";

export default function NavBar({ theme, toggleTheme }) {
  const { user, logoutUser } = useAuth();
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart ({itemCount})</NavLink>

      <button onClick={toggleTheme}>
        Theme: {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <span>
            Welcome, <strong>{user.username}</strong>!{" "}
            <button onClick={handleLogout}>Logout</button>
          </span>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
}
