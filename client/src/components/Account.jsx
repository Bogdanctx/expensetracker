import axios from 'axios';
import '../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import '../assets/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css'
import '../palette.css'
import styles from './Account.module.css';

const Account = ({ account, setSelectedAccount }) => {
    var date = new Date(account.created);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate(); // Use `getDate()` instead of `getDay()` for day of the month
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    const deleteAccount = async() => {
        try {
            await axios.delete(`http://localhost:8080/api/accounts/delete/${account.id}`);

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

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
                        onClick={deleteAccount}
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
            <p className={`card-text`} style={{ color: "#9CA3AF" }}>
                Created on: {day} {month} {year}
            </p>
        </div>
    )
}

export default Account;
