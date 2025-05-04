import { useMemo } from "react";
import styles from './StatisticsTab.module.css';

const StatisticsTab = ({ transactions }) => {

    const stats = useMemo(() => {
        const summary = {
            totalAmount: 0,
            totalCount: transactions.length,
            byCategory: {},
        };

        transactions.forEach(transaction => {
            summary.totalAmount += transaction.amount;

            if (!summary.byCategory[transaction.type]) {
                summary.byCategory[transaction.type] = 0;
            }

            summary.byCategory[transaction.type] += transaction.amount;
        });

        return summary;
    }, [transactions]);

    return (
        <div className={styles.statsContainer}>
            <p><strong>Total Transactions:</strong> {stats.totalCount}</p>
            <p><strong>Total Amount Spent:</strong> ${stats.totalAmount.toFixed(2)}</p>

            {Object.entries(stats.byCategory).length > 0 && (
                <h4>Spending breakdown</h4>
            )}
            <ul>
                {Object.entries(stats.byCategory).map(([type, amount]) => {
                    const percentage = (amount / stats.totalAmount) * 100;
                    return (
                        <li key={type}>
                            <strong>{type}:</strong> ${amount.toFixed(2)} —{" "}
                            {percentage.toFixed(1)}% of total spending
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default StatisticsTab;
