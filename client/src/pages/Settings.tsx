import { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";

function Settings() {
  const { theme, setTheme } = useThemeContext();

  const [notifications, setNotifications] = useState(true);

  return (
    <div className="settings-page">
      <section className="settings-page-header">
        <span className="dashboard-eyebrow">PREFERENCES</span>
        <h2>Settings</h2>
        <p>Customize your Smart Planner experience.</p>
      </section>

      <section className="task-panel settings-section">
        <div className="settings-section-heading">
          <div className="settings-section-icon">◐</div>
          <div>
            <h3>Appearance</h3>
            <p>Choose how your application looks.</p>
          </div>
        </div>

        <div className="settings-option">
          <div>
            <h4>Application Theme</h4>
            <p>Select your preferred light or dark appearance.</p>
          </div>

          <select
            id="theme"
            value={theme}
            onChange={(event) =>
              setTheme(event.target.value as "light" | "dark")
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </section>

      <section className="task-panel settings-section">
        <div className="settings-section-heading">
          <div className="settings-section-icon">♧</div>
          <div>
            <h3>Notifications</h3>
            <p>Manage your notification preference.</p>
          </div>
        </div>

        <div className="settings-option">
          <div>
            <h4>Enable notifications</h4>
            <p>
              Notification preference for future reminder functionality.
            </p>
          </div>

          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) =>
                setNotifications(event.target.checked)
              }
            />
            <span className="settings-toggle-slider" />
          </label>
        </div>
      </section>
    </div>
  );
}

export default Settings;