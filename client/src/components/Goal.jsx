import styles from './Goal.module.css';
import account from './Account.module.css';

const Goal = ({ goal, onDelete }) => {
    const percentageComplete = ((goal.attachedAccount.balance / goal.amountTarget) * 100).toFixed(1);
    const isCompleted = goal.attachedAccount.balance >= goal.amountTarget;

    return (
        <div style={{backgroundColor: "var(--background-800)", width: "fit-content", borderRadius: "15px"}}>
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
                        <div
                            className={styles.progressBar}
                            style={{ width: `${Math.min(percentageComplete, 100)}%` }}
                        ></div>
                    </div>
                    <div className={styles.progressText}>
                        ${goal.attachedAccount.balance.toFixed(2)} of ${goal.amountTarget.toFixed(2)} saved ({percentageComplete}%)
                    </div>
                </div>

                <p className={styles.accountText}>
                    Linked account: <strong>{goal.attachedAccount?.name || "Unknown"}</strong>
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
