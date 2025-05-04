import { useState } from 'react';
import axios from 'axios';
import styles from './Goal.module.css';
import account from './Account.module.css';

const Goal = ({ accounts, goal, onDelete }) => {
    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(goal.attachedAccount.id);
    const [attachedAccount, setAttachedAccount] = useState(goal.attachedAccount);
    var percentageComplete = ((attachedAccount.balance / goal.amountTarget) * 100).toFixed(1);
    const isCompleted = attachedAccount.balance >= goal.amountTarget;

    if(percentageComplete > 100) {
        percentageComplete = 100;
    }
    else if(percentageComplete < 0) {
        percentageComplete = 0;
    }

    const updateAttachedAccount = async (account) => {
        setAttachedAccount(account)

        try {
            await axios.put(`http://localhost:8080/api/goals/update/${goal.id}`, {
                attachedAccount: account
            });
        } catch (error) {
            console.error("Error updating transaction type:", error);
        }
    }

    const handleAccountChange = (e) => {
        const newAccountId = parseInt(e.target.value);
        setSelectedAccountId(newAccountId);
        setIsEditingAccount(false);

        const account = accounts.find(account => account.id == newAccountId);
        updateAttachedAccount(account);
    };

    return (
        <div style={{ backgroundColor: "var(--background-800)", width: "fit-content", borderRadius: "15px" }}>
            <div className={styles.goalCard}>
                <div className={styles.header}>
                    <h5 className={styles.title}>{goal.title}</h5>
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={`btn p-2 d-flex align-items-center justify-content-center ${account.card_button}`}
                            aria-label="Close"
                            onClick={() => onDelete(goal.id)}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>

                <p className={styles.description}>{goal.description}</p>

                <div className={styles.progressSection}>
                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar} style={{ width: `${Math.min(percentageComplete, 100)}%` }} />
                    </div>
                    <div className={styles.progressText}>
                        ${attachedAccount.balance.toFixed(2)} of ${goal.amountTarget.toFixed(2)} saved ({percentageComplete}%)
                    </div>
                </div>

                <p className={styles.accountText}>
                    Linked account:{" "}
                    {isEditingAccount ? (
                        <select
                            value={selectedAccountId}
                            onChange={handleAccountChange}
                            onBlur={() => setIsEditingAccount(false)}
                            autoFocus
                            className={styles.select_account}
                        >
                            {accounts.map((acc) => (
                                <option key={acc.id} value={acc.id} className={styles.account_option}>
                                    {acc.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span className={styles.attachedAccount} onClick={() => setIsEditingAccount(true)}>
                            {attachedAccount.name}
                        </span>
                    )}
                </p>
            </div>

            {isCompleted && (
                <button
                    type="button"
                    className={`btn-success ${styles.finishButton}`}
                    aria-label="Finish"
                    onClick={() => onDelete(goal.id)}
                >
                    Click to finish
                </button>
            )}
        </div>
    );
};

export default Goal;
