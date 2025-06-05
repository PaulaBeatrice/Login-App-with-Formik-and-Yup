import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Welcome to the dashboard!</h2>
        <div className="dashboard-content">
          <p>You have successfully logged in to your account.</p>
          <p>This is your personal dashboard area.</p>
        </div>
        <button
          className="logout-button"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
