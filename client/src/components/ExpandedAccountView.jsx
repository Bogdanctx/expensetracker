import { useState } from "react";
import axios from "axios";
import './ExpandedAccountView.css';

const ExpandedAccountView = ({ account, setSelectedAccount }) => {
    const [activeTab, setActiveTab] = useState("statistics");
    const [editingAccount, setEditingAccount] = useState(false);
    const [accountName, setAccountName] = useState(account.name);
    const [accountBalance, setAccountBalance] = useState(account.balance);
    const [funds, setFunds] = useState(0);
    const [showFundsInput, setShowFundsInput] = useState(false);
    
    var date = new Date(account.created);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate(); // Use `getDate()` instead of `getDay()` for day of the month
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    const saveAccountSettings = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/accounts/update/${account.id}`, account);
            console.log(response.status);
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
      <form className="expanded-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
            { editingAccount && (
                <div className="form-group">
                    <input type="text" className="form-control" id="accountName" 
                            onChange={(e) => {
                                const value = e.target.value;

                                setAccountName(value);
                                account.name = value;
                            }} 
                            value={accountName} placeholder="Enter account name"/>
                </div>
            )}
            { !editingAccount && (
                <h2>{account.name}</h2>
            )}

            <div>
                { editingAccount && (
                    <button 
                            type="submit" 
                            className="btn btn-success expanded-card-action-button" 
                            style={{ backgroundColor: "#5cb85c", marginRight: "10px" }}
                            onClick={() => {
                                setEditingAccount(false); // disable edit mode
                                saveAccountSettings(); // save new data
                            }} 
                    >
                        <i className="bi bi-check2" style={{ fontSize: "24px" }}></i>
                    </button>
                )}
                
                { !editingAccount && (
                    <button type="button" className="btn expanded-card-action-button" style={{ marginRight: "10px" }} 
                        onClick={() => {
                            setEditingAccount(true); 
                        }}
                    >
                        <i className="bi bi-gear-wide-connected"></i>
                    </button>
                )}

                <button type="button" className="btn expanded-card-action-button" onClick={() => setSelectedAccount(null)}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </div>

        <p className="d-flex align-items-center account-stats">💵 Balance: ${accountBalance}</p>
        { showFundsInput && (
            <p className="d-flex align-items-center account-stats">💰 Add funds: $
                <input type="text" className="form-control" id="add-funds-input" 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                                setFunds(value);                
                            }
                        }} 
                        placeholder="Enter the amount"/
                >
                <button 
                        type="button" 
                        className="btn btn-warning" 
                        id="add-funds-button" 
                        style={{ marginRight: "10px" }} 
                        onClick={() => {
                            const newBalance = parseFloat(accountBalance) + parseFloat(funds);
                            setAccountBalance(newBalance);                            
                            setShowFundsInput(false);
                            account.balance = newBalance;

                            saveAccountSettings();
                        }}
                    >
                    <i className="bi bi-plus-square" style= {{ color: "var(--primary-100)", fontSize: "22px" }}></i>
                </button>
            </p>    
        )}
        { !showFundsInput && (
            <button 
                    type="button" 
                    className="btn btn-info" 
                    id="toggle-add-funds"  
                    onClick={() => {
                        setShowFundsInput(true);
                    }}
                >
                    <i className="bi bi-cash-coin" style={{ verticalAlign: "middle", margin: "6px" }}></i>
                    Add funds
            </button>
        )}
        
        <p id="created-on">📅 Created on: {day} {month} {year}</p>

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
