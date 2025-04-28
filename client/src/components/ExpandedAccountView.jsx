import { useState } from "react";
import axios from "axios";
import styles from './ExpandedAccountView.module.css';
import AccountTransactionView from './AccountTransactionView';

const ExpandedAccountView = ({ account, setSelectedAccount, transactions, onDelete }) => {
    const [activeTab, setActiveTab] = useState("statistics");
    const [editingAccount, setEditingAccount] = useState(false);
    const [accountName, setAccountName] = useState(account.name);
    const [funds, setFunds] = useState(0);
    const [showFundsInput, setShowFundsInput] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);
    
    var date = new Date(account.created);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate();
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

    const closeAccount = () => {
        setSelectedAccount(null);
        if(shouldReload) {
            window.location.reload();
            setShouldReload(false);
        }
    }

    return (
      <form className={`${styles.expanded_card}`}>
        <div className="d-flex justify-content-between align-items-center mb-4">
            { editingAccount && (
                <div className="form-group">
                    <input type="text" className={`form-control ${styles.account_name}`} id='account_name' 
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
                            className={`btn btn-success ${styles.action_button}`} 
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
                    <button type="button" className={`btn ${styles.action_button}`} style={{ marginRight: "10px" }} 
                        onClick={() => {
                            setEditingAccount(true); 
                        }}
                    >
                        <i className="bi bi-gear-wide-connected"></i>
                    </button>
                )}

                { 
                    // close button
                }
                <button type="button" className={`btn ${styles.action_button}`} onClick={closeAccount}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </div>

        <div style={{ display: "flex" }}>
            <p className={`d-flex align-items-center ${styles.account_stats}`}>💵 Balance: ${account.balance}</p>
            { !showFundsInput && (
                <button 
                        type="button" 
                        className={`btn btn-info ${styles.toggle_add_funds}`} 
                        id="toggle_add_funds"  
                        onClick={() => {
                            setShowFundsInput(true);
                        }}
                    >
                        <i className="bi bi-cash-coin" style={{ verticalAlign: "middle", margin: "6px" }} />
                        Add funds
                </button>
            )}
        </div>
        { showFundsInput && (
            <p className={`d-flex align-items-center ${styles.account_stats}`}>💰 Add funds: $
                <input type="text" className={`form-control ${styles.add_funds_input}`} id="add_funds_input" 
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value === '' || /^[0-9-]*\.?[0-9-]*$/.test(value)) {
                                setFunds(value);                
                            }
                        }} 
                        placeholder="Enter the amount"
                />
                <button 
                        type="button" 
                        className={`btn ${styles.add_funds_button}`} 
                        id="add_funds_button" 
                        style={{ marginRight: "10px" }} 
                        onClick={() => {                         
                            setShowFundsInput(false);
                            account.balance += parseFloat(funds);
                            saveAccountSettings();
                        }}
                    >
                    <i className="bi bi-plus-square" style= {{ color: "var(--primary-100)", fontSize: "22px" }} />
                </button>
                <button 
                        type="button" 
                        className={`btn ${styles.add_funds_button}`} 
                        id="add_funds_button" 
                        style={{ marginRight: "10px" }} 
                        onClick={() => {                      
                            setShowFundsInput(false);
                        }}
                    >
                    <i className="bi bi-x-square" style= {{ color: "var(--primary-100)", fontSize: "22px" }} />
                </button>
            </p>    
        )}
        
        <p className={`${styles.created_on}`} id="created_on">📅 Created on: {day} {month} {year}</p>

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
                    {transactions.map((t) => (
                        <AccountTransactionView key={t.id} transaction={t} setShouldReload={setShouldReload} onDelete={onDelete} />
                    ))}
              </div>
            )}
        </div>
    </form>
  );
};

export default ExpandedAccountView;
