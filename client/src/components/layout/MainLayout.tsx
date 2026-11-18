import { Outlet } from "react-router-dom";
import Header from "./Header";

function MainLayout() {
  return (
    <div className="app-shell">
      <Header />

      <div className="app-content">
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;