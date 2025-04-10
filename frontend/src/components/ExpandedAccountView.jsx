import { useState, useEffect } from "react";
import './ExpandedAccountView.css';

const ExpandedAccountView = ({ account, onClose }) => {
    const [activeTab, setActiveTab] = useState("general");
    const [showAnimation, setShowAnimation] = useState(false);

    var date = new Date(account.created);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate(); // Use `getDate()` instead of `getDay()` for day of the month
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    useEffect(() => {
        const timeout = setTimeout(() => setShowAnimation(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
      <div
            className={`modal-backdrop ${showAnimation ? "show" : ""}`}
            style={{
                position: "absolute",
                top: "calc(50% - (70vh / 2))",
                left: "calc(50% - (70vw / 2))",
                width: "70vw",
                height: "70vh",
                backgroundColor: "var(--background-900)",
                color: "white",
                zIndex: 9999,
                overflowY: "auto",
                padding: "2rem",
                borderRadius: "50px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                border: "5px solid #4B5563"
            }}
        >
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{account.name}</h2>
            <div>
                <button className="btn" style={{ marginRight: "10px", backgroundColor: "var(--primary-500)", color: "white" }} onClick={onClose}>
                    <i class="bi bi-gear-wide-connected"></i>
                </button>
                <button className="btn" style={{ backgroundColor: "var(--primary-500)", color: "white" }} onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </div>

        <p>💰 Balance: ${account.amount}</p>
        <p>📅 Created on: {day} {month} {year}</p>

        <ul className="nav nav-tabs mt-4">
            {["statistics", "goals", "transactions"].map((tab) => (
                <li className="nav-item" key={tab}>
                    <button
                            className={`nav-link ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                            style={{ color: "white", backgroundColor: "#374151" }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                </li>
            ))}
        </ul>

        <div className="mt-4">
            {activeTab === "statistics" && (
                <div>
                    <h4>📊 Statistics</h4>
                    <p>Coming soon: charts, spending insights, etc.</p>
                </div>
            )}
            {activeTab === "goals" && (
                <div>
                    <h4>🎯 Goals</h4>
                    <p>Coming soon: savings goals attached to this account.</p>
                </div>
            )}
            {activeTab === "transactions" && (
                <div>
                    <h4>💳 Transactions</h4>
                    <p>Coming soon: list of all transactions related to this account.</p>
              </div>
            )}
        </div>
    </div>
  );
};

export default ExpandedAccountView;
