import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Layout() {
  const [theme, setTheme] = useLocalStorage("app_theme", "light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeStyles = {
    backgroundColor: theme === "light" ? "#ffffff" : "#1e1e1e",
    color: theme === "light" ? "#000000" : "#ffffff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={themeStyles}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ padding: "1rem", flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{ padding: "1rem", borderTop: "1px solid #ccc", textAlign: "center" }}>
        <p>&copy; 2026 Web Programming Assignment 7</p>
      </footer>
    </div>
  );
}
