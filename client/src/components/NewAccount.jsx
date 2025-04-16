import { useState } from 'react';
import axios from 'axios';
import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import '../assets/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css';
import '../palette.css';
import styles from './NewAccount.module.css';

const NewAccount = ({ setDisplayNewAccountCard }) => {
    const [accountName, setAccountName] = useState('');
    const [balance, setBalance] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

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
            setShowError(true);

            if(error.response) {
                setErrorMessage(error.response.data.toUpperCase());
            }
            else {
                setErrorMessage("UNKNOWN ERROR");        
            }
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className={`${styles.newaccount_card}`}>
            <div className="d-flex justify-content-between" style={{ padding: "15px", paddingBottom: "5px" }}>
                <h5 className={`${styles.card_title}`} style={{ color: "var(--text-50)" }}>
                    <label htmlFor="new_account_name" className={`${styles.label_account_name_input}`} id="label_account_name_input">Account name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="new_account_name"
                        placeholder="Enter account name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                    />
                </h5>
            </div>

            <p className={`${styles.card_text}`} style={{ color: "#93C5FD", paddingLeft: "15px", display: "flex" }}>
                Balance: <span style={{ color: "#10B981" }}>$</span>
                <input
                    type="text"
                    className="form-control ms-2"
                    id="add_funds_input"
                    placeholder="Enter the amount"
                    value={balance}
                    onChange={handleBalanceChange}
                    required
                />
            </p>

            <button type="button" className={`btn btn-success ${styles.account_handle_button}`} onClick={handleCreate}>
                Create
            </button>
            <br />
            <button type="button" className={`btn btn-danger ${styles.account_handle_button}`} onClick={() => setDisplayNewAccountCard(false)}>
                Cancel
            </button>

            {showError && (
                <h4 className={`${styles.snew_account_error}`} id="new_account_error">[ERROR] {errorMessage}</h4>
            )}
        </div>
    );
};

export default NewAccount;
