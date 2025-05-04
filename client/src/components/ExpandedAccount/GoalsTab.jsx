import styles from "./GoalsTab.module.css";
import Goal from "../Goal/Goal.jsx";

const GoalsTab = ({ goals, accounts, deleteGoal }) => {
    return (
        <div className={styles.container}>
            <div className={styles.goalList}>
                {goals.map(goal => (
                    <Goal key={goal.id} goal={goal} accounts={accounts} deleteGoal={deleteGoal}
                    />
                ))}
            </div>
        </div>
    );
};

export default GoalsTab;
