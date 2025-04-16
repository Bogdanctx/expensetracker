import { useState } from 'react';
import axios from 'axios';
import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import '../assets/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css';
import '../palette.css';
import styles from './NewTransaction.module.css';
import transaction_styles from './Transaction.module.css';
import account_styles from './NewAccount.module.css';

const NewAccount = ({ setDisplayNewTransactionCard, accounts }) => {
    const [transactionTitle, setTransactionTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleCreate = async () => {
        if (!transactionTitle || !amount) {
            alert('Please fill in all fields');
            return;
        }

        const newTransaction = {
            title: transactionTitle,
            amount: parseFloat(amount),
            description: description,
            added: new Date().toISOString()
        };

        try {
            await axios.post('http://localhost:8080/api/transactions/create', newTransaction);
            setDisplayNewTransactionCard(false);

            window.location.reload();
        } catch (error) {
            setShowError(true);

            if(error.response) {
                setErrorMessage(error.response.data.toUpperCase());
            }
            else {
                setErrorMessage("UNKNOWN ERROR");        
            }
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <div className={`${transaction_styles.transaction_card} ${styles.card}`} >
            <div className={`justify-content-between`}>
                <label htmlFor="transaction_title" className={`${styles.label_transaction_title}`} id="label_transaction_title">Title</label>
                <input
                    type="text"
                    className={`form-control ${styles.transaction_title} ${styles.input}`}
                    id="transaction_title"
                    placeholder="Enter a title"
                    value={transactionTitle}
                    onChange={(e) => setTransactionTitle(e.target.value)}
                    required
                />

                <label htmlFor="transaction_description" className={`${styles.label_transaction_title}`}>Description</label>
                <input
                    type="text"
                    className={`form-control ${styles.transaction_title} ${styles.input}`}
                    id="transaction_description"
                    placeholder="Enter a description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label htmlFor="transaction_amount" className={`${styles.label_transaction_title}`}>Amount</label>
                <input
                    type="text"
                    className={`form-control ${styles.transaction_title} ${styles.input}`}
                    id="transaction_amount"
                    placeholder="Enter the amount of money spent"
                    value={amount}
                    onChange={handleAmountChange}
                    required
                />

                
                <div style={{ width: "100%", textAlign: "center", padding: "13px" }}>
                    <select className="form-select" style={{backgroundColor: "var(--primary-500)", color: "var(--text-100)", border: "none"}} aria-label='Select an account'>
                        <option selected>
                            Choose an account
                        </option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={`${account_styles.new_account_buttons} ${styles.new_transaction_buttons}`}>
                <button type="button" className={`btn btn-success ${account_styles.account_handle_button}`} onClick={handleCreate}>
                    Create
                </button>
                <br />
                <button type="button" className={`btn btn-danger ${account_styles.account_handle_button}`} onClick={() => setDisplayNewTransactionCard(false)}>
                    Cancel
                </button>
            </div>

            {showError && (
                <h4 className={`${account_styles.new_account_error}`}>[ERROR] {errorMessage}</h4>
            )}
        </div>
    )
};

export default NewAccount;
