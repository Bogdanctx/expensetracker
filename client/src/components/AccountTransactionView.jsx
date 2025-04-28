import { useEffect, useState } from "react";
import axios from "axios";
import styles from './AccountTransactionView.module.css';

const AccountTransactionView = ({ transaction, setShouldReload, onDelete }) => {
    const date = new Date(transaction.added);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const [displayAmount, setDisplayAmount] = useState(0);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        let start = 0;
        const end = Math.abs(transaction.amount);
        if (start === end) return;

        let duration = 400; // total animation time
        let incrementTime = 30; // how often to update
        let step = (end - start) / (duration / incrementTime);

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setDisplayAmount(start);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [transaction.amount]);

    return (
        <div>
            {isDeleted == false && (
                <div className={styles.transactionCard}>
                    <div className={styles.left}>
                        <div style = {{ alignItems: "center", marginBottom: "14px" }}>
                            <h5 className={styles.transactionTitle}>
                                <i className="bi bi-caret-right-fill" /> {transaction.title}
                            </h5>
                            <span style={{ fontSize: "13px", marginLeft: "1rem" }}>
                                <i className="bi bi-tag" /> {transaction.type}
                            </span>
                        </div>
                        {transaction.description?.length > 0 && (
                            <p className={styles.transactionDescription}>
                                <i className="bi bi-info-circle" style={{ color: "var(--secondary-200)", marginRight: '0.5rem' }} />
                                {transaction.description}
                            </p>
                        )}
                        <p className={styles.transactionDate}>
                            <i className={`bi bi-calendar-plus`} style={{ marginRight: "0.4rem", color: "var(--secondary-200)" }} />{day} {month} {year}
                        </p>
                    </div>

                    <div className={styles.transactionActions}>
                        <span className={`${styles.transactionAmount} ${styles.positive}`}>
                            ${displayAmount.toFixed(2)}
                        </span>
                        <button type="button" className={`${styles.transactionButton} ${styles.removeButton}`} onClick={() => onDelete(transaction.id)}>
                            <i className="bi bi-trash" />
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default AccountTransactionView;
