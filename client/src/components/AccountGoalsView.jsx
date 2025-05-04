import styles from "./AccountGoalsView.module.css";
import Goal from "./Goal";

const AccountGoalsView = ({ goals, accounts, onDeleteGoal }) => {
    return (
        <div className={styles.container}>
            {goals.length === 0 ? (
                <p className={styles.noGoals}>No goals linked to this account.</p>
            ) : (
                <div className={styles.goalList}>
                    {goals.map(goal => (
                        <Goal
                            key={goal.id}
                            goal={goal}
                            accounts={accounts}
                            onDelete={onDeleteGoal}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AccountGoalsView;
