import axios from 'axios';
import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import '../assets/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css'
import '../palette.css'
import styles from './Transaction.module.css';

const Transaction = ({ transaction }) => {
    var date = new Date(transaction.added);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate(); // Use `getDate()` instead of `getDay()` for day of the month
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    const deleteTransaction = async() => {
        try {
            await axios.delete(`http://localhost:8080/api/transactions/delete/${transaction.id}`);

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`${styles.transaction_card}`} >
            <div className={`d-flex justify-content-between`}>
                <h5 className={`${styles.card_title}`} style={{ color: "var(--text-50)" }}> 
                    {transaction.title}
                </h5>

                <div className="d-flex">
                    <button
                        type="button"
                        className={`btn p-2 d-flex align-items-center justify-content-center ${styles.card_button}`}
                        aria-label="Close"
                        onClick={deleteTransaction}
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
                    <i className={`bi bi-piggy-bank`} style={{ color: "var(--secondary-200)" }} /> {transaction.account.name}
                </p>
            )}
            <p style={{ color: "#9CA3AF", justifySelf: "baseline", marginTop: "20px" }}>
                <i className={`bi bi-calendar-plus`} /> {day} {month} {year}
            </p>
        </div>
    )
}

export default Transaction;
