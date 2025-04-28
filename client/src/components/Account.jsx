import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import '../assets/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css'
import '../palette.css'
import styles from './Account.module.css';
import DateDisplay from './DateDisplay';

const Account = ({ account, setSelectedAccount, onDelete }) => {
    return (
        <div className={`${styles.card}`} >
            <div className="d-flex justify-content-between">
                <h5 className={`${styles.card_title}`} style={{ color: "var(--text-50)" }}> 
                    {account.name}
                </h5>

                <div className={`d-flex`}>
                    <button
                        type="button"
                        className={`btn p-2 d-flex align-items-center justify-content-center ${styles.card_button}`}
                        aria-label="Fullscreen"
                        onClick={() => setSelectedAccount(account) }
                    >
                        <i className="bi bi-arrows-fullscreen"></i>
                    </button>

                    <button
                        type="button"
                        className={`btn p-2 d-flex align-items-center justify-content-center ${styles.card_button}`}
                        aria-label="Close"
                        onClick={() => onDelete(account.id)}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>
            <p className={`card-text`} style={{ color: "#93C5FD" }}>
                <i className={`bi bi-piggy-bank-fill`} /> 
                <span style={{ color: "#10B981", marginLeft: "5px" }}>
                    ${account.balance} { /* <span style={{ color: "#9CA3AF" }}> (${account.initialBalance}) </span> */ }
                </span>
            </p>
            <DateDisplay dateString={account.created} />
        </div>
    )
}

export default Account;
