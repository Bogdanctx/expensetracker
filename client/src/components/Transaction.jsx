import axios from 'axios';
import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import '../assets/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css'
import '../palette.css'
import styles from './Transaction.module.css';
import { useState } from 'react';
import DateDisplay from './DateDisplay';

const Transaction = ({ transaction, onDelete }) => {
    const [isEditingType, setIsEditingType] = useState(false);
    const [currentType, setCurrentType] = useState(transaction.type);
    const transactionTypes = ["Groceries", "Dining", "Transportation", "Utilities", "Entertainment", "Healthcare", "Shopping", "Other"];

    const updateTransactionType = async (newType) => {
        try {
            await axios.put(`http://localhost:8080/api/transactions/update/${transaction.id}`, {
                type: newType
            });
        } catch (error) {
            console.error("Error updating transaction type:", error);
        }
    };

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setCurrentType(selectedType);
        setIsEditingType(false);
        updateTransactionType(selectedType);
    };

    return (
        <div className={`${styles.transaction_card}`} >
            <div className={`d-flex justify-content-between`}>
                <h5 className={`${styles.card_title}`} style={{ color: "var(--text-50)" }}> 
                    {transaction.title}
                    <br />
                    <span className={styles.transaction_type}
                        onClick={() => setIsEditingType(true)}
                    >
                        {isEditingType ? (
                            <select
                                value={currentType}
                                onChange={handleTypeChange}
                                onBlur={() => setIsEditingType(false)}
                                autoFocus
                                className={styles.select_transaction}
                            >
                                {transactionTypes.map((type) => (
                                    <option className={styles.transaction_option} key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        ) : (
                            <>
                                <i className="bi bi-tag" /> {currentType}
                            </>
                        )}
                    </span>
                </h5>

                <div className="d-flex">
                    <button
                        type="button"
                        className={`btn p-2 d-flex align-items-center justify-content-center ${styles.card_button}`}
                        aria-label="Close"
                        onClick={() => onDelete(transaction.id)}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>
            {transaction.description.length > 0 && (
                <p className={`${styles.transaction_data}`}>
                    <i className={`bi bi-info-circle`} style={{ color: "var(--secondary-200)" }} /> {transaction.description}
                </p>
            )}
            <p className={`${styles.transaction_data}`}>
                <i className={`bi bi-cash-coin`} /> <span style={{ color: "#10B981" }}>${transaction.amount}</span>
            </p>
            {transaction.account != null && (
                <p className={`${styles.transaction_data}`}>
                    <i className={`bi bi-bank`} style={{ color: "var(--secondary-200)" }} /> {transaction.account.name}
                </p>
            )}
            <DateDisplay dateString={transaction.added} />
        </div>
    )
}

export default Transaction;
