import styles from './TransactionsTab.module.css';
import Transaction from "../Transaction/Transaction";

const TransactionsTab = ({ transactions, deleteTransaction }) => {
    console.log(transactions)
    return (
        <div className={styles.transactionCard}>
            {
                transactions.map((transaction) => {
                    return (
                        <Transaction key={transaction.id} transaction={transaction} deleteTransaction={deleteTransaction} />
                    );
                })
            }
        </div>
    );
};

export default TransactionsTab;
