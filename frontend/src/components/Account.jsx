import axios from 'axios';
import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import '../assets/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css'
import '../palette.css'
import { useState } from 'react';

const Account = ({ account, setSelectedAccount }) => {
    var date = new Date(account.created);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate(); // Use `getDate()` instead of `getDay()` for day of the month
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    const deleteAccount = async() => {
        try {
            await axios.delete(`http://localhost:8080/api/accounts/delete/${account.id}`);

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div 
            className="card" 
            style={{ 
                backgroundColor: "var(--background-900)",
                width: "fit-content", 
                margin: "5px", 
                borderRadius: "10px", 
                minWidth: "17vw",
            }}
        >
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title" style={{ color: "var(--text-50)" }}> 
                        {account.name}
                    </h5>

                    <div className="d-flex">
                        <button
                            type="button"
                            className="btn p-2 d-flex align-items-center justify-content-center"
                            style={{
                                width: "32px",
                                height: "32px",
                                backgroundColor: "var(--primary-500)",
                                color: "white",
                                borderRadius: "4px",
                                marginRight: "12px"
                            }}
                            aria-label="Fullscreen"
                            onClick={() => setSelectedAccount(account) }
                        >
                            <i className="bi bi-arrows-fullscreen"></i>
                        </button>

                        <button
                            type="button"
                            className="btn p-2 d-flex align-items-center justify-content-center"
                            style={{
                                width: "32px",
                                height: "32px",
                                backgroundColor: "var(--primary-500)",
                                color: "white",
                                borderRadius: "4px"
                            }}
                            aria-label="Close"
                            onClick={deleteAccount}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
                <p className="card-text" style={{ color: "#93C5FD" }}>
                    Balance: <span style={{ color: "#10B981" }}>${account.amount}</span>
                </p>
                <p className="card-text" style={{ color: "#9CA3AF" }}>
                    Created on: {day} {month} {year}
                </p>
            </div>
            </div>

    )
}

export default Account;
