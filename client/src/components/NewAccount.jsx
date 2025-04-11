import { useState } from 'react';
import axios from 'axios';
import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import '../assets/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css';
import '../palette.css';
import './NewAccount.css';

const NewAccount = ({ setDisplayNewAccountCard }) => {
    const [accountName, setAccountName] = useState('');
    const [balance, setBalance] = useState('');

    const handleBalanceChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setBalance(value);
        }
    };

    const handleCreate = async () => {
        if (!accountName || !balance) {
            alert('Please fill in all fields');
            return;
        }

        const newAccount = {
            name: accountName,
            balance: parseFloat(balance),
            created: new Date().toISOString()
        };

        try {
            await axios.post('http://localhost:8080/api/accounts/create', newAccount);
            setDisplayNewAccountCard(false);
            
            window.location.reload();
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className="newaccount-card">
            <div className="d-flex justify-content-between" style={{ padding: "15px", paddingBottom: "5px" }}>
                <h5 className="card-title" style={{ color: "var(--text-50)" }}>
                    <label htmlFor="new-account-name" id="label-account-name-input">Account name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="new-account-name"
                        placeholder="Enter account name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                    />
                </h5>
            </div>

            <p className="card-text" style={{ color: "#93C5FD", paddingLeft: "15px", display: "flex" }}>
                Balance: <span style={{ color: "#10B981" }}>$</span>
                <input
                    type="text"
                    className="form-control ms-2"
                    id="add-funds-input"
                    placeholder="Enter the amount"
                    value={balance}
                    onChange={handleBalanceChange}
                    required
                />
            </p>

            <button type="button" className="btn btn-success account-handle-button" onClick={handleCreate}>
                Create
            </button>
            <br />
            <button type="button" className="btn btn-danger account-handle-button" onClick={() => setDisplayNewAccountCard(false)}>
                Cancel
            </button>
        </div>
    );
};

export default NewAccount;
