import { NavLink } from "react-router-dom";

function Header() {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">SP</div>
        <div>
          <h1>Smart Planner</h1>
          <p>AI productivity</p>
        </div>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-label">WORKSPACE</span>

        <nav className="main-navigation">
          <NavLink to="/" end>
            <span className="nav-icon">◫</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/tasks">
            <span className="nav-icon">☷</span>
            <span>Tasks</span>
          </NavLink>

          <NavLink to="/assistant">
            <span className="nav-icon">✧</span>
            <span>AI Assistant</span>
          </NavLink>

          <NavLink to="/settings">
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-icon">✦</div>
        <p>Plan smarter.</p>
        <span>Make every day productive.</span>
      </div>
    </aside>
  );
}

export default Header;