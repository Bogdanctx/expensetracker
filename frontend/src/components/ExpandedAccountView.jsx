import { useState } from "react";
import './ExpandedAccountView.css';

const ExpandedAccountView = ({ account, onClose }) => {
    const [activeTab, setActiveTab] = useState("statistics");
    const [editingAccount, setEditingAccount] = useState(false);
    const [accountName, setAccountName] = useState(account.name);
    const [accountBalance, setAccountBalance] = useState(account.amount);

    var date = new Date(account.created);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate(); // Use `getDate()` instead of `getDay()` for day of the month
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    const handleInputChange = (setter) => (e) => {
        const value = e.target.value;

        if(setter == setAccountBalance) {
            if (!(value === '' || /^[0-9]*\.?[0-9]*$/.test(value))) {
                return;
            }
        }

        setter(value);
    }


    return (
      <form className="expanded-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
            { editingAccount && (
                <div className="form-group">
                    <input type="text" className="form-control" id="accountName" onChange={handleInputChange(setAccountName)} value={accountName} placeholder="Enter account name"/>
                </div>
            )}
            { !editingAccount && (
                <h2>{account.name}</h2>
            )}

            <div>
                <button type="button" className="btn" style={{ marginRight: "10px", backgroundColor: "var(--primary-500)", color: "white" }} onClick={() => setEditingAccount(true) }>
                    <i className="bi bi-gear-wide-connected"></i>
                </button>
                <button type="button" className="btn" style={{ backgroundColor: "var(--primary-500)", color: "white" }} onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </div>

        <p className="d-flex align-items-center account-stats">💵 Balance: $
            { editingAccount && (
                <input type="text" className="form-control" id="balance-input" onChange={handleInputChange(setAccountBalance)} value={accountBalance} placeholder="Enter new balance"/>
            )}
            { !editingAccount && (
                 account.balance
            )}
        </p>
        <p className="d-flex align-items-center account-stats">💰 Initial balance: ${account.initialBalance}</p>
        <p>📅 Created on: {day} {month} {year}</p>

        <ul className="nav nav-tabs mt-4">
            {["statistics", "goals", "transactions"].map((tab) => (
                <li className="nav-item" key={tab}>
                    <button
                            type="button"
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
    </form>
  );
};

export default ExpandedAccountView;
